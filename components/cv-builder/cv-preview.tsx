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

export default function CVPreview({ data, onBack, onEdit }: CVPreviewProps) {
  const [addCvData] = useAddCandidateMutation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const ErrorNotification = (msg: string) => toast.error(msg);
  const SuccessNotification = (msg: string) => toast.success(msg);
  const handleDownload = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const form = new FormData();
      const photo = data.personalInfo.photo;
      console.log(photo);
      form.append("data", JSON.stringify(data));

      if (photo) {
        form.append("file", photo);
      }

      const res = await addCvData(form).unwrap();
      SuccessNotification("CV envoyé avec success");
      setIsLoading(false);
    } catch (error: any) {
      console.log(error);
      ErrorNotification(error.data.message);
    } finally {
      setIsLoading(false);
    }
    // console.log(data);
  };

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
      <div className="flex justify-between items-center mb-6 print:hidden">
        <h2 className="text-2xl font-bold text-gray-900">Aperçu de votre CV</h2>
        <div className="flex gap-3">
          <Button variant="outline" onClick={onBack}>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
          <Button
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
            onClick={handleDownload}
          >
            {isLoading ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="w-4 h-4  text-white mr-2 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
                <span className="sr-only">Loading...</span>
              </div>
            ) : (
              <Send className="w-4 h-4 mr-2" />
            )}
            Soumettre
          </Button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-8 py-10">
          <div className="flex items-start gap-6">
            {data.personalInfo.photo && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                <img
                  src={
                    typeof data.personalInfo.photo === "string"
                      ? data.personalInfo.photo // cas où c’est déjà une URL (ex: venant du backend)
                      : URL.createObjectURL(data.personalInfo.photo) // cas où c’est un fichier
                  }
                  alt={`${data.personalInfo.firstName} ${data.personalInfo.lastName}`}
                  className="w-full h-full object-cover"
                />
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
              {data.experiences.map((exp) => (
                <div
                  key={exp.id}
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
              {data.education.map((edu) => (
                <div
                  key={edu.id}
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
                {data.skills.map((skill) => (
                  <div
                    key={skill.id}
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
                  {data.languages.map((language) => (
                    <div
                      key={language.id}
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
