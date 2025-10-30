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
import { Plus, Trash2, Briefcase, Pencil } from "lucide-react";
import { useState, useMemo } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";

interface StepExperienceProps {
  data: Experience[];
  onNext: (data: Experience[]) => void;
  onBack: () => void;
}

export const formatDate = (dateString: string) => {
  if (!dateString) return "";
  try {
    const fullDate = dateString.length === 7 ? `${dateString}-01` : dateString;
    return new Date(fullDate).toLocaleDateString("fr-FR", {
      month: "long",
      year: "numeric",
    });
  } catch {
    return dateString;
  }
};

export default function StepExperience({
  data,
  onNext,
  onBack,
}: StepExperienceProps) {
  // ✅ Toujours avoir un ID unique, même si la BDD n'en fournit pas
  const initialExperiences = useMemo(
    () =>
      data.map((exp) => ({
        ...exp,
        id: exp.id || uuidv4(),
      })),
    [data]
  );

  const [experiences, setExperiences] =
    useState<Experience[]>(initialExperiences);
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

  /** ✅ Création / mise à jour d’une expérience */
  const onSubmit = (formData: Omit<Experience, "id">) => {
    if (editingId) {
      // Modification
      setExperiences((prev) =>
        prev.map((exp) =>
          exp.id === editingId ? { ...exp, ...formData } : exp
        )
      );
      toast.success("Expérience mise à jour avec succès !");
    } else {
      // Création
      setExperiences((prev) => [...prev, { ...formData, id: uuidv4() }]);
      toast.success("Nouvelle expérience ajoutée !");
    }

    reset();
    setShowForm(false);
    setEditingId(null);
  };

  /** ✅ Édition */
  const handleEdit = (exp: Experience) => {
    setEditingId(exp.id);
    Object.entries(exp).forEach(([key, value]) => {
      if (key !== "id") setValue(key as keyof Omit<Experience, "id">, value);
    });
    setShowForm(true);
  };

  /** ✅ Suppression avec confirmation */
  const handleDelete = (id: string) => {
    const exp = experiences.find((e) => e.id === id);
    if (!exp) return;

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer l'expérience "${exp.jobTitle}" chez ${exp.company} ?`
    );

    if (confirmed) {
      setExperiences((prev) => prev.filter((e) => e.id !== id));
      toast.success("Expérience supprimée avec succès !");
    }
  };

  /** ✅ Passage à l’étape suivante */
  const handleNext = () => {
    if (experiences.length === 0) {
      toast.error("Veuillez ajouter au moins une expérience professionnelle");
      return;
    }
    onNext(experiences);
  };

  /** ✅ Annuler et réinitialiser le formulaire */
  const handleCancel = () => {
    reset();
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">
          Expérience Professionnelle
        </h2>
        <p className="text-gray-600">
          Ajoutez, modifiez ou supprimez vos expériences professionnelles.
        </p>
      </div>

      {/* ✅ Liste des expériences */}
      {experiences.length > 0 && (
        <div className="space-y-4 mb-6">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
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
                    <Pencil className="w-4 h-4 mr-1" /> Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(exp.id)}
                    className="text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ✅ Formulaire d’ajout / édition */}
      {showForm ? (
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
                className={errors.jobTitle && "border-red-500"}
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
                className={errors.company && "border-red-500"}
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
                className={errors.location && "border-red-500"}
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
                className={errors.startDate && "border-red-500"}
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
                className={errors.endDate && "border-red-500"}
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
                className={errors.description && "border-red-500"}
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
            <Button type="button" variant="outline" onClick={handleCancel}>
              Annuler
            </Button>
          </div>
        </form>
      ) : (
        <Button
          type="button"
          variant="outline"
          className="w-full border-dashed border-2 py-8"
          onClick={() => setShowForm(true)}
        >
          <Plus className="w-5 h-5 mr-2" />
          Ajouter une expérience
        </Button>
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
