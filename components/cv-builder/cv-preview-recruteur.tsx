"use client";

import { CVData } from "@/lib/types";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  Code,
  Languages,
  Edit,
  Send,
} from "lucide-react";
import { formatDate } from "./step-experience";
import { useAddCandidateMutation } from "@/redux/api/candidateApi";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
interface CVPreviewProps {
  data: CVData;
  onBack: () => void;
  onEdit: () => void;
}

export default function CVPreviewRecruteur({
  data,
  onBack,
  onEdit,
}: CVPreviewProps) {
  const skillLevelLabels = {
    beginner: "Débutant",
    intermediate: "Intermédiaire",
    advanced: "Avancé",
    expert: "Expert",
  };

  const languageLevelLabels = {
    basic: "Notions de base",
    conversational: "Conversationnel",
    fluent: "Courant",
    native: "Langue maternelle",
  };

  return (
    <div className="space-y-6">
      <div>
        <Toaster />
      </div>
      <div className="flex justify-between items-center mb-6 print:hidden"></div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-10">
          <div className="flex items-start gap-6">
            {data.personalInfo.photo && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                {data.personalInfo.photo ? (
                  <img
                    src={data.personalInfo.photo as unknown as string}
                    alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={
                      "https://res.cloudinary.com/dbpoyo4gw/image/upload/v1761194621/t%C3%A9l%C3%A9chargement_galbo6.jpg" // cas où c’est un fichier
                    }
                    alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
            )}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">
                {data.personalInfo.firstName} {data.personalInfo.lastName}
              </h1>
              <p className="text-xl text-blue-100 mb-4">
                {data.personalInfo.professionalTitle}
              </p>
              <div className="flex flex-wrap gap-4 text-sm text-blue-100">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {data.personalInfo.email}
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {data.personalInfo.phone}
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {data.personalInfo.city}, {data.personalInfo.country}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-8 space-y-8">
          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-3 pb-2 border-b-2 border-blue-600">
              Profil
            </h2>
            <p className="text-gray-700 leading-relaxed">
              {data.personalInfo.profileSummary}
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2">
              <Briefcase className="w-5 h-5" />
              Expérience Professionnelle
            </h2>
            <div className="space-y-6">
              {data.experiences.map((exp, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-gray-300"
                >
                  <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1.5"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {exp.jobTitle}
                  </h3>
                  <p className="text-blue-600 font-medium">{exp.company}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{exp.location}</span>
                    <span>
                      {formatDate(exp.startDate)} -{" "}
                      {exp.currentJob ? "Présent" : formatDate(exp.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2">
              <GraduationCap className="w-5 h-5" />
              Formation
            </h2>
            <div className="space-y-6">
              {data.education.map((edu, index) => (
                <div
                  key={index}
                  className="relative pl-6 border-l-2 border-gray-300"
                >
                  <div className="absolute w-3 h-3 bg-green-600 rounded-full -left-[7px] top-1.5"></div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {edu.degree}
                  </h3>
                  <p className="text-green-600 font-medium">
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
                    <span>{edu.location}</span>
                    <span>
                      {formatDate(edu.startDate)} -{" "}
                      {edu.currentStudy ? "En cours" : formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="text-gray-700 mt-2 leading-relaxed">
                    {edu.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2">
                <Code className="w-5 h-5" />
                Compétences
              </h2>
              <div className="space-y-3">
                {data.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900">
                      {skill.name}
                    </span>
                    <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                      {skillLevelLabels[skill.level]}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {data.languages.length > 0 && (
              <section>
                <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b-2 border-blue-600 flex items-center gap-2">
                  <Languages className="w-5 h-5" />
                  Langues
                </h2>
                <div className="space-y-3">
                  {data.languages.map((language, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <span className="font-medium text-gray-900">
                        {language.name}
                      </span>
                      <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        {languageLevelLabels[language.level]}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
