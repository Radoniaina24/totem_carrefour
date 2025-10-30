import AuthGuardAdmin from "@/components/Auth/Guard/AuthGuardAdmin";
import Dashboard from "@/features/dashboard";
import React from "react";

export default function DashBoardPage() {
  return (
    <AuthGuardAdmin>
      <Dashboard />
    </AuthGuardAdmin>
  );
}
