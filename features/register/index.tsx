"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2, UserPlus } from "lucide-react";
import { RegisterFormData, registerSchema } from "@/lib/validation";
import { useAddUserMutation } from "@/redux/api/userApi";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [addUsers] = useAddUserMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const SuccessNotification = (msg: string) => toast.success(msg);
  const ErrorNotification = (msg: any) => toast.error(msg);

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    try {
      const payload = {
        lastName: data.lastName,
        firstName: data.firstName,
        email: data.email,
        password: data.password,
        roles: ["candidate"],
      };
      const res = await addUsers(payload).unwrap();
      SuccessNotification(res?.message);
      reset();
      router.push("/login");
    } catch (err: any) {
      ErrorNotification(err?.data?.message || "Erreur interne du serveur");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Toaster />
      <Card className="max-w-lg w-full shadow-2xl border border-blue-100 bg-white/90 backdrop-blur-md rounded-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-orange-500 rounded-full shadow-md">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-blue-900">
            Créer un compte
          </CardTitle>
          <CardDescription className="text-center text-blue-600">
            Inscrivez-vous pour accéder à votre espace personnel
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-blue-800">
                  Prénom
                </Label>
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Jean"
                  {...register("firstName")}
                  className={`focus:ring-2 focus:ring-orange-500 ${
                    errors.firstName ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.firstName && (
                  <p className="text-sm text-red-500">
                    {errors.firstName.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-blue-800">
                  Nom
                </Label>
                <Input
                  id="lastName"
                  type="text"
                  placeholder="Dupont"
                  {...register("lastName")}
                  className={`focus:ring-2 focus:ring-orange-500 ${
                    errors.lastName ? "border-red-500" : ""
                  }`}
                  disabled={isLoading}
                />
                {errors.lastName && (
                  <p className="text-sm text-red-500">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-blue-800">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="jean.dupont@exemple.com"
                {...register("email")}
                className={`focus:ring-2 focus:ring-orange-500 ${
                  errors.email ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-blue-800">
                Mot de passe
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register("password")}
                className={`focus:ring-2 focus:ring-orange-500 ${
                  errors.password ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-blue-800">
                Confirmer le mot de passe
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
                className={`focus:ring-2 focus:ring-orange-500 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
                disabled={isLoading}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-red-500">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-200 shadow-md rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Inscription en cours...
                </>
              ) : (
                "S'inscrire"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-blue-700">
            Vous avez déjà un compte ?{" "}
            <Link
              href="/login"
              className="text-orange-600 font-medium hover:underline"
            >
              Se connecter
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
