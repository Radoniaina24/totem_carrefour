"use client";

import { SetStateAction, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { CVData } from "@/lib/types";

import CVPreviewUser from "./cv-builder/cv-preview-user";

export function CVBuilder({
  children,
  data,
}: {
  children: React.ReactNode;
  data: CVData;
}) {
  const [open, setOpen] = useState(false);
  // console.log(data);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* <DialogHeader>
          <DialogTitle>Créer un nouveau CV</DialogTitle>
          <DialogDescription>
            Remplissez les informations pour créer votre CV professionnel
          </DialogDescription>
        </DialogHeader> */}

        <CVPreviewUser data={data} />
      </DialogContent>
    </Dialog>
  );
}
