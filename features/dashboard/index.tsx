"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  LogOut,
  User,
  Mail,
  Calendar,
  Shield,
  FileText,
  Plus,
  Eye,
  Trash2,
  Edit,
} from "lucide-react";
import { authAPI, useLogoutMutation } from "@/redux/api/authApi";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "@/redux/features/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { candidateAPI, useGetMyCvQuery } from "@/redux/api/candidateApi";
import { CVData } from "@/lib/types";
import { CVBuilder } from "@/components/CVBuilder";
import { usersAPI } from "@/redux/api/userApi";
import { CVEdit } from "@/components/CVEdit";
import { Toaster } from "react-hot-toast";

export default function Dashboard() {
  return <DashboardContent />;
}

function DashboardContent() {
  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  const { data: myCv, isLoading } = useGetMyCvQuery("");
  const cv: CVData = myCv?.data;
  // console.log(cv);
  const user: any = useSelector(selectUser);

  // console.log(user);

  const roles: string[] = user?.roles || user?.user?.roles;

  const allowedRolesRecruiter = ["admin", "recruiter"];
  const allowedRolesCandidate = ["candidate"];

  const hasValidRoleRecruiter = roles?.some((role) =>
    allowedRolesRecruiter.includes(role)
  );
  const hasValidRoleCandidate = roles?.some((role) =>
    allowedRolesCandidate.includes(role)
  );

  const getInitials = () => {
    if (!user) return "U";
    return `${user?.user?.firstName[0]}${user?.user?.lastName[0]}`.toUpperCase();
  };

  const router = useRouter();
  const dispatch = useDispatch();
  const [logoutUser] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutUser("").unwrap();
      dispatch(authAPI.util.resetApiState());
      dispatch(candidateAPI.util.resetApiState());
      dispatch(usersAPI.util.resetApiState());
      dispatch(logout());
      router.push("/");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50">
      {/* ===== NAVBAR ===== */}
      <div className="z-[9999999999]">
        {" "}
        <Toaster />
      </div>

      <nav className="bg-white/90 backdrop-blur-md border-b border-blue-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-blue-600" />
              <h1 className="text-xl font-bold text-blue-900">
                Mon Tableau de Bord
              </h1>
            </div>
            <Button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white transition"
            >
              <LogOut className="h-4 w-4" />
              Déconnexion
            </Button>
          </div>
        </div>
      </nav>

      {/* ===== MAIN CONTENT ===== */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        {/* <div className="mb-10 text-center md:text-left">
          <h2 className="text-3xl font-bold text-blue-900 mb-2">
            Bienvenue {user?.user?.firstName}
          </h2>
          <p className="text-blue-700">
            Accédez à vos informations et gérez votre compte facilement.
          </p>
        </div> */}

        {/* Profile Information */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="md:col-span-2 lg:col-span-2 shadow-lg border border-blue-100 hover:shadow-blue-200 transition">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-900">
                <User className="h-5 w-5 text-orange-500" />
                Informations du profil
              </CardTitle>
              <CardDescription className="text-blue-700">
                Vos données personnelles sécurisées
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 bg-blue-600 text-gray-500">
                  <AvatarFallback className="text-xl font-bold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-2xl font-bold text-blue-900">
                    {user?.user?.firstName} {user?.user?.lastName}
                  </h3>
                  <Badge className="mt-2 bg-green-100 text-green-700 border-none">
                    Compte actif
                  </Badge>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <InfoRow
                  icon={<Mail className="h-5 w-5 text-blue-500" />}
                  label="Email"
                  value={user?.user?.email}
                />
                <InfoRow
                  icon={<User className="h-5 w-5 text-orange-500" />}
                  label="Prénom"
                  value={user?.user?.firstName}
                />
                <InfoRow
                  icon={<User className="h-5 w-5 text-orange-500" />}
                  label="Nom"
                  value={user?.user?.lastName}
                />
                <InfoRow
                  icon={<Calendar className="h-5 w-5 text-blue-500" />}
                  label="Membre depuis"
                  value={
                    user?.user?.createdAt && formatDate(user?.user?.createdAt)
                  }
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}

        {hasValidRoleRecruiter && (
          <Card className="mt-30 shadow-lg border border-blue-100 hover:shadow-blue-200 transition">
            <CardHeader>
              <CardTitle className="text-blue-900">Actions rapides</CardTitle>
              <CardDescription className="text-blue-700">
                Candidatures
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-1 ">
                <Button
                  onClick={() => router.push("/candidate")}
                  className="justify-start bg-blue-600 hover:bg-blue-700 text-white transition"
                >
                  <User className="mr-2 h-4 w-4" />
                  Regarder les listes de candidatures
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {hasValidRoleCandidate && (
          <Card className="mt-6 shadow-lg">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Mon CV
                  </CardTitle>
                </div>
                {cv ? (
                  ""
                ) : (
                  <Button
                    onClick={() => router.push("/curriculum-vitae")}
                    className="bg-slate-900 hover:bg-slate-800"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Nouveau CV
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <p className="text-center text-slate-500 py-8">Chargement...</p>
              ) : !cv ? (
                <div className="text-center py-12">
                  <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <p className="text-slate-500 mb-4">
                    Aucun CV créé pour le moment
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 md:grid-cols-1">
                  {cv && (
                    <Card
                      key={cv.personalInfo.email}
                      className="border-slate-200"
                    >
                      <CardHeader>
                        <CardTitle className="text-lg flex items-center gap-2">
                          <FileText className="h-5 w-5" />
                          {cv.personalInfo.professionalTitle}
                        </CardTitle>
                        <CardDescription className="line-clamp-2">
                          {cv.personalInfo.profileSummary || "Aucun résumé"}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        {/* <div className="text-sm text-slate-600">
                        <p>Créé le {formatDate(cv.)}</p>
                        <p className="mt-1">
                          {cv.experiences.length} expérience(s) ·{" "}
                          {cv.education.length} formation(s)
                        </p>
                      </div> */}
                        <div className="flex gap-2">
                          <CVBuilder data={cv}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1"
                            >
                              <Eye className="h-4 w-4 mr-2" />
                              Voir
                            </Button>
                          </CVBuilder>
                          <CVEdit data={cv}>
                            <Button
                              variant="outline"
                              size="sm"
                              // onClick={() => deleteCV(cv.id)}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                          </CVEdit>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </main>
    </div>
  );
}

/** ✅ Sous-composant propre pour les lignes d’information */
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start space-x-3">
      {icon}
      <div>
        <p className="text-sm font-medium text-blue-600">{label}</p>
        <p className="text-base text-blue-900">{value}</p>
      </div>
    </div>
  );
}
