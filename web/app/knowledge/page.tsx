"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function KnowledgeRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/library?tab=knowledge");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#07070a] flex items-center justify-center text-zinc-400 font-mono text-xs">
      Redirecting to Library Archive (Knowledge)...
    </div>
  );
}
