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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2, LogIn, AlertCircle } from "lucide-react";
import { LoginFormData, loginSchema } from "@/lib/validation";
import { useLoginMutation } from "@/redux/api/authApi";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [login] = useLoginMutation();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError("");
    try {
      const payload = {
        email: data.email,
        password: data.password,
      };
      const res = await login(payload).unwrap();
      router.push("/dashboard");
      console.log(res);
    } catch (err: any) {
      console.log(err);
      setError(
        err.data?.message || "Une erreur est survenue lors de la connexion"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <Card className="max-w-lg  w-full shadow-2xl border border-blue-100 bg-white/90 backdrop-blur-md rounded-2xl">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 bg-orange-500 rounded-full shadow-md">
              <LogIn className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-center text-blue-900">
            Connexion
          </CardTitle>
          <CardDescription className="text-center text-blue-600">
            Connectez-vous à votre compte pour continuer
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert
                variant="destructive"
                className="bg-red-50 border-red-200 text-red-700"
              >
                <div className="flex items-center gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription>{error}</AlertDescription>
                </div>
              </Alert>
            )}

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

            <Button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold transition-all duration-200 shadow-md rounded-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Connexion en cours...
                </>
              ) : (
                "Se connecter"
              )}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex flex-col space-y-4">
          <div className="text-sm text-center text-blue-700">
            Vous n'avez pas de compte ?{" "}
            <Link
              href="/register"
              className="text-orange-600 font-medium hover:underline"
            >
              S'inscrire
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
