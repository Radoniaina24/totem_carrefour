import AdminGuardRecruiter from "@/components/Auth/Guard/AuthGuardRecruiter";
import Candidate from "@/features/candidate";
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: "Carrefour | Candidate",
  description: "",
};

export default function CandidatePage() {
  return (
    <AdminGuardRecruiter>
      <Candidate />
    </AdminGuardRecruiter>
  );
}
