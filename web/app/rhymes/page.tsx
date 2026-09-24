import { Metadata } from "next";
import RhymesHome from "@/components/rhymes/RhymesHome";

export const metadata: Metadata = {
  title: "Tamil Rhymes | Ezhuthaani • தமிழ் பாடல்கள்",
  description: "Interactive 3D WebGL Tamil storybooks, rhymes, and curated video learning for children and beginners.",
};

export default function RhymesPage() {
  return <RhymesHome />;
}
