"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Shield, Lock, UserPlus, ArrowRight, Check } from "lucide-react";
import { useSelector } from "react-redux";
import { selectUser } from "@/redux/features/authSlice";

export default function Home() {
  const user: any = useSelector(selectUser);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* ======== NAVBAR ======== */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <span className="text-xl font-bold text-blue-900">
                Carrefour Application
              </span>
            </div>
            <div className="flex items-center gap-3">
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white transition">
                    Mon Compte
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="text-blue-700 hover:text-blue-900"
                    >
                      Connexion
                    </Button>
                  </Link>
                  <Link href="/register">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white transition">
                      S'inscrire
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* ======== HERO SECTION ======== */}
      <main>
        <section className="py-20 px-4 text-center">
          <div className="max-w-7xl mx-auto">
            <div className="inline-flex items-center justify-center p-3 bg-blue-600 rounded-full mb-6 shadow-md">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-blue-900 mb-6">
              Authentification Professionnelle
            </h1>
            <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
              Accédez à votre espace personnel en toute sécurité grâce à notre
              système d’authentification moderne et robuste.
            </p>
            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-orange-500 hover:bg-orange-600 text-lg px-8 text-white font-semibold transition"
                  >
                    <UserPlus className="mr-2 h-5 w-5" />
                    Créer un compte
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="text-lg px-8 border-blue-600 text-blue-700 hover:bg-blue-50"
                  >
                    Se connecter
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </section>

        {/* ======== FEATURES SECTION ======== */}
        <section className="py-16 px-4 bg-white border-t border-blue-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-blue-900 mb-12">
              Fonctionnalités
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {/* CARD 1 */}
              <Card className="shadow-xl border border-blue-100 hover:shadow-2xl transition">
                <CardHeader>
                  <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
                    <Shield className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-900">
                    Sécurité Maximale
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Protection avancée avec cryptage et validation stricte des
                    mots de passe.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Cryptage des données",
                      "Validation robuste",
                      "Protection CSRF",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                        <span className="text-sm text-blue-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CARD 2 */}
              <Card className="shadow-xl border border-blue-100 hover:shadow-2xl transition">
                <CardHeader>
                  <div className="p-3 bg-orange-100 rounded-full w-fit mb-4">
                    <UserPlus className="h-6 w-6 text-orange-500" />
                  </div>
                  <CardTitle className="text-blue-900">
                    Inscription Facile
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Créez votre compte en quelques secondes avec un formulaire
                    intuitif et fluide.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Interface intuitive",
                      "Validation en temps réel",
                      "Messages d'erreur clairs",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                        <span className="text-sm text-blue-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* CARD 3 */}
              <Card className="shadow-xl border border-blue-100 hover:shadow-2xl transition">
                <CardHeader>
                  <div className="p-3 bg-blue-100 rounded-full w-fit mb-4">
                    <Lock className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-blue-900">
                    Tableau de Bord
                  </CardTitle>
                  <CardDescription className="text-blue-700">
                    Accédez à votre espace personnel sécurisé après connexion.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {[
                      "Profil personnalisé",
                      "Statistiques en temps réel",
                      "Gestion du compte",
                    ].map((item, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-orange-500 mr-2 mt-0.5" />
                        <span className="text-sm text-blue-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
