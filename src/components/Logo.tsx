interface LogoProps {
  className?: string;
  size?: number;
}

export function Logo({ className = '', size = 28 }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-label="Planviry"
    >
      <rect width="32" height="32" rx="8" fill="url(#pv-grad)" />
      <path
        d="M10 22V10.5C10 10.224 10.224 10 10.5 10H15.5C17.433 10 19 11.567 19 13.5C19 15.433 17.433 17 15.5 17H13"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19 14L23 22"
        stroke="white"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="23" cy="22" r="1.5" fill="white" />
      <defs>
        <linearGradient id="pv-grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#0ea5e9" />
          <stop offset="1" stopColor="#0369a1" />
        </linearGradient>
      </defs>
    </svg>
  );
}
