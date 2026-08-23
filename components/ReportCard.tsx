"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { Download, ExternalLink, Flame, GitFork, Loader2, MapPin, Star, Users } from "lucide-react";
import { ReportData } from "../lib/github";

const fmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n));

// Academic ink grading: strong grades in forest green, mid outlined, low in grey
const gradeChip = (g: string) =>
  g === "S" || g === "A+" || g === "A"
    ? "bg-forest text-cream"
    : g === "B+"
    ? "border-2 border-forest text-forest"
    : "border-2 border-smoke/50 text-smoke";

export default function ReportCard({ data }: { data: ReportData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const download = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: "#F8F4EA" });
      const a = document.createElement("a");
      a.href = url;
      a.download = `gitdarpan-${data.login}.png`;
      a.click();
    } finally {
      setExporting(false);
    }
  };

  const stats = [
    { icon: Star, label: "Stars", value: fmt(data.totalStars) },
    { icon: GitFork, label: "Forks", value: fmt(data.totalForks) },
    { icon: Users, label: "Followers", value: fmt(data.followers) },
    { icon: Flame, label: "Streak", value: `${data.streak}d` },
  ];

  return (
    <div className="mx-auto w-full max-w-md">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="overflow-hidden rounded-3xl bg-cream text-graphite shadow-card"
      >
        {/* Vintage certificate top rule */}
        <div className="h-1.5 bg-gold" />

        {/* Card Header */}
        <div className="border-b border-dashed border-graphite/20 p-6 pb-5">
          <div className="flex items-center justify-between">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold">
              GitDarpan · Report Card
            </p>
            <p className="text-[10px] text-smoke">Est. {data.joinedYear}</p>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <img
              src={data.avatar}
              alt={data.login}
              crossOrigin="anonymous"
              className="h-16 w-16 rounded-2xl border-2 border-gold/70 object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="truncate font-display text-2xl font-bold leading-tight text-graphite">
                {data.name}
              </h2>
              <p className="text-sm text-smoke">@{data.login}</p>
              {data.location && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-smoke">
                  <MapPin className="h-3 w-3" /> {data.location}
                </p>
              )}
            </div>
            {/* Authentic double-ring academic stamp */}
            <div className="flex h-16 w-16 shrink-0 rotate-6 items-center justify-center rounded-lg border-4 border-double border-forest/80 font-display text-2xl font-black text-forest/90">
              {data.overall}
            </div>
          </div>

          {data.bio && (
            <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-smoke">{data.bio}</p>
          )}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 divide-x divide-graphite/10 border-b border-dashed border-graphite/20">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center py-3.5">
              <s.icon className="h-4 w-4 text-smoke" />
              <p className="mt-1 text-lg font-extrabold tracking-tight text-graphite">{s.value}</p>
              <p className="text-[9px] uppercase tracking-[0.18em] text-smoke">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Evaluation */}
        <div className="p-6 pb-4">
          <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Evaluation</p>
          <div className="space-y-2.5">
            {data.subjects.map((sub) => (
              <div key={sub.name} className="flex items-baseline gap-2 text-sm">
                <span className="font-medium text-graphite">{sub.name}</span>
                <span className="flex-1 border-b-2 border-dotted border-graphite/20" />
                <span className={`rounded-md px-2 py-0.5 text-[11px] font-black ${gradeChip(sub.grade)}`}>
                  {sub.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="px-6 pb-4">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Top Languages</p>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="mb-1 flex justify-between text-xs">
                    <span className="font-medium text-graphite">{lang.name}</span>
                    <span className="text-smoke">{lang.pct}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-graphite/10">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${lang.pct}%`, backgroundColor: lang.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Starred Repos */}
        {data.topRepos.length > 0 && (
          <div className="px-6 pb-6">
            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.25em] text-gold">Starred Repos</p>
            <div className="space-y-2">
              {data.topRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="flex items-center justify-between rounded-xl bg-cream-dark px-3 py-2"
                >
                  <span className="truncate pr-2 text-sm font-medium text-graphite">{repo.name}</span>
                  <span className="flex shrink-0 items-center gap-1 text-xs font-bold text-graphite">
                    <Star className="h-3 w-3 text-gold" /> {fmt(repo.stars)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Actions (outside export area) */}
      <div className="mt-4 flex justify-center gap-3">
        <button
          onClick={download}
          disabled={exporting}
          className="flex items-center gap-2 rounded-2xl bg-gold px-5 py-2.5 text-sm font-bold text-graphite transition hover:bg-gold-bright active:scale-95 disabled:opacity-60"
        >
          {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Download Card
        </button>
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-2xl border border-navy-line px-5 py-2.5 text-sm font-medium text-cream transition active:scale-95"
        >
          <ExternalLink className="h-4 w-4" /> Profile
        </a>
      </div>
    </div>
  );
}
