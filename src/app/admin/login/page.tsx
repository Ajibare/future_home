"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";
import { toast } from "sonner";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }
      toast.success("Welcome back");
      router.push(searchParams.get("next") || "/admin");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-alt)" }}>
      <div className="w-full max-w-sm">
        <div className="flex flex-col items-center mb-8">
          <Logo width={44} height={44} />
          <h1 className="font-display text-xl font-bold mt-4" style={{ color: "var(--text)" }}>Admin Portal</h1>
          <p className="text-sm mt-1" style={{ color: "var(--text-muted)" }}>Future Homes Properties</p>
        </div>
        <div className="rounded-2xl p-8 shadow-large" style={{ background: "var(--surface)", border: "1px solid var(--border)" }}>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="admin@futurehomes.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            {error && (
              <p className="text-sm" style={{ color: "var(--danger, #ef4444)" }} role="alert">{error}</p>
            )}
            <Button type="submit" fullWidth size="lg" disabled={isSubmitting} loading={isSubmitting}>
              <Lock className="h-4 w-4" />
              Sign In
            </Button>
          </form>
        </div>
        <p className="flex items-center justify-center gap-1.5 text-xs mt-6" style={{ color: "var(--text-muted)" }}>
          <ShieldCheck className="h-3.5 w-3.5" />
          Restricted access &middot; Authorized personnel only
        </p>
      </div>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <React.Suspense fallback={null}>
      <LoginForm />
    </React.Suspense>
  );
}
