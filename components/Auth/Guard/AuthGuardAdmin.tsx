"use client";
/* eslint-disable */
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

import {
  setUser,
  selectIsAuthenticated,
  selectUser,
} from "@/redux/features/authSlice";
import PreLoader from "@/components/PreLoader";
import Loading from "@/components/Loading/Loading";
import { useGetUserQuery } from "@/redux/api/authApi";

export default function AdminGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetUserQuery("");
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user: any = useSelector(selectUser);

  const [checked, setChecked] = useState(false);

  const roles: string[] = user?.roles || user?.user?.roles;
  const allowedRoles = ["admin", "candidate", "recruiter"];

  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
    }
    setChecked(true); // que l'on ait une erreur ou pas, on a "terminé" la vérification
  }, [data, error, dispatch]);

  // Redirection selon l'état d'authentification et le rôle
  useEffect(() => {
    if (!isLoading && checked) {
      const hasValidRole = roles?.some((role) => allowedRoles.includes(role));
      if (!isAuthenticated || !hasValidRole) {
        router.replace("/");
      }
    }
  }, [checked, isLoading, isAuthenticated, user, router]);

  // Affiche le préloader pendant la vérification
  if (isLoading || !checked) {
    return <PreLoader />;
  }

  // Ne rien afficher si l'utilisateur est en redirection
  const hasValidRole = roles?.some((role) => allowedRoles.includes(role));
  if (!user || !hasValidRole) {
    return null;
  }

  // Accès autorisé
  return <Loading>{children}</Loading>;
}
