"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { experienceSchema } from "@/lib/validation";
import { Experience } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, Briefcase } from "lucide-react";
import { useState } from "react";

interface StepExperienceProps {
  data: Experience[];
  onNext: (data: Experience[]) => void;
  onBack: () => void;
}

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    // On ajoute "-01" si ce n’est qu’un "YYYY-MM" pour éviter une erreur
    const fullDate = dateString.length === 7 ? `${dateString}-01` : dateString;
    return new Date(fullDate).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  } catch (error) {
    console.error("Erreur de formatage de date :", error);
    return dateString;
  }
};

export default function StepExperience({
  data,
  onNext,
  onBack,
}: StepExperienceProps) {
  const [experiences, setExperiences] = useState<Experience[]>(
    data.length > 0 ? data : []
  );
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Omit<Experience, "id">>({
    resolver: zodResolver(experienceSchema),
    defaultValues: {
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      currentJob: false,
      description: "",
    },
  });

  const currentJob = watch("currentJob");

  const onSubmit = (formData: Omit<Experience, "id">) => {
    if (editingId) {
      setExperiences(
        experiences.map((exp) =>
          exp.id === editingId ? { ...formData, id: editingId } : exp
        )
      );
      setEditingId(null);
    } else {
      setExperiences([
        ...experiences,
        { ...formData, id: Date.now().toString() },
      ]);
    }
    reset();
    setShowForm(false);
  };

  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    setValue("jobTitle", exp.jobTitle);
    setValue("company", exp.company);
    setValue("location", exp.location);
    setValue("startDate", exp.startDate);
    setValue("endDate", exp.endDate);
    setValue("currentJob", exp.currentJob);
    setValue("description", exp.description);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setExperiences(experiences.filter((exp) => exp.id !== id));
  };

  const handleNext = () => {
    if (experiences.length === 0) {
      alert("Veuillez ajouter au moins une expérience professionnelle");
      return;
    }
    onNext(experiences);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Expérience Professionnelle
        </h2>
        <p className="text-gray-600">
          Ajoutez vos expériences professionnelles
        </p>
      </div>

      {experiences.length > 0 && (
        <div className="space-y-4 mb-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Briefcase className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {exp.jobTitle}
                    </h3>
                    <p className="text-blue-600 font-medium">{exp.company}</p>
                    <p className="text-sm text-gray-600 mt-1">{exp.location}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(exp.startDate)} -{" "}
                      {exp.currentJob ? "Présent" : formatDate(exp.endDate)}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      {exp.description}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2 ml-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(exp)}
                  >
                    Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(exp.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-600" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {!showForm ? (
        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed border-2 py-8"
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une expérience
        </Button>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4"
        >
          <h3 className="font-semibold text-lg mb-4">
            {editingId ? "Modifier l'expérience" : "Nouvelle expérience"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="jobTitle">Titre du poste *</Label>
              <Input
                id="jobTitle"
                {...register("jobTitle")}
                className={errors.jobTitle ? "border-red-500" : ""}
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.jobTitle.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="company">Entreprise *</Label>
              <Input
                id="company"
                {...register("company")}
                className={errors.company ? "border-red-500" : ""}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.company.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="location">Localisation *</Label>
              <Input
                id="location"
                {...register("location")}
                className={errors.location ? "border-red-500" : ""}
              />
              {errors.location && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.location.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="startDate">Date de début *</Label>
              <Input
                id="startDate"
                type="month"
                {...register("startDate")}
                className={errors.startDate ? "border-red-500" : ""}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.startDate.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="endDate">Date de fin {!currentJob && "*"}</Label>
              <Input
                id="endDate"
                type="month"
                disabled={currentJob}
                {...register("endDate")}
                className={errors.endDate ? "border-red-500" : ""}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.endDate.message}
                </p>
              )}
            </div>

            <div className="md:col-span-2 flex items-center space-x-2">
              <Checkbox
                id="currentJob"
                checked={currentJob}
                onCheckedChange={(checked) =>
                  setValue("currentJob", checked as boolean)
                }
              />
              <Label htmlFor="currentJob" className="cursor-pointer">
                Je travaille actuellement dans ce poste
              </Label>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Décrivez vos responsabilités, réalisations et compétences développées..."
                {...register("description")}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {editingId ? "Mettre à jour" : "Ajouter"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                reset();
                setShowForm(false);
                setEditingId(null);
              }}
            >
              Annuler
            </Button>
          </div>
        </form>
      )}

      <div className="flex justify-between pt-6">
        <Button type="button" variant="outline" onClick={onBack}>
          Retour
        </Button>
        <Button type="button" onClick={handleNext}>
          Suivant
        </Button>
      </div>
    </div>
  );
}
