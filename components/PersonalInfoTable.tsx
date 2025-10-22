"use client";

import { useState } from "react";
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
import { PersonalInfo } from "@/lib/schemas";
import { PersonalInfoDialog } from "./PersonalInfoDialog";

interface PersonalInfoTableProps {
  data: PersonalInfo[];
  itemsPerPage?: number;
}

export function PersonalInfoTable({ data, itemsPerPage = 5 }: PersonalInfoTableProps) {
  const [selectedPerson, setSelectedPerson] = useState<PersonalInfo | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);

  const handleViewDetails = (person: PersonalInfo) => {
    setSelectedPerson(person);
    setDialogOpen(true);
  };

  const goToPage = (page: number) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

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
              {currentData.map((person, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <TableCell className="font-medium">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                        {person.firstName.charAt(0)}
                        {person.lastName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">
                          {person.firstName} {person.lastName}
                        </p>
                        <p className="text-xs text-slate-500">{person.phone}</p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-normal">
                      {person.professionalTitle}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <Mail className="w-4 h-4" />
                      <span className="text-sm">{person.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2 text-slate-600">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">
                        {person.city}, {person.country}
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
          {currentData.map((person, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-slate-200 shadow-sm p-4 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
                    {person.firstName.charAt(0)}
                    {person.lastName.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {person.firstName} {person.lastName}
                    </h3>
                    <p className="text-xs text-slate-500">{person.phone}</p>
                  </div>
                </div>
              </div>

              <Badge variant="secondary" className="font-normal">
                {person.professionalTitle}
              </Badge>

              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-slate-600">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{person.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-slate-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">
                    {person.city}, {person.country}
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
            <div className="text-sm text-slate-600">
              Affichage de {startIndex + 1} à {Math.min(endIndex, data.length)} sur {data.length} profils
            </div>
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
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
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
                  } else if (page === currentPage - 2 || page === currentPage + 2) {
                    return <span key={page} className="px-1 text-slate-500">...</span>;
                  }
                  return null;
                })}
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
