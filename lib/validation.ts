import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Numéro de téléphone invalide"),
  address: z.string().min(5, "Adresse requise"),
  city: z.string().min(2, "Ville requise"),
  zipCode: z.string().min(2, "Code postal requis"),
  country: z.string().min(2, "Pays requis"),
  professionalTitle: z.string().min(3, "Titre professionnel requis"),
  profileSummary: z
    .string()
    .min(50, "Le résumé doit contenir au moins 50 caractères")
    .max(500, "Maximum 500 caractères"),
  photo: z
    .any()
    .refine((file) => file instanceof File, "Une photo valide est requise")
    .optional(),
});

export const experienceSchema = z
  .object({
    jobTitle: z.string().min(2, "Titre du poste requis"),
    company: z.string().min(2, "Nom de l'entreprise requis"),
    location: z.string().min(2, "Localisation requise"),
    startDate: z.string().min(1, "Date de début requise"),
    endDate: z.string().optional(),
    currentJob: z.boolean(),
    description: z
      .string()
      .min(20, "Description requise (minimum 20 caractères)"),
  })
  .refine(
    (data) => {
      if (!data.currentJob && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "Date de fin requise si ce n'est pas votre poste actuel",
      path: ["endDate"],
    }
  );

export const educationSchema = z
  .object({
    degree: z.string().min(2, "Diplôme requis"),
    institution: z.string().min(2, "Établissement requis"),
    location: z.string().min(2, "Localisation requise"),
    startDate: z.string().min(1, "Date de début requise"),
    endDate: z.string().optional(),
    currentStudy: z.boolean(),
    description: z
      .string()
      .min(10, "Description requise (minimum 10 caractères)"),
  })
  .refine(
    (data) => {
      if (!data.currentStudy && !data.endDate) {
        return false;
      }
      return true;
    },
    {
      message: "Date de fin requise si ce n'est pas votre formation actuelle",
      path: ["endDate"],
    }
  );

export const skillSchema = z.object({
  name: z.string().min(2, "Nom de la compétence requis"),
  level: z.enum(["beginner", "intermediate", "advanced", "expert"], {
    errorMap: () => ({ message: "Niveau requis" }),
  }),
});

export const languageSchema = z.object({
  name: z.string().min(2, "Nom de la langue requis"),
  level: z.enum(["basic", "conversational", "fluent", "native"], {
    errorMap: () => ({ message: "Niveau requis" }),
  }),
});
