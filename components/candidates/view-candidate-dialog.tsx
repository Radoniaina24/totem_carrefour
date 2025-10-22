'use client';

import { Candidate } from '@/lib/candidates-data';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Mail, Phone, MapPin, Briefcase, Calendar, Clock } from 'lucide-react';

interface ViewCandidateDialogProps {
  candidate: Candidate;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const STATUS_COLORS = {
  nouveau: 'bg-blue-100 text-blue-800',
  'en cours': 'bg-yellow-100 text-yellow-800',
  accepté: 'bg-green-100 text-green-800',
  rejeté: 'bg-red-100 text-red-800',
};

export function ViewCandidateDialog({
  candidate,
  open,
  onOpenChange,
}: ViewCandidateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            Détails du candidat
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold">
                {candidate.first_name} {candidate.last_name}
              </h3>
              <p className="text-gray-600 mt-1">{candidate.position}</p>
            </div>
            <Badge className={STATUS_COLORS[candidate.status]}>
              {candidate.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <Mail className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <p className="font-medium">{candidate.email}</p>
              </div>
            </div>

            {candidate.phone && (
              <div className="flex items-start space-x-3">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Téléphone</p>
                  <p className="font-medium">{candidate.phone}</p>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-3">
              <Briefcase className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Expérience</p>
                <p className="font-medium">{candidate.experience_years} ans</p>
              </div>
            </div>

            {candidate.location && (
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-gray-400 mt-0.5" />
                <div>
                  <p className="text-sm text-gray-500">Localisation</p>
                  <p className="font-medium">{candidate.location}</p>
                </div>
              </div>
            )}

            <div className="flex items-start space-x-3">
              <Calendar className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Date de candidature</p>
                <p className="font-medium">
                  {new Date(candidate.applied_date).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-500">Dernière mise à jour</p>
                <p className="font-medium">
                  {new Date(candidate.updated_at).toLocaleDateString('fr-FR', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
