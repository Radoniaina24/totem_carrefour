"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { personalInfoSchema } from "@/lib/validation";
import { PersonalInfo } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Camera, Upload } from "lucide-react";
import { useState, useRef } from "react";

interface StepPersonalInfoProps {
  data: PersonalInfo;
  onNext: (data: PersonalInfo) => void;
}

export default function StepPersonalInfo({
  data,
  onNext,
}: StepPersonalInfoProps) {
  const [photoPreview, setPhotoPreview] = useState<string | undefined>(
    data.photo
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PersonalInfo>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: data,
  });

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhotoPreview(result);
        setValue("photo", result);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (formData: PersonalInfo) => {
    onNext(formData);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Informations Personnelles
        </h2>
        <p className="text-gray-600">Commencez par vos informations de base</p>
      </div>

      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-100 border-4 border-gray-200">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Photo de profil"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-400" />
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="absolute bottom-0 right-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-5 h-5" />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="hidden"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="firstName">Prénom *</Label>
          <Input
            id="firstName"
            {...register("firstName")}
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="lastName">Nom *</Label>
          <Input
            id="lastName"
            {...register("lastName")}
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            {...register("email")}
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone">Téléphone *</Label>
          <Input
            id="phone"
            {...register("phone")}
            className={errors.phone ? "border-red-500" : ""}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="address">Adresse *</Label>
          <Input
            id="address"
            {...register("address")}
            className={errors.address ? "border-red-500" : ""}
          />
          {errors.address && (
            <p className="text-red-500 text-sm mt-1">
              {errors.address.message}
            </p>
          )}
        </div>

        <div>
          <Label htmlFor="city">Ville *</Label>
          <Input
            id="city"
            {...register("city")}
            className={errors.city ? "border-red-500" : ""}
          />
          {errors.city && (
            <p className="text-red-500 text-sm mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="zipCode">Code postal *</Label>
          <Input
            id="zipCode"
            {...register("zipCode")}
            className={errors.zipCode ? "border-red-500" : ""}
          />
          {errors.zipCode && (
            <p className="text-red-500 text-sm mt-1">
              {errors.zipCode.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="country">Pays *</Label>
          <Input
            id="country"
            {...register("country")}
            className={errors.country ? "border-red-500" : ""}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="professionalTitle">Titre professionnel *</Label>
          <Input
            id="professionalTitle"
            placeholder="ex: Développeur Full Stack"
            {...register("professionalTitle")}
            className={errors.professionalTitle ? "border-red-500" : ""}
          />
          {errors.professionalTitle && (
            <p className="text-red-500 text-sm mt-1">
              {errors.professionalTitle.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <Label htmlFor="profileSummary">Résumé professionnel *</Label>
          <Textarea
            id="profileSummary"
            rows={5}
            placeholder="Décrivez votre profil professionnel, vos compétences clés et vos objectifs de carrière..."
            {...register("profileSummary")}
            className={errors.profileSummary ? "border-red-500" : ""}
          />
          {errors.profileSummary && (
            <p className="text-red-500 text-sm mt-1">
              {errors.profileSummary.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end pt-6">
        <Button type="submit" size="lg" className="px-8">
          Suivant
        </Button>
      </div>
    </form>
  );
}
