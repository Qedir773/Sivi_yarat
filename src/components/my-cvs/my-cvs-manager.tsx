"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Copy, FilePlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Card3D,
  FadeIn3D,
  PopIn,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion/primitives";
import {
  listSavedCvs,
  createSavedCv,
  duplicateSavedCv,
  deleteSavedCv,
  type SavedCv,
} from "@/lib/storage/cv-database";
import type { TemplateConfig } from "@/lib/templates/discovery";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

function formatUpdatedAt(timestamp: number) {
  return new Date(timestamp).toLocaleDateString("az-AZ", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function MyCvsManager({ templates }: { templates: TemplateConfig[] }) {
  const { myCvsPage } = dict;
  const router = useRouter();
  const [cvs, setCvs] = useState<SavedCv[] | null>(null);
  const [newName, setNewName] = useState("");
  const [newTemplateId, setNewTemplateId] = useState(templates[0]?.id ?? "");
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  useEffect(() => {
    listSavedCvs().then(setCvs);
  }, []);

  async function handleCreate() {
    if (!newName.trim() || !newTemplateId) return;
    const cv = await createSavedCv(newName.trim(), newTemplateId);
    router.push(`/builder?template=${cv.templateId}&cv=${cv.id}`);
  }

  async function handleDuplicate(id: string) {
    const copy = await duplicateSavedCv(id);
    if (copy) setCvs((prev) => (prev ? [copy, ...prev] : [copy]));
  }

  async function handleDelete(id: string) {
    await deleteSavedCv(id);
    setCvs((prev) => (prev ? prev.filter((cv) => cv.id !== id) : prev));
    setPendingDeleteId(null);
  }

  function templateName(templateId: string) {
    return templates.find((tpl) => tpl.id === templateId)?.name ?? templateId;
  }

  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 perspective-far">
      <FadeIn3D as="div">
        <div className="mb-8">
          <span className="font-mono-label flex items-center gap-2 text-muted-foreground">
            <span className="neon-dot-violet" />
            CV-lərim
          </span>
          <h1 className="font-heading neon-underline mt-3 text-4xl font-medium leading-tight tracking-tight">
            {myCvsPage.title}
          </h1>
          <p className="mt-3 text-muted-foreground">{myCvsPage.subtitle}</p>
        </div>
      </FadeIn3D>

      <FadeIn3D as="div" delay={0.1}>
        <Card className="mb-6 border-border/60">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PopIn>
                <span className="flex size-6 items-center justify-center rounded bg-neon/10 text-neon">
                  <FilePlus className="size-3.5" />
                </span>
              </PopIn>
              {myCvsPage.createNew}
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap items-end gap-3">
            <div className="min-w-48 flex-1 space-y-1.5">
              <Label htmlFor="new-cv-name">{myCvsPage.nameLabel}</Label>
              <Input
                id="new-cv-name"
                placeholder={myCvsPage.namePlaceholder}
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            </div>
            <div className="w-56 space-y-1.5">
              <Label>{myCvsPage.templateLabel}</Label>
              <Select value={newTemplateId} onValueChange={(value) => value && setNewTemplateId(value)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {templates.map((tpl) => (
                    <SelectItem key={tpl.id} value={tpl.id}>
                      {tpl.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              type="button"
              onClick={handleCreate}
              disabled={!newName.trim()}
              className="bg-neon text-neon-foreground hover:bg-neon/90 disabled:opacity-50"
            >
              <FilePlus /> {myCvsPage.create}
            </Button>
          </CardContent>
        </Card>
      </FadeIn3D>

      {cvs && cvs.length === 0 ? (
        <FadeIn3D as="div">
          <div className="rounded-xl border border-dashed bg-card/50 py-16 text-center">
            <p className="text-muted-foreground">{myCvsPage.empty}</p>
            <p className="mt-2 font-mono-label text-muted-foreground/60">
              ↑ Yuxarıdakı formada CV yarat
            </p>
          </div>
        </FadeIn3D>
      ) : null}

      <StaggerContainer className="space-y-3" as="div">
        {(cvs ?? []).map((cv) => (
          <StaggerItem key={cv.id} variant="right" as="div">
            <Card3D className="rounded-xl" intensity={3}>
              <Card>
                <CardContent className="flex flex-wrap items-center justify-between gap-3 py-1">
                  <div className="min-w-0">
                    <p className="truncate font-medium">{cv.name}</p>
                    <p className="truncate text-sm text-muted-foreground">
                      {templateName(cv.templateId)} · {myCvsPage.updatedAt} {formatUpdatedAt(cv.updatedAt)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    {pendingDeleteId === cv.id ? (
                      <>
                        <span className="text-sm text-muted-foreground">{myCvsPage.confirmDelete}</span>
                        <Button type="button" size="sm" variant="destructive" onClick={() => handleDelete(cv.id)}>
                          {myCvsPage.confirmYes}
                        </Button>
                        <Button type="button" size="sm" variant="ghost" onClick={() => setPendingDeleteId(null)}>
                          {myCvsPage.confirmNo}
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          size="sm"
                          nativeButton={false}
                          render={
                            <Link href={`/builder?template=${cv.templateId}&cv=${cv.id}`}>
                              {myCvsPage.open}
                            </Link>
                          }
                        />
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => handleDuplicate(cv.id)}
                        >
                          <Copy /> {myCvsPage.duplicate}
                        </Button>
                        <Button
                          type="button"
                          size="icon-sm"
                          variant="ghost"
                          aria-label={myCvsPage.delete}
                          onClick={() => setPendingDeleteId(cv.id)}
                        >
                          <Trash2 />
                        </Button>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            </Card3D>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
