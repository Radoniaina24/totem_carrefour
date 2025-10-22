import { PersonalInfoTable } from "@/components/PersonalInfoTable";
import { mockPersonalData } from "@/lib/mock-data";
import { Users } from "lucide-react";
import React from "react";

export default function Candidate() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">
              Gestion des Profils
            </h1>
          </div>
          <p className="text-slate-600 ml-15">
            Liste complète des profils professionnels avec informations
            détaillées
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="mb-4 pb-4 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-800">
              {mockPersonalData.length} Profil(s)
            </h2>
          </div>
          <PersonalInfoTable data={mockPersonalData} />
        </div>
      </div>
    </div>
  );
}
