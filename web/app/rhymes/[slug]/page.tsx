import { notFound } from "next/navigation";
import { getRhymeBySlug, INTERACTIVE_RHYMES } from "@/lib/rhymes";
import RhymePlayerPage from "@/components/rhymes/RhymePlayerPage";

export async function generateStaticParams() {
  return INTERACTIVE_RHYMES.map((r) => ({
    slug: r.slug,
  }));
}

export default async function RhymeSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const rhyme = getRhymeBySlug(slug);

  if (!rhyme) {
    notFound();
  }

  return <RhymePlayerPage rhyme={rhyme} />;
}
