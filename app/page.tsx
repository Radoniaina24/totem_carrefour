"use client";

import { useState } from "react";
import {
  CVData,
  PersonalInfo,
  Experience,
  Education,
  Skill,
  Language,
} from "@/lib/types";
import ProgressBar from "@/components/cv-builder/progress-bar";
import StepPersonalInfo from "@/components/cv-builder/step-personal-info";
import StepExperience from "@/components/cv-builder/step-experience";
import StepEducation from "@/components/cv-builder/step-education";
import StepSkills from "@/components/cv-builder/step-skills";
import CVPreview from "@/components/cv-builder/cv-preview";
import { FileText } from "lucide-react";
import { Toaster } from "react-hot-toast";

const steps = [
  { number: 1, title: "Informations", description: "Données personnelles" },
  { number: 2, title: "Expérience", description: "Parcours professionnel" },
  { number: 3, title: "Formation", description: "Études et diplômes" },
  { number: 4, title: "Compétences", description: "Compétences et langues" },
  { number: 5, title: "Aperçu", description: "Votre CV final" },
];

const initialPersonalInfo: PersonalInfo = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
  city: "",
  zipCode: "",
  country: "",
  professionalTitle: "",
  profileSummary: "",
  photo: undefined,
};

export default function Home() {
  const [currentStep, setCurrentStep] = useState(1);
  const [cvData, setCvData] = useState<CVData>({
    personalInfo: initialPersonalInfo,
    experiences: [],
    education: [],
    skills: [],
    languages: [],
  });

  const handlePersonalInfoNext = (data: PersonalInfo) => {
    setCvData({ ...cvData, personalInfo: data });
    setCurrentStep(2);
  };

  const handleExperienceNext = (data: Experience[]) => {
    setCvData({ ...cvData, experiences: data });
    setCurrentStep(3);
  };

  const handleEducationNext = (data: Education[]) => {
    setCvData({ ...cvData, education: data });
    setCurrentStep(4);
  };

  const handleSkillsNext = (skills: Skill[], languages: Language[]) => {
    setCvData({ ...cvData, skills, languages });
    setCurrentStep(5);
  };
  // console.log(cvData);
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div>
        <Toaster />
      </div>
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 text-white rounded-full mb-4">
            <FileText className="w-8 h-8" />
          </div>
          {/* <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Créateur de CV Professionnel
          </h1>
          <p className="text-gray-600 text-lg">
            Créez votre CV professionnel en quelques étapes simples
          </p> */}
        </div>

        {currentStep < 5 && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <ProgressBar currentStep={currentStep} steps={steps} />
          </div>
        )}

        <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
          {currentStep === 1 && (
            <StepPersonalInfo
              data={cvData.personalInfo}
              onNext={handlePersonalInfoNext}
            />
          )}

          {currentStep === 2 && (
            <StepExperience
              data={cvData.experiences}
              onNext={handleExperienceNext}
              onBack={() => setCurrentStep(1)}
            />
          )}

          {currentStep === 3 && (
            <StepEducation
              data={cvData.education}
              onNext={handleEducationNext}
              onBack={() => setCurrentStep(2)}
            />
          )}

          {currentStep === 4 && (
            <StepSkills
              skillsData={cvData.skills}
              languagesData={cvData.languages}
              onNext={handleSkillsNext}
              onBack={() => setCurrentStep(3)}
            />
          )}

          {currentStep === 5 && (
            <CVPreview
              data={cvData}
              onBack={() => setCurrentStep(4)}
              onEdit={() => setCurrentStep(1)}
              setCvData={setCvData}
              setCurrentStep={setCurrentStep}
            />
          )}
        </div>
      </div>
    </div>
  );
}
