"use client";
import { useEffect, useState } from "react";
import PreLoader from "../PreLoader";

export default function Loading({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const id = setTimeout(() => setLoading(false), 3000);
    return () => clearTimeout(id);
  }, []);
  return <>{loading ? <PreLoader /> : children}</>;
}
