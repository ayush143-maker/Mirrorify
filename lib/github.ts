export interface Repo {
  id: number;
  name: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  description: string | null;
}

export interface Profile {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  location: string | null;
  followers: number;
  following: number;
  public_repos: number;
  created_at: string;
  html_url: string;
}

export interface LangStat {
  name: string;
  color: string;
  pct: number;
  repos: number;
  stars: number;
}

export interface Subject {
  name: string;
  grade: string;
  score: number;
}

export interface TopRepo {
  name: string;
  stars: number;
  forks: number;
  language: string | null;
}

export interface ReportData {
  login: string;
  name: string;
  avatar: string;
  bio: string | null;
  location: string | null;
  profileUrl: string;
  joinedYear: number;
  years: number;
  followers: number;
  following: number;
  publicRepos: number;
  totalStars: number;
  totalForks: number;
  streak: number;
  languages: LangStat[];
  topRepos: TopRepo[];
  subjects: Subject[];
  overall: string;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5", Java: "#b07219",
  "C++": "#f34b7d", C: "#555555", "C#": "#178600", Go: "#00ADD8", Rust: "#dea584",
  Ruby: "#701516", PHP: "#4F5D95", HTML: "#e34c26", CSS: "#663399", Shell: "#89e051",
  Dart: "#00B4AB", Kotlin: "#A97BFF", Swift: "#F05138", Vue: "#41b883", Svelte: "#ff3e00",
  SCSS: "#c6538c", Jupyter: "#DA5B0B", "Objective-C": "#438eff", Elixir: "#6e4a7e",
  Haskell: "#5e5086", Lua: "#000080", R: "#198CE7", Zig: "#ec8c37", MDX: "#fcb32c",
};

const LETTERS = ["C", "B", "B+", "A", "A+", "S"];
const letter = (score: number) => LETTERS[Math.max(0, Math.min(5, score))];

function grade(name: string, value: number, thresholds: number[]): Subject {
  let score = 0;
  thresholds.forEach((t, i) => {
    if (value >= t) score = i + 1;
  });
  return { name, grade: letter(score), score };
}

async function getJSON(url: string) {
  const res = await fetch(url);
  if (res.status === 404) throw new Error("NOT_FOUND");
  if (res.status === 403 || res.status === 429) throw new Error("RATE_LIMIT");
  if (!res.ok) throw new Error("API_ERROR");
  return res.json();
}

export async function buildReport(username: string): Promise<ReportData> {
  const profile: Profile = await getJSON(`https://api.github.com/users/${username}`);

  // All repos (max 300)
  const repos: Repo[] = [];
  for (let page = 1; page <= 3; page++) {
    const batch: Repo[] = await getJSON(
      `https://api.github.com/users/${username}/repos?per_page=100&page=${page}&sort=updated`
    );
    repos.push(...batch);
    if (batch.length < 100) break;
  }

  // Recent public events -> activity streak
  const events: { created_at: string }[] = await getJSON(
    `https://api.github.com/users/${username}/events/public?per_page=100`
  );
  const days = new Set(events.map((e) => e.created_at.slice(0, 10)));
  const dayKey = (d: Date) => d.toISOString().slice(0, 10);
  const cursor = new Date();
  if (!days.has(dayKey(cursor))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (days.has(dayKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  const totalStars = repos.reduce((s, r) => s + r.stargazers_count, 0);
  const totalForks = repos.reduce((s, r) => s + r.forks_count, 0);

  // Languages weighted by stars
  const langMap = new Map<string, { repos: number; stars: number }>();
  repos.forEach((r) => {
    if (!r.language) return;
    const cur = langMap.get(r.language) ?? { repos: 0, stars: 0 };
    cur.repos++;
    cur.stars += r.stargazers_count + 1;
    langMap.set(r.language, cur);
  });
  const totalWeight = [...langMap.values()].reduce((s, v) => s + v.stars, 0) || 1;
  const languages: LangStat[] = [...langMap.entries()]
    .map(([name, v]) => ({
      name,
      color: LANG_COLORS[name] ?? "#8b949e",
      repos: v.repos,
      stars: v.stars,
      pct: Math.max(4, Math.round((v.stars / totalWeight) * 100)),
    }))
    .sort((a, b) => b.stars - a.stars)
    .slice(0, 5);

  const topRepos: TopRepo[] = [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 4)
    .map((r) => ({ name: r.name, stars: r.stargazers_count, forks: r.forks_count, language: r.language }));

  const years = (Date.now() - new Date(profile.created_at).getTime()) / 31557600000;

  const subjects: Subject[] = [
    grade("Experience", years, [0.5, 1, 2, 4, 6]),
    grade("Community", profile.followers, [5, 25, 100, 400, 1500]),
    grade("Popularity", totalStars, [5, 30, 150, 750, 3000]),
    grade("Consistency", streak, [1, 3, 7, 14, 30]),
    grade("Versatility", languages.length, [1, 2, 3, 4, 6]),
  ];
  const avg = subjects.reduce((s, x) => s + x.score, 0) / subjects.length;

  return {
    login: profile.login,
    name: profile.name ?? profile.login,
    avatar: profile.avatar_url,
    bio: profile.bio,
    location: profile.location,
    profileUrl: profile.html_url,
    joinedYear: new Date(profile.created_at).getFullYear(),
    years,
    followers: profile.followers,
    following: profile.following,
    publicRepos: profile.public_repos,
    totalStars,
    totalForks,
    streak,
    languages,
    topRepos,
    subjects,
    overall: letter(Math.round(avg)),
  };
}
