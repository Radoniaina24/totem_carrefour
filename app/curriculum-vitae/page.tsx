import AdminGuard from "@/components/Auth/Guard/AuthGuardAdmin";
import CvRegister from "@/features/candidate/CvRegister";
import React from "react";

export default function CvPage() {
  return (
    <AdminGuard>
      <div className="container mx-auto">
        <CvRegister />
      </div>
    </AdminGuard>
  );
}
