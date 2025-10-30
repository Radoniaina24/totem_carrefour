"use client";
import { PersonalInfoTable } from "@/components/PersonalInfoTable";
import { Input } from "@/components/ui/input";
import { useCvEvents } from "@/hooks/useCvEvents";

import { useGetAllCandidateQuery } from "@/redux/api/candidateApi";
import { Search, Users } from "lucide-react";
import React, { useState } from "react";

export default function Candidate() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const queryParams = {
    search: searchTerm,
    page: currentPage,
    limit: itemsPerPage,
  };
  const { data: candidates, isLoading } = useGetAllCandidateQuery(queryParams);
  useCvEvents(queryParams);
  console.log(candidates);
  // console.log(candidates);
  const profisCandidate = candidates?.data;
  // console.log(profisCandidate);
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
          <div className="mb-4 pb-4 border-b border-slate-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-slate-800">
              {candidates?.total} Profil(s)
            </h2>

            <div className="">
              <div className="relative w-full sm:w-96">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher par nom, email, titre..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          <PersonalInfoTable
            data={profisCandidate}
            itemsPerPage={itemsPerPage}
            totalPages={candidates?.totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            onItemsPerPageChange={setItemsPerPage}
            loading={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
