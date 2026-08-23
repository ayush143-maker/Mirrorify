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
      setReport(await buildReport(clean));
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
    <main className="min-h-screen bg-navy">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-navy-line/60 bg-navy/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <div className="leading-tight">
              <p className="font-display text-xl font-bold text-cream">GitDarpan</p>
              <p className="text-[9px] uppercase tracking-[0.22em] text-smoke">GitHub, reflected</p>
            </div>
          </div>
          <Sparkles className="h-5 w-5 text-gold" />
        </div>
      </header>

      <section className="mx-auto max-w-3xl px-4 pb-16 pt-12">
        {/* Hero */}
        <div className="mb-9 text-center">
          <h1 className="text-balance font-display text-[2.1rem] font-semibold leading-[1.08] tracking-tight text-cream sm:text-5xl sm:leading-[1.05]">
            Your GitHub, as
            <br className="sm:hidden" /> a <span className="text-gold">report card.</span>
          </h1>
          <p className="mt-3 text-sm text-smoke">
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
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-smoke/70" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="github username"
              autoCapitalize="none"
              className="w-full rounded-2xl border border-navy-line bg-navy-soft py-3 pl-11 pr-4 text-sm text-cream outline-none transition placeholder:text-smoke/60 focus:border-gold/70"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="rounded-2xl bg-gold px-5 py-3 text-sm font-bold text-graphite transition hover:bg-gold-bright active:scale-95 disabled:opacity-60"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Reflect"}
          </button>
        </form>

        {/* Suggestions */}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-smoke/80">Try:</span>
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              onClick={() => {
                setUsername(s);
                analyze(s);
              }}
              className="rounded-full border border-navy-line px-3 py-1 text-xs text-smoke transition hover:border-gold/60 hover:text-gold active:scale-95"
            >
              @{s}
            </button>
          ))}
        </div>

        {error && (
          <p className="mx-auto mt-8 max-w-md rounded-xl border border-seal/40 bg-seal/10 px-4 py-3 text-center text-sm text-seal">
            {error}
          </p>
        )}

        {/* Result */}
        <div className="mt-10">
          {loading ? (
            <div className="mx-auto flex h-[560px] max-w-md animate-pulse items-center justify-center rounded-3xl bg-navy-soft">
              <p className="text-sm text-smoke">Reading the stars…</p>
            </div>
          ) : (
            report && <ReportCard data={report} />
          )}
        </div>

        <footer className="mt-14 text-center text-xs text-smoke/70">
          Powered by GitHub's public API · No keys, no login · Made with cream & gold
        </footer>
      </section>
    </main>
  );
}
