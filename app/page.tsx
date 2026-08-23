"use client";

import { useState } from "react";
import { Loader2, Search, Sparkles } from "lucide-react";
import Logo from "../components/Logo";
import ReportCard from "../components/ReportCard";
import { buildReport, ReportData } from "../lib/github";

const SUGGESTIONS = ["torvalds", "sindresorhus", "yyx990803", "gaearon"];

export default function Home() {
  const [username, setUsername] = useState("");
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async (user: string) => {
    const clean = user.trim().replace(/@/, "");
    if (!clean || loading) return;
    setLoading(true);
    setError(null);
    try {
      const data = await buildReport(clean);
      setReport(data);
    } catch (e) {
      const msg =
        e instanceof Error && e.message === "NOT_FOUND"
          ? "User not found. Check the username."
          : e instanceof Error && e.message === "RATE_LIMIT"
          ? "GitHub rate limit hit. Wait a minute, then try again."
          : "Something went wrong. Try again.";
      setError(msg);
      setReport(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-ink">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-paper/10 bg-ink/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <div className="leading-tight">
              <p className="font-display text-xl font-bold text-paper">GitDarpan</p>
              <p className="text-[9px] uppercase tracking-[0.22em] text-paper/50">GitHub, reflected</p>
            </div>
          </div>
          <Sparkles className="h-5 w-5 text-gold" />
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 pb-16 pt-10">
        {/* Hero */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-paper text-balance">
            Your GitHub, as a <span className="text-gold">report card</span>.
          </h1>
          <p className="mt-2 text-sm text-paper/60">
            Stars, languages, streaks & grades — one username away. No login needed.
          </p>
        </div>

        {/* Search */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            analyze(username);
          }}
          className="mx-auto flex max-w-md gap-2"
        >
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-paper/40" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="github username"
              autoCapitalize="none"
              className="w-full rounded-full border border-paper/15 bg-ink-soft py-3 pl-11 pr-4 text-sm text-paper placeholder:text-paper/35 outline-none focus:border-gold transition"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-full bg-gold px-5 py-3 text-sm font-bold text-ink transition active:scale-95 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reflect"}
          </button>
        </form>

        {/* Suggestions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-paper/40">Try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setUsername(s);
                analyze(s);
              }}
              className="rounded-full border border-paper/15 px-3 py-1 text-xs text-paper/70 transition hover:border-gold hover:text-gold active:scale-95"
            >
              @{s}
            </button>
          ))}
        </div>

        {error && (
          <p className="mt-8 text-center text-sm text-seal bg-seal/10 border border-seal/30 rounded-xl px-4 py-3 max-w-md mx-auto">
            {error}
          </p>
        )}

        {/* Result */}
        <div className="mt-10">
          {loading ? (
            <div className="mx-auto max-w-md h-[560px] rounded-3xl bg-ink-soft animate-pulse flex items-center justify-center">
              <p className="text-sm text-paper/50">Reading the stars…</p>
            </div>
          ) : (
            report && <ReportCard data={report} />
          )}
        </div>

        <footer className="mt-14 text-center text-xs text-paper/40">
          Powered by GitHub's public API · No keys, no login · Made with  & gold
        </footer>
      </section>
    </main>
  );
}
