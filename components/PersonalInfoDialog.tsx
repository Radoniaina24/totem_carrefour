"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { CVData } from "@/lib/types";
import CVPreviewRecruteur from "./cv-builder/cv-preview-recruteur";

interface PersonalInfoDialogProps {
  person: CVData | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PersonalInfoDialog({
  person,
  open,
  onOpenChange,
}: PersonalInfoDialogProps) {
  if (!person) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Profil Complet
          </DialogTitle>
        </DialogHeader>

        {/* <div className="space-y-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
              {person.personalInfo.firstName.charAt(0)}
              {person.personalInfo.lastName.charAt(0)}
            </div>
            <div>
              <h3 className="text-2xl font-bold">
                {person.personalInfo.firstName} {person.personalInfo.lastName}
              </h3>
              <Badge variant="secondary" className="mt-1">
                {person.personalInfo.professionalTitle}
              </Badge>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <Mail className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-600">Email</p>
                <p className="text-sm text-slate-900">
                  {person.personalInfo.email}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <Phone className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-600">Téléphone</p>
                <p className="text-sm text-slate-900">
                  {person.personalInfo.phone}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <MapPin className="w-5 h-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-slate-600">Adresse</p>
                <p className="text-sm text-slate-900">
                  {person.personalInfo.address}
                </p>
                <p className="text-sm text-slate-900">
                  {person.personalInfo.zipCode} {person.personalInfo.city}
                </p>
                <p className="text-sm text-slate-900">
                  {person.personalInfo.country}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-slate-50 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600 mt-0.5" />
              <div className="w-full">
                <p className="text-sm font-medium text-slate-600 mb-2">
                  Résumé Professionnel
                </p>
                <p className="text-sm text-slate-900 leading-relaxed">
                  {person.personalInfo.profileSummary}
                </p>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">
                Expériences Professionnelles
              </h3>
            </div>
            <div className="space-y-4">
              {mockExperiences.map((exp, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {exp.jobTitle}
                      </h4>
                      <p className="text-sm text-slate-600">{exp.company}</p>
                    </div>
                    {exp.currentJob && (
                      <Badge variant="default" className="bg-green-600">
                        En cours
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{exp.location}</span>
                    <span>•</span>
                    <span>
                      {exp.startDate} -{" "}
                      {exp.currentJob ? "Présent" : exp.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div>
            <div className="flex items-center space-x-2 mb-4">
              <GraduationCap className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-bold text-slate-900">Formation</h3>
            </div>
            <div className="space-y-4">
              {mockEducation.map((edu, index) => (
                <div
                  key={index}
                  className="p-4 bg-slate-50 rounded-lg border border-slate-200"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold text-slate-900">
                        {edu.degree}
                      </h4>
                      <p className="text-sm text-slate-600">
                        {edu.institution}
                      </p>
                    </div>
                    {edu.currentStudy && (
                      <Badge variant="default" className="bg-blue-600">
                        En cours
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-500 mb-2">
                    <MapPin className="w-3 h-3" />
                    <span>{edu.location}</span>
                    <span>•</span>
                    <span>
                      {edu.startDate} -{" "}
                      {edu.currentStudy ? "Présent" : edu.endDate}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Code className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">
                  Compétences
                </h3>
              </div>
              <div className="space-y-2">
                {mockSkills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-slate-50 rounded"
                  >
                    <span className="text-sm font-medium text-slate-900">
                      {skill.name}
                    </span>
                    <Badge variant="outline">{levelLabels[skill.level]}</Badge>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Languages className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold text-slate-900">Langues</h3>
              </div>
              <div className="space-y-2">
                {mockLanguages.map((lang, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-2 bg-slate-50 rounded"
                  >
                    <span className="text-sm font-medium text-slate-900">
                      {lang.name}
                    </span>
                    <Badge variant="outline">{levelLabels[lang.level]}</Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}
        <CVPreviewRecruteur
          data={person}
          onBack={function (): void {
            throw new Error("Function not implemented.");
          }}
          onEdit={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
