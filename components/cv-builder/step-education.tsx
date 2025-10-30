"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { educationSchema } from "@/lib/validation";
import { Education } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Plus, Trash2, GraduationCap, Pencil } from "lucide-react";
import { useState, useMemo } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { formatDate } from "./step-experience";

interface StepEducationProps {
  data: Education[];
  onNext: (data: Education[]) => void;
  onBack: () => void;
}

export default function StepEducation({
  data,
  onNext,
  onBack,
}: StepEducationProps) {
  // ✅ Génère un ID unique même si la BDD n'en a pas
  const initialEducations = useMemo(
    () =>
      data.map((edu) => ({
        ...edu,
        id: edu.id || uuidv4(),
      })),
    [data]
  );
  // console.log(data);
  const [educations, setEducations] = useState<Education[]>(initialEducations);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Omit<Education, "id">>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      currentStudy: false,
      description: "",
    },
  });

  const currentStudy = watch("currentStudy");

  /** ✅ Création ou mise à jour */
  const onSubmit = (formData: Omit<Education, "id">) => {
    if (editingId) {
      setEducations((prev) =>
        prev.map((edu) =>
          edu.id === editingId ? { ...edu, ...formData } : edu
        )
      );
      toast.success("Formation mise à jour avec succès !");
    } else {
      setEducations((prev) => [...prev, { ...formData, id: uuidv4() }]);
      toast.success("Nouvelle formation ajoutée !");
    }

    reset();
    setEditingId(null);
    setShowForm(false);
  };

  /** ✅ Édition */
  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    Object.entries(edu).forEach(([key, value]) => {
      if (key !== "id") setValue(key as keyof Omit<Education, "id">, value);
    });
    setShowForm(true);
  };

  /** ✅ Suppression avec confirmation */
  const handleDelete = (id: string) => {
    const edu = educations.find((e) => e.id === id);
    if (!edu) return;

    const confirmed = window.confirm(
      `Voulez-vous vraiment supprimer la formation "${edu.degree}" à ${edu.institution} ?`
    );

    if (confirmed) {
      setEducations((prev) => prev.filter((e) => e.id !== id));
      toast.success("Formation supprimée avec succès !");
    }
  };

  /** ✅ Étape suivante */
  const handleNext = () => {
    if (educations.length === 0) {
      toast.error("Veuillez ajouter au moins une formation.");
      return;
    }
    onNext(educations);
  };

  /** ✅ Annuler */
  const handleCancel = () => {
    reset();
    setShowForm(false);
    setEditingId(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900">Formation</h2>
        <p className="text-gray-600">
          Ajoutez, modifiez ou supprimez vos formations et diplômes.
        </p>
      </div>

      {/* ✅ Liste des formations */}
      {educations.length > 0 && (
        <div className="space-y-4 mb-6">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <GraduationCap className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-gray-900">
                      {edu.degree}
                    </h3>
                    <p className="text-green-600 font-medium">
                      {edu.institution}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">{edu.location}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      {formatDate(edu.startDate)} -{" "}
                      {edu.currentStudy ? "En cours" : formatDate(edu.endDate)}
                    </p>
                    <p className="text-sm text-gray-700 mt-2">
                      {edu.description}
                    </p>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(edu)}
                  >
                    <Pencil className="w-4 h-4 mr-1" /> Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(edu.id)}
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

      {/* ✅ Formulaire */}
      {showForm ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-gray-50 border border-gray-200 rounded-lg p-6 space-y-4"
        >
          <h3 className="font-semibold text-lg mb-4">
            {editingId ? "Modifier la formation" : "Nouvelle formation"}
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="degree">Diplôme *</Label>
              <Input
                id="degree"
                placeholder="ex: Master en Informatique"
                {...register("degree")}
                className={errors.degree ? "border-red-500" : ""}
              />
              {errors.degree && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.degree.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="institution">Établissement *</Label>
              <Input
                id="institution"
                {...register("institution")}
                className={errors.institution ? "border-red-500" : ""}
              />
              {errors.institution && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.institution.message}
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
                // defaultValue={data?.startData ?? data?.startDate ?? ""}
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
              <Label htmlFor="endDate">
                Date de fin {!currentStudy && "*"}
              </Label>
              <Input
                id="endDate"
                type="month"
                disabled={currentStudy}
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
                id="currentStudy"
                checked={currentStudy}
                onCheckedChange={(checked) =>
                  setValue("currentStudy", checked as boolean)
                }
              />
              <Label htmlFor="currentStudy" className="cursor-pointer">
                Formation en cours
              </Label>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description *</Label>
              <Textarea
                id="description"
                rows={4}
                placeholder="Décrivez le contenu de la formation, les compétences acquises..."
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
          Ajouter une formation
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
