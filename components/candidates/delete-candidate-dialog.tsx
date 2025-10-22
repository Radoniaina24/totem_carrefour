'use client';

import { useState } from 'react';
import { Candidate } from '@/lib/candidates-data';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DeleteCandidateDialogProps {
  candidate: Candidate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: (deletedId: string) => void;
}

export function DeleteCandidateDialog({
  candidate,
  open,
  onOpenChange,
  onDelete,
}: DeleteCandidateDialogProps) {
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);

    try {
      onDelete(candidate.id);
      toast.success('Candidat supprimé avec succès');
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting candidate:', error);
      toast.error('Erreur lors de la suppression du candidat');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Êtes-vous sûr ?</AlertDialogTitle>
          <AlertDialogDescription>
            Cette action est irréversible. Le candidat{' '}
            <span className="font-semibold">
              {candidate.first_name} {candidate.last_name}
            </span>{' '}
            sera définitivement supprimé de la liste.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Annuler
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? 'Suppression...' : 'Supprimer'}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
