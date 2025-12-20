import ProductGrid from "@/components/ProductGrid";

type Props = {
  params: { sin: string };
};

export default function CollectionPage({ params }: Props) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      {/* PAGE TITLE */}
      <h1 className="font-display text-4xl uppercase tracking-[0.2em] mb-10">
        {params.sin}
      </h1>

      {/* SAME GRID AS HOMEPAGE, BUT FILTERED */}
      <ProductGrid sin={params.sin} />
    </div>
  );
}
