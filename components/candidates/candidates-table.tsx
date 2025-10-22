'use client';

import { useState, useEffect } from 'react';
import { Candidate, candidatesData } from '@/lib/candidates-data';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Search,
  Filter,
} from 'lucide-react';
import { ViewCandidateDialog } from './view-candidate-dialog';
import { EditCandidateDialog } from './edit-candidate-dialog';
import { DeleteCandidateDialog } from './delete-candidate-dialog';

const ITEMS_PER_PAGE = 10;

const STATUS_COLORS = {
  nouveau: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  'en cours': 'bg-yellow-100 text-yellow-800 hover:bg-yellow-100',
  accepté: 'bg-green-100 text-green-800 hover:bg-green-100',
  rejeté: 'bg-red-100 text-red-800 hover:bg-red-100',
};

export function CandidatesTable() {
  const [candidates, setCandidates] = useState<Candidate[]>(candidatesData);
  const [filteredCandidates, setFilteredCandidates] = useState<Candidate[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [positionFilter, setPositionFilter] = useState<string>('all');

  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    filterCandidates();
  }, [candidates, searchTerm, statusFilter, positionFilter]);

  const filterCandidates = () => {
    let filtered = [...candidates];

    if (searchTerm) {
      filtered = filtered.filter(
        (candidate) =>
          candidate.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          candidate.position.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((candidate) => candidate.status === statusFilter);
    }

    if (positionFilter !== 'all') {
      filtered = filtered.filter((candidate) => candidate.position === positionFilter);
    }

    setFilteredCandidates(filtered);
    setCurrentPage(1);
  };

  const positions = Array.from(new Set(candidates.map((c) => c.position)));

  const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentCandidates = filteredCandidates.slice(startIndex, endIndex);

  const handleView = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setViewDialogOpen(true);
  };

  const handleEdit = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setEditDialogOpen(true);
  };

  const handleDelete = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setDeleteDialogOpen(true);
  };

  const handleCandidateUpdated = (updatedCandidate: Candidate) => {
    setCandidates((prev) =>
      prev.map((c) => (c.id === updatedCandidate.id ? updatedCandidate : c))
    );
  };

  const handleCandidateDeleted = (deletedId: string) => {
    setCandidates((prev) => prev.filter((c) => c.id !== deletedId));
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Rechercher par nom, email, poste..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-2 w-full sm:w-auto">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="nouveau">Nouveau</SelectItem>
              <SelectItem value="en cours">En cours</SelectItem>
              <SelectItem value="accepté">Accepté</SelectItem>
              <SelectItem value="rejeté">Rejeté</SelectItem>
            </SelectContent>
          </Select>

          <Select value={positionFilter} onValueChange={setPositionFilter}>
            <SelectTrigger className="w-full sm:w-[200px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Poste" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les postes</SelectItem>
              {positions.map((position) => (
                <SelectItem key={position} value={position}>
                  {position}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="rounded-lg border bg-white shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold">Nom</TableHead>
                <TableHead className="font-semibold">Email</TableHead>
                <TableHead className="font-semibold">Poste</TableHead>
                <TableHead className="font-semibold">Statut</TableHead>
                <TableHead className="font-semibold">Expérience</TableHead>
                <TableHead className="font-semibold">Localisation</TableHead>
                <TableHead className="font-semibold">Date</TableHead>
                <TableHead className="text-right font-semibold">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentCandidates.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    Aucun candidat trouvé
                  </TableCell>
                </TableRow>
              ) : (
                currentCandidates.map((candidate) => (
                  <TableRow key={candidate.id} className="hover:bg-gray-50 transition-colors">
                    <TableCell className="font-medium">
                      {candidate.first_name} {candidate.last_name}
                    </TableCell>
                    <TableCell className="text-gray-600">{candidate.email}</TableCell>
                    <TableCell className="text-gray-600">{candidate.position}</TableCell>
                    <TableCell>
                      <Badge className={STATUS_COLORS[candidate.status]}>
                        {candidate.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-gray-600">
                      {candidate.experience_years} ans
                    </TableCell>
                    <TableCell className="text-gray-600">{candidate.location}</TableCell>
                    <TableCell className="text-gray-600">
                      {new Date(candidate.applied_date).toLocaleDateString('fr-FR')}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleView(candidate)}>
                            <Eye className="mr-2 h-4 w-4" />
                            Voir détails
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(candidate)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Modifier
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleDelete(candidate)}
                            className="text-red-600 focus:text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Supprimer
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Affichage de {startIndex + 1} à {Math.min(endIndex, filteredCandidates.length)} sur{' '}
            {filteredCandidates.length} candidat(s)
          </p>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Précédent
            </Button>
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8 p-0"
                >
                  {page}
                </Button>
              ))}
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Suivant
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {selectedCandidate && (
        <>
          <ViewCandidateDialog
            candidate={selectedCandidate}
            open={viewDialogOpen}
            onOpenChange={setViewDialogOpen}
          />
          <EditCandidateDialog
            candidate={selectedCandidate}
            open={editDialogOpen}
            onOpenChange={setEditDialogOpen}
            onUpdate={handleCandidateUpdated}
          />
          <DeleteCandidateDialog
            candidate={selectedCandidate}
            open={deleteDialogOpen}
            onOpenChange={setDeleteDialogOpen}
            onDelete={handleCandidateDeleted}
          />
        </>
      )}
    </div>
  );
}
