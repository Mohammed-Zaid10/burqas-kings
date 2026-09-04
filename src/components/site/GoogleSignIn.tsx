import { useState } from "react";
import { toast } from "sonner";
import { lovable } from "@/integrations/lovable/index";
import { Button } from "@/components/site/Button";

export function GoogleSignIn({ next, label = "Continue with Google" }: { next?: string; label?: string }) {
  const [busy, setBusy] = useState(false);

  const signIn = async () => {
    setBusy(true);
    try {
      if (next && typeof window !== "undefined") {
        window.sessionStorage.setItem("bk:auth-next", next);
      }
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (result.error) {
        toast.error("We couldn't sign you in. Please try again.");
        setBusy(false);
        return;
      }
      if (result.redirected) return;
      if (next) window.location.assign(next);
    } catch {
      toast.error("We couldn't sign you in. Please try again.");
      setBusy(false);
    }
  };

  return (
    <Button onClick={signIn} disabled={busy} size="lg">
      {busy ? "Opening Google…" : label}
    </Button>
  );
}
