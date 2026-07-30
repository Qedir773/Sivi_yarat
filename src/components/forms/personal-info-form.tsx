"use client";

import { useRef, useState } from "react";
import { Controller, type Control, type UseFormRegister } from "react-hook-form";
import { Pencil, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PhotoCropDialog } from "@/components/editor/photo-crop-dialog";
import type { CVFormValues } from "@/lib/validation/cv-schema";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

export function PersonalInfoForm({
  control,
  register,
}: {
  control: Control<CVFormValues>;
  register: UseFormRegister<CVFormValues>;
}) {
  const { builderPage } = dict;
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [cropSource, setCropSource] = useState<string | null>(null);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCropSource(reader.result as string);
    reader.readAsDataURL(file);
    event.target.value = "";
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{builderPage.sections.personalInfo}</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-1.5">
          <Label htmlFor="fullName">{builderPage.fields.fullName}</Label>
          <Input id="fullName" {...register("personalInfo.fullName")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="jobTitle">{builderPage.fields.jobTitle}</Label>
          <Input id="jobTitle" {...register("personalInfo.title")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="email">{builderPage.fields.email}</Label>
          <Input id="email" type="email" {...register("personalInfo.email")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="phone">{builderPage.fields.phone}</Label>
          <Input id="phone" {...register("personalInfo.phone")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="location">{builderPage.fields.location}</Label>
          <Input id="location" {...register("personalInfo.location")} />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="website">{builderPage.fields.website}</Label>
          <Input id="website" {...register("personalInfo.website")} />
        </div>

        <div className="space-y-1.5 sm:col-span-2">
          <Label>{builderPage.fields.photo}</Label>
          <Controller
            control={control}
            name="personalInfo.photoUrl"
            render={({ field }) => (
              <div className="flex items-center gap-3">
                {field.value ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={field.value}
                    alt=""
                    className="size-14 rounded-full object-cover ring-1 ring-border"
                  />
                ) : null}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload /> {builderPage.fields.uploadPhoto}
                </Button>
                {field.value ? (
                  <>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => setCropSource(field.value ?? null)}
                    >
                      <Pencil /> {builderPage.fields.editPhoto}
                    </Button>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => field.onChange("")}
                    >
                      <X /> {builderPage.fields.removePhoto}
                    </Button>
                  </>
                ) : null}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <PhotoCropDialog
                  imageSrc={cropSource}
                  onOpenChange={(open) => !open && setCropSource(null)}
                  onConfirm={(dataUrl) => {
                    field.onChange(dataUrl);
                    setCropSource(null);
                  }}
                />
              </div>
            )}
          />
        </div>
      </CardContent>
    </Card>
  );
}
