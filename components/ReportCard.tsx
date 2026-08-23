"use client";

import { useRef, useState } from "react";
import { toPng } from "html-to-image";
import { motion } from "framer-motion";
import { Download, ExternalLink, Flame, GitFork, Loader2, MapPin, Star, Users } from "lucide-react";
import { ReportData } from "../lib/github";

const fmt = (n: number) => (n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n));

const gradeColor = (g: string) =>
  g === "S" || g === "A+" ? "#1F6F54" : g === "A" || g === "B+" ? "#5C6B47" : g === "B" ? "#9A6E22" : "#B3402F";

export default function ReportCard({ data }: { data: ReportData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [exporting, setExporting] = useState(false);

  const download = async () => {
    if (!cardRef.current || exporting) return;
    setExporting(true);
    try {
      const url = await toPng(cardRef.current, { pixelRatio: 2, cacheBust: true, backgroundColor: "#FBF7EE" });
      const a = document.createElement("a");
      a.href = url;
      a.download = `gitdarpan-${data.login}.png`;
      a.click();
    } finally {
      setExporting(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <motion.div
        ref={cardRef}
        initial={{ opacity: 0, y: 24, rotate: -1 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="rounded-3xl bg-paper text-ink shadow-card overflow-hidden"
      >
        {/* Card Header */}
        <div className="p-6 pb-4 border-b-2 border-dashed border-ink/15">
          <div className="flex items-center justify-between">
            <p className="text-[10px] uppercase tracking-[0.25em] text-gold-dark font-bold">GitDarpan · Report Card</p>
            <p className="text-[10px] text-ink/50">Est. {data.joinedYear}</p>
          </div>

          <div className="mt-4 flex items-center gap-4">
            <img
              src={data.avatar}
              alt={data.login}
              crossOrigin="anonymous"
              className="h-16 w-16 rounded-2xl border-2 border-gold object-cover"
            />
            <div className="min-w-0 flex-1">
              <h2 className="font-display text-2xl font-bold leading-tight truncate">{data.name}</h2>
              <p className="text-sm text-ink/60">@{data.login}</p>
              {data.location && (
                <p className="mt-0.5 flex items-center gap-1 text-xs text-ink/50">
                  <MapPin className="h-3 w-3" /> {data.location}
                </p>
              )}
            </div>
            {/* Overall Stamp */}
            <div
              className="flex h-16 w-16 shrink-0 rotate-12 items-center justify-center rounded-xl border-4 font-display text-3xl font-black"
              style={{ borderColor: gradeColor(data.overall), color: gradeColor(data.overall) }}
            >
              {data.overall}
            </div>
          </div>

          {data.bio && <p className="mt-3 text-sm text-ink/70 leading-relaxed line-clamp-2">{data.bio}</p>}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 divide-x divide-ink/10 border-b-2 border-dashed border-ink/15">
          {[
            { icon: Star, label: "Stars", value: data.totalStars },
            { icon: GitFork, label: "Forks", value: data.totalForks },
            { icon: Users, label: "Followers", value: data.followers },
            { icon: Flame, label: "Streak", value: `${data.streak}d` },
          ].map((s) => (
            <div key={s.label} className="flex flex-col items-center py-3">
              <s.icon className="h-4 w-4 text-gold-dark" />
              <p className="mt-1 text-sm font-bold">{fmt(typeof s.value === "number" ? s.value : parseInt(s.value))}</p>
              <p className="text-[9px] uppercase tracking-wider text-ink/50">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Marksheet Subjects */}
        <div className="p-6 pb-4">
          <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50 font-bold mb-3">Evaluation</p>
          <div className="space-y-2.5">
            {data.subjects.map((sub) => (
              <div key={sub.name} className="flex items-baseline gap-2 text-sm">
                <span className="font-medium">{sub.name}</span>
                <span className="flex-1 border-b-2 border-dotted border-ink/20" />
                <span
                  className="rounded-md px-2 py-0.5 text-xs font-black text-paper"
                  style={{ backgroundColor: gradeColor(sub.grade) }}
                >
                  {sub.grade}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Languages */}
        {data.languages.length > 0 && (
          <div className="px-6 pb-4">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50 font-bold mb-3">Top Languages</p>
            <div className="space-y-2">
              {data.languages.map((lang) => (
                <div key={lang.name}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium">{lang.name}</span>
                    <span className="text-ink/50">{lang.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-ink/10 overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${lang.pct}%`, backgroundColor: lang.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Top Repos */}
        {data.topRepos.length > 0 && (
          <div className="px-6 pb-6">
            <p className="text-[10px] uppercase tracking-[0.25em] text-ink/50 font-bold mb-3">Starred Repos</p>
            <div className="space-y-2">
              {data.topRepos.map((repo) => (
                <div key={repo.name} className="flex items-center justify-between rounded-xl bg-paper-dark px-3 py-2">
                  <span className="truncate text-sm font-medium pr-2">{repo.name}</span>
                  <span className="flex items-center gap-1 text-xs font-bold text-gold-dark shrink-0">
                    <Star className="h-3 w-3 fill-current" /> {fmt(repo.stars)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </motion.div>

      {/* Actions (outside export area) */}
      <div className="mt-4 flex gap-3 justify-center">
        <button
          onClick={download}
          disabled={exporting}
          className="flex items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink transition active:scale-95 disabled:opacity-60"
        >
          {exporting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
          Download Card
        </button>
        <a
          href={data.profileUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 rounded-full border border-paper/25 px-5 py-2.5 text-sm font-medium text-paper transition active:scale-95"
        >
          <ExternalLink className="h-4 w-4" /> Profile
        </a>
      </div>
    </div>
  );
}
