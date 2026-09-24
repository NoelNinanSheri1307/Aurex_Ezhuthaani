"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function InscriptionsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/library?tab=inscriptions");
  }, [router]);

  return (
    <div className="min-h-screen bg-[#07070a] flex items-center justify-center text-zinc-400 font-mono text-xs">
      Redirecting to Library Archive (Inscriptions)...
    </div>
  );
}
