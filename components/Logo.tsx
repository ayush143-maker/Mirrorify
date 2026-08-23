export default function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="GitDarpan logo">
      <defs>
        <linearGradient id="gd" x1="6" y1="8" x2="42" y2="40" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E8B84B" />
          <stop offset="1" stopColor="#D6A23A" />
        </linearGradient>
      </defs>
      <rect x="5" y="7" width="38" height="34" rx="8" fill="url(#gd)" />
      <circle cx="18" cy="17" r="3.2" fill="#080F1C" />
      <circle cx="18" cy="31" r="3.2" fill="#080F1C" />
      <circle cx="31" cy="17" r="3.2" fill="#080F1C" />
      <path d="M18 20.5v7M31 20.5c0 6-7 5-10 8" stroke="#080F1C" strokeWidth="2.6" strokeLinecap="round" />
    </svg>
  );
}
