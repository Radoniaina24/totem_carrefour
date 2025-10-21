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
import { Plus, Trash2, GraduationCap } from "lucide-react";
import { useState } from "react";
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
  const [educations, setEducations] = useState<Education[]>(
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

  const onSubmit = (formData: Omit<Education, "id">) => {
    if (editingId) {
      setEducations(
        educations.map((edu) =>
          edu.id === editingId ? { ...formData, id: editingId } : edu
        )
      );
      setEditingId(null);
    } else {
      setEducations([
        ...educations,
        { ...formData, id: Date.now().toString() },
      ]);
    }
    reset();
    setShowForm(false);
  };

  const handleEdit = (edu: Education) => {
    setEditingId(edu.id);
    setValue("degree", edu.degree);
    setValue("institution", edu.institution);
    setValue("location", edu.location);
    setValue("startDate", edu.startDate);
    setValue("endDate", edu.endDate);
    setValue("currentStudy", edu.currentStudy);
    setValue("description", edu.description);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    setEducations(educations.filter((edu) => edu.id !== id));
  };

  const handleNext = () => {
    if (educations.length === 0) {
      alert("Veuillez ajouter au moins une formation");
      return;
    }
    onNext(educations);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Formation</h2>
        <p className="text-gray-600">Ajoutez vos diplômes et formations</p>
      </div>

      {educations.length > 0 && (
        <div className="space-y-4 mb-6">
          {educations.map((edu) => (
            <div
              key={edu.id}
              className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow"
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
                    Modifier
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(edu.id)}
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
          Ajouter une formation
        </Button>
      ) : (
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
