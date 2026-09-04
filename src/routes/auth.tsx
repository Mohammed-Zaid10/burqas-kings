import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { PageHero } from "@/components/site/Bits";
import { Button } from "@/components/site/Button";
import { GoogleSignIn } from "@/components/site/GoogleSignIn";
import { useAuthSession } from "@/hooks/useAuthSession";
import { supabase } from "@/integrations/supabase/client";

type AuthSearch = { redirect?: string };

export const Route = createFileRoute("/auth")({
  ssr: false,
  validateSearch: (search: Record<string, unknown>): AuthSearch =>
    typeof search['redirect'] === "string" ? { redirect: search['redirect'] } : {},
  head: () => ({
    meta: [
      { title: "Sign in — Burqas Kings" },
      { name: "description", content: "Sign in or create your Burqas Kings account with Google to check out and follow your orders." },
      { property: "og:title", content: "Sign in — Burqas Kings" },
      { property: "og:description", content: "Sign in or create your account with Google." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

function safePath(value: string | undefined) {
  if (!value) return "/";
  return value.startsWith("/") && !value.startsWith("//") ? value : "/";
}

function AuthPage() {
  const { redirect } = Route.useSearch();
  const { user, loading } = useAuthSession();
  const navigate = useNavigate();
  const next = safePath(redirect);

  useEffect(() => {
    if (!loading && user && redirect) {
      navigate({ to: next, replace: true });
    }
  }, [loading, user, redirect, next, navigate]);

  return (
    <div className="page-enter">
      <PageHero
        eyebrow="Account"
        title={user ? "You're signed in" : "Sign in or create an account"}
        copy={
          user
            ? "Your orders and saved details are tied to this account."
            : "Continue with Google — it signs you in, or creates your account if you're new."
        }
        compact
      />
      <div className="shell py-16 pb-28">
        <div className="mx-auto max-w-md border border-border p-8 text-center">
          {loading ? (
            <p className="text-sm text-muted-foreground">One moment…</p>
          ) : user ? (
            <>
              <p className="text-sm text-muted-foreground">Signed in as</p>
              <p className="mt-2 text-lg">{user.email}</p>
              <div className="mt-7 flex flex-col gap-3">
                <Button onClick={() => navigate({ to: "/account" })}>Go to your account</Button>
                <Button
                  variant="outline"
                  onClick={async () => {
                    await supabase.auth.signOut();
                    navigate({ to: "/", replace: true });
                  }}
                >
                  Sign out
                </Button>
              </div>
            </>
          ) : (
            <div className="flex flex-col gap-4">
              <GoogleSignIn next={next} />
              <p className="text-xs text-muted-foreground">
                We only use your Google name, email and photo to set up your account.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
