import Image from "next/image";

const affiliations = [
  { name: "SAMHSA", file: "samhsa.png" },
  { name: "NDASA", file: "ndasa.png" },
  { name: "SAPAA", file: "sapaa.png" },
  { name: "Abbott", file: "abbott.png" },
  { name: "FormFox", file: "formfox.png" },
  { name: "eScreen", file: "escreen.png" },
  { name: "ExamOne", file: "examone.png" },
  { name: "Quest Diagnostics", file: "quest.png" },
];

export function Affiliations() {
  return (
    <section className="border-t border-slate/20 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <h2 className="mb-2 font-display text-2xl font-medium text-ink">
          Nationally affiliated, locally trusted
        </h2>
        <p className="mb-10 max-w-xl text-sm text-slate">
          Testology is affiliated with NDASA and SAPAA, and works directly with major national
          lab networks to process your results.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {affiliations.map((item) => (
            <div
              key={item.name}
              className="flex h-20 items-center justify-center rounded-md border border-slate/20 bg-white p-3"
            >
              <Image
                src={`/images/logos/${item.file}`}
                alt={item.name}
                width={140}
                height={60}
                className="h-auto max-h-12 w-auto max-w-full object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}