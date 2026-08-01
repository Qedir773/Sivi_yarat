"use client";

import { useState } from "react";
import { Loader2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { getTextGenerationProvider } from "@/features/ai/registry";
import { getDictionary } from "@/locales";
import { siteConfig } from "@/config/site";

const dict = getDictionary(siteConfig.defaultLocale);

type Stage = "idle" | "loading-model" | "generating" | "done" | "error";

interface AiEnhanceButtonProps {
  currentText: string;
  onApply: (newText: string) => void;
}

export function AiEnhanceButton({ currentText, onApply }: AiEnhanceButtonProps) {
  const { aiEnhance } = dict.builderPage;
  const [open, setOpen] = useState(false);
  const [stage, setStage] = useState<Stage>("idle");
  const [result, setResult] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleOpen() {
    setOpen(true);
    setStage("loading-model");
    setResult("");
    setErrorMessage(null);
    try {
      const provider = getTextGenerationProvider();
      setStage("generating");
      const output = await provider.generate([
        {
          role: "system",
          content:
            "Sən peşəkar CV redaktorusan. İstifadəçinin yazdığı mətni daha professional və işgüzar Azərbaycan dilinə çevir, məzmunu və faktları dəyişmədən yalnız üslubu təkmilləşdir. Yalnız yekun mətni qaytar, əlavə izahat yazma.",
        },
        { role: "user", content: currentText },
      ]);
      setResult(output);
      setStage("done");
    } catch (error) {
      // Surface the actual reason so users (and admins) know whether it's a
      // config issue (no GEMINI_API_KEY) or a transient failure.
      setErrorMessage(
        error instanceof Error ? error.message : aiEnhance.error,
      );
      setStage("error");
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        disabled={!currentText.trim()}
        onClick={handleOpen}
      >
        <Sparkles /> {aiEnhance.button}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="size-5 text-primary" />
              {aiEnhance.dialogTitle}
            </DialogTitle>
          </DialogHeader>

          {stage === "loading-model" || stage === "generating" ? (
            <div className="flex flex-col items-center gap-3 py-8 text-sm text-muted-foreground">
              <Loader2 className="size-6 animate-spin" />
              {stage === "loading-model" ? aiEnhance.loadingModel : aiEnhance.generating}
            </div>
          ) : stage === "error" ? (
            <p className="py-8 text-center text-sm text-destructive" role="alert">
              {errorMessage ?? aiEnhance.error}
            </p>
          ) : (
            <>
              <p className="text-sm text-muted-foreground">{aiEnhance.note}</p>
              <Textarea rows={8} value={result} onChange={(event) => setResult(event.target.value)} />
            </>
          )}

          <DialogFooter>
            <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
              {aiEnhance.cancel}
            </Button>
            <Button
              type="button"
              disabled={stage !== "done"}
              onClick={() => {
                onApply(result);
                setOpen(false);
              }}
            >
              {aiEnhance.apply}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
