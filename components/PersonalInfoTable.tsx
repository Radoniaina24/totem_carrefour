"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Mail, MapPin, ChevronLeft, ChevronRight } from "lucide-react";

import { PersonalInfoDialog } from "./PersonalInfoDialog";
import { CVData } from "@/lib/types";

interface PersonalInfoTableProps {
  data: CVData[];
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
  loading: boolean;
}
export function PersonalInfoTable({
  data,
  itemsPerPage = 5,
  totalPages,
  currentPage,
  onItemsPerPageChange,
  onPageChange,
  loading,
}: PersonalInfoTableProps) {
  const [selectedPerson, setSelectedPerson] = useState<CVData | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const handleViewDetails = (person: CVData) => {
    setSelectedPerson(person);
    setDialogOpen(true);
  };
  const handleChange = (value: string) => {
    const numericValue = Number(value);
    onItemsPerPageChange(numericValue);
    console.log("Page size selected:", numericValue);
  };

  const goToPage = (page: number) => {
    onPageChange(Math.max(1, Math.min(page, totalPages)));
  };
  if (loading)
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-600 mt-3 text-sm font-medium">
          Chargement en cours...
        </p>
      </div>
    );

  if (totalPages === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-8 bg-gray-50 rounded-xl border border-gray-200">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-8 h-8 text-gray-400 mb-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.75 9.75h4.5m-2.25-2.25v4.5m9 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="text-gray-600 text-center font-medium">
          Aucun profil de candidat n&apos;a encore été enregistré.
        </p>
      </div>
    );
  }
  return (
    <>
      <div className="w-full">
        <div className="hidden lg:block rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-50 hover:bg-slate-50">
                <TableHead className="font-semibold text-slate-700">
                  Nom Complet
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Titre
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Email
                </TableHead>
                <TableHead className="font-semibold text-slate-700">
                  Localisation
                </TableHead>
                <TableHead className="text-right font-semibold text-slate-700">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((person, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 text-xs bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold ">
                        {person.personalInfo.firstName.charAt(0)}
                        {person.personalInfo.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {person.personalInfo.firstName}{" "}
                          {person.personalInfo.lastName}
                        </p>
                        <p className="text-xs text-slate-500">
                          {person.personalInfo.phone}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {person.personalInfo.professionalTitle}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">
                        {person.personalInfo.email}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        {person.personalInfo.city},{" "}
                        {person.personalInfo.country}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewDetails(person)}
                      className="hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      Voir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div className="lg:hidden space-y-4">
          {data.map((person, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {person.personalInfo.firstName.charAt(0)}
                    {person.personalInfo.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {person.personalInfo.firstName}{" "}
                      {person.personalInfo.lastName}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {person.personalInfo.phone}
                    </p>
                  </div>
                </div>
              </div>

              <Badge variant="secondary" className="font-normal">
                {person.personalInfo.professionalTitle}
              </Badge>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{person.personalInfo.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {person.personalInfo.city}, {person.personalInfo.country}
                  </span>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewDetails(person)}
                className="w-full hover:bg-blue-50 hover:text-blue-700 hover:border-blue-300"
              >
                <Eye className="w-4 h-4 mr-2" />
                Voir les détails
              </Button>
            </div>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 px-2">
            <Select value={String(itemsPerPage)} onValueChange={handleChange}>
              <SelectTrigger className="w-[90px]">
                <SelectValue placeholder="Select a fruit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                  <SelectItem value="50">50</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-9"
              >
                <ChevronLeft className="w-4 h-4" />
                Précédent
              </Button>

              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => {
                    if (
                      page === 1 ||
                      page === totalPages ||
                      (page >= currentPage - 1 && page <= currentPage + 1)
                    ) {
                      return (
                        <Button
                          key={page}
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => goToPage(page)}
                          className="h-9 w-9"
                        >
                          {page}
                        </Button>
                      );
                    } else if (
                      page === currentPage - 2 ||
                      page === currentPage + 2
                    ) {
                      return (
                        <span key={page} className="px-1 text-slate-500">
                          ...
                        </span>
                      );
                    }
                    return null;
                  }
                )}
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={() => goToPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="h-9"
              >
                Suivant
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}
      </div>

      <PersonalInfoDialog
        person={selectedPerson}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
