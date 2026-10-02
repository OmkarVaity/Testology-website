"use client";

import { useEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, CircleMarker, Popup, useMap, useMapEvents } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import type { Clinic } from "@/content/clinics";
import { clinicStatusMeta, directionsUrl } from "@/content/clinics";
import { ORDERING_ENABLED, orderUrl } from "@/lib/order-links";

export type MappableClinic = Clinic & { distanceMiles: number | null; inRange: boolean };

type ClinicMapProps = {
  clinics: MappableClinic[];
  /** Points the map should zoom to fit — recomputed by the parent only when the search changes. Empty = whole US. */
  fitPoints: [number, number][];
  selectedClinic: string | null;
  onSelect: (id: string) => void;
  userLocation: { lat: number; lng: number; label: string } | null;
};

const US_CENTER: [number, number] = [39.5, -98.35];
const US_ZOOM = 4;
/** Matches --color-primary-600, so Testology's own pin stands out from the eScreen network. */
const FEATURED_COLOR = "#15ac9b";

function markerColor(clinic: Clinic): string {
  if (clinic.featured) return FEATURED_COLOR;
  if (clinic.statuses.includes("outOfNetwork")) return clinicStatusMeta.outOfNetwork.color;
  if (clinic.statuses.includes("uninstalledInNetwork")) return clinicStatusMeta.uninstalledInNetwork.color;
  return clinicStatusMeta.installed.color;
}

/** Pins shrink when zoomed out so thousands of them read as coverage rather than a solid blob. */
function baseRadius(zoom: number): number {
  if (zoom <= 4) return 2.5;
  if (zoom <= 6) return 4;
  if (zoom <= 8) return 5.5;
  return 7;
}

function markerStyle(clinic: MappableClinic, selected: boolean, zoom: number): L.CircleMarkerOptions {
  const base = baseRadius(zoom);
  return {
    radius: selected ? 11 : clinic.featured ? base + 3 : base,
    color: selected ? "#0f172a" : "#ffffff",
    weight: selected ? 2 : zoom <= 6 ? 0.5 : 1.5,
    fillColor: markerColor(clinic),
    fillOpacity: clinic.inRange ? 0.95 : 0.3,
    opacity: clinic.inRange ? 1 : 0.4,
  };
}

/** Popup content built as DOM nodes, so clinic text from eScreen is never interpreted as HTML. */
function popupContent(clinic: MappableClinic): HTMLElement {
  const el = (tag: string, className: string, text?: string) => {
    const node = document.createElement(tag);
    node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  };

  const root = el("div", "min-w-[200px] text-sm");
  root.append(el("p", "!m-0 font-semibold text-slate-900", clinic.name));
  root.append(el("p", "!my-1 text-slate-600", `${clinic.address}, ${clinic.city}, ${clinic.state} ${clinic.zip}`));
  if (clinic.distanceMiles !== null) {
    const distance = `${clinic.approx ? "About " : ""}${clinic.distanceMiles.toFixed(1)} mi away`;
    root.append(el("p", "!my-1 text-xs text-slate-500", clinic.approx ? `${distance} (pin at zip code center)` : distance));
  }

  const links = el("div", "flex gap-3");
  const phone = el("a", "font-medium !text-primary-600", clinic.phone) as HTMLAnchorElement;
  phone.href = `tel:${clinic.phone}`;
  const directions = el("a", "font-medium !text-primary-600", "Directions") as HTMLAnchorElement;
  directions.href = directionsUrl(clinic);
  directions.target = "_blank";
  directions.rel = "noopener noreferrer";
  links.append(phone, directions);
  root.append(links);
  if (ORDERING_ENABLED) {
    const order = el("a", "mt-2 inline-block rounded-lg bg-primary-600 px-3 py-1 text-xs font-semibold !text-white", "Order a test here") as HTMLAnchorElement;
    order.href = orderUrl(clinic.id);
    root.append(order);
  }
  return root;
}

/**
 * Draws every clinic into one canvas layer. Markers are created once per clinic and only restyled when their
 * look changes, which keeps searches and selections smooth with thousands of clinics.
 */
function ClinicLayer({ clinics, selectedClinic, onSelect }: Pick<ClinicMapProps, "clinics" | "selectedClinic" | "onSelect">) {
  const map = useMap();
  const [zoom, setZoom] = useState(() => map.getZoom());
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) });

  // Renderer and layer belong to one map instance. They're rebuilt if react-leaflet recreates the map
  // (e.g. React re-running effects in development), instead of re-attaching objects tied to a removed map.
  const layer = useRef<{ group: L.LayerGroup; renderer: L.Canvas } | null>(null);
  const markers = useRef(new Map<string, L.CircleMarker>());
  // Last style applied per marker, so a search only repaints markers whose look changed.
  const styleKeys = useRef(new Map<string, string>());
  const clinicById = useRef(new Map<string, MappableClinic>());
  const onSelectRef = useRef(onSelect);

  useEffect(() => {
    onSelectRef.current = onSelect;
  }, [onSelect]);

  useEffect(() => {
    const group = L.layerGroup().addTo(map);
    layer.current = { group, renderer: L.canvas({ padding: 0.5 }) };
    const markerMap = markers.current;
    const styleMap = styleKeys.current;
    return () => {
      group.remove();
      layer.current = null;
      markerMap.clear();
      styleMap.clear();
    };
  }, [map]);

  // Add markers for new clinics and drop ones that disappeared; existing markers are reused across searches.
  useEffect(() => {
    clinicById.current = new Map(clinics.map((c) => [c.id, c]));
    if (!layer.current) return;
    const { group, renderer } = layer.current;

    for (const clinic of clinics) {
      if (clinic.lat === null || clinic.lng === null || markers.current.has(clinic.id)) continue;
      const id = clinic.id;
      const marker = L.circleMarker([clinic.lat, clinic.lng], { renderer, bubblingMouseEvents: false })
        .bindPopup(() => popupContent(clinicById.current.get(id)!))
        .on("click", () => onSelectRef.current(id));
      group.addLayer(marker);
      markers.current.set(id, marker);
    }

    for (const [id, marker] of markers.current) {
      if (!clinicById.current.has(id)) {
        group.removeLayer(marker);
        markers.current.delete(id);
        styleKeys.current.delete(id);
      }
    }
  }, [clinics, map]);

  useEffect(() => {
    for (const [id, marker] of markers.current) {
      const clinic = clinicById.current.get(id);
      if (!clinic) continue;
      const selected = id === selectedClinic;
      const styleKey = `${clinic.inRange}|${selected}|${zoom}`;
      if (styleKey !== styleKeys.current.get(id)) {
        marker.setStyle(markerStyle(clinic, selected, zoom));
        styleKeys.current.set(id, styleKey);
      }
    }
    // Canvas paints in layer order, so lift the featured and selected clinics above their neighbours.
    for (const [id, marker] of markers.current) {
      if (clinicById.current.get(id)?.featured) marker.bringToFront();
    }
    if (selectedClinic) markers.current.get(selectedClinic)?.bringToFront();
  }, [clinics, selectedClinic, zoom, map]);

  useEffect(() => {
    if (selectedClinic) markers.current.get(selectedClinic)?.openPopup();
  }, [selectedClinic]);

  return null;
}

function FitToPoints({ points }: { points: [number, number][] }) {
  const map = useMap();

  useEffect(() => {
    // A popup from the previous search would point at a clinic that's no longer the focus.
    map.closePopup();
    if (points.length === 0) {
      map.setView(US_CENTER, US_ZOOM);
    } else if (points.length === 1) {
      map.setView(points[0], 12);
    } else {
      map.fitBounds(L.latLngBounds(points), { padding: [40, 40], maxZoom: 13 });
    }
  }, [points, map]);

  return null;
}

/** Pans to whichever clinic the user picked in the list, keeping the current zoom if already close. */
function FlyToSelected({ clinic }: { clinic: Clinic | null }) {
  const map = useMap();

  useEffect(() => {
    if (clinic && clinic.lat !== null && clinic.lng !== null) {
      map.flyTo([clinic.lat, clinic.lng], Math.max(map.getZoom(), 12), { duration: 0.5 });
    }
  }, [clinic, map]);

  return null;
}

export default function ClinicMap({ clinics, fitPoints, selectedClinic, onSelect, userLocation }: ClinicMapProps) {
  const selected = clinics.find((c) => c.id === selectedClinic) ?? null;

  return (
    <MapContainer center={US_CENTER} zoom={US_ZOOM} className="h-full w-full" scrollWheelZoom preferCanvas>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitToPoints points={fitPoints} />
      <FlyToSelected clinic={selected} />
      <ClinicLayer clinics={clinics} selectedClinic={selectedClinic} onSelect={onSelect} />

      {userLocation && (
        <CircleMarker
          center={[userLocation.lat, userLocation.lng]}
          radius={9}
          pathOptions={{ color: "#ffffff", weight: 3, fillColor: "#2563eb", fillOpacity: 1 }}
        >
          <Popup>Your search location</Popup>
        </CircleMarker>
      )}
    </MapContainer>
  );
}
