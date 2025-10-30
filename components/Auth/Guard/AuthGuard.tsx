"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import {
  setUser,
  selectIsAuthenticated,
  selectUser,
} from "@/redux/features/authSlice";

import { useGetUserQuery } from "@/redux/api/authApi";
import PreLoader from "@/components/PreLoader";
import Loading from "@/components/Loading/Loading";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetUserQuery("");

  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  const [checked, setChecked] = useState(false); // pour éviter les redirections prématurées

  // Met à jour le store une fois que les données sont reçues
  useEffect(() => {
    if (data?.user) {
      dispatch(setUser(data.user));
      setChecked(true); // données chargées et utilisateur mis à jour
    } else if (error) {
      setChecked(true); // l'utilisateur n'est pas authentifié
    }
  }, [data, error, dispatch]);

  // Redirection en fonction du rôle après vérification complète
  useEffect(() => {
    if (!isLoading && checked) {
      if (!isAuthenticated || !user) {
        router.replace("/");
      } else if (user.role !== "candidate") {
        router.replace("/");
      }
    }
  }, [checked, isAuthenticated, user, router, isLoading]);

  // Pendant chargement
  if (isLoading || !checked) {
    return <PreLoader />;
  }

  // En attente de redirection
  if (!user || user.role !== "candidate") {
    return null;
  }

  return <Loading>{children}</Loading>;
}
