// ══════════════════════════════════════════════
// icons.js — SVG Icon Components
// All icons are clean React components, no emojis.
// ══════════════════════════════════════════════

/* ── UI Icons (small, used in buttons/nav) ── */

function ILogo({ n }) {
  const sz = n || 30;
  return (
    <svg width={sz} height={sz} viewBox="0 0 32 32" fill="none">
      <defs>
        <linearGradient
          id="grd"
          x1="0"
          y1="0"
          x2="32"
          y2="32"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#7c6ff7" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="8" fill="url(#grd)" />
      {/* Left column — pixel dots */}
      <rect
        x="5"
        y="10"
        width="5"
        height="5"
        rx="1"
        fill="white"
        fillOpacity="0.5"
      />
      <rect
        x="5"
        y="17"
        width="5"
        height="5"
        rx="1"
        fill="white"
        fillOpacity="0.8"
      />
      {/* Center column — main pixel stack */}
      <rect
        x="12"
        y="6"
        width="5"
        height="5"
        rx="1"
        fill="white"
        fillOpacity="0.55"
      />
      <rect
        x="12"
        y="13"
        width="5"
        height="5"
        rx="1"
        fill="white"
        fillOpacity="1"
      />
      <rect
        x="12"
        y="20"
        width="5"
        height="5"
        rx="1"
        fill="white"
        fillOpacity="0.4"
      />
      {/* Right column */}
      <rect
        x="19"
        y="10"
        width="5"
        height="5"
        rx="1"
        fill="white"
        fillOpacity="0.95"
      />
      <rect
        x="19"
        y="17"
        width="5"
        height="5"
        rx="1"
        fill="white"
        fillOpacity="0.6"
      />
    </svg>
  );
}

function ICart({ n, c }) {
  return (
    <svg
      width={n || 17}
      height={n || 17}
      viewBox="0 0 20 20"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M1 1.5h2.5L6 13h9l2.5-8.5H5" />
      <circle cx="8" cy="17" r="1.3" fill={c || "currentColor"} stroke="none" />
      <circle
        cx="14"
        cy="17"
        r="1.3"
        fill={c || "currentColor"}
        stroke="none"
      />
    </svg>
  );
}

function ISearch({ n }) {
  return (
    <svg
      width={n || 15}
      height={n || 15}
      viewBox="0 0 20 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    >
      <circle cx="9" cy="9" r="6" />
      <path d="M13.5 13.5L18 18" />
    </svg>
  );
}

function IClose({ n }) {
  return (
    <svg
      width={n || 14}
      height={n || 14}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.9"
      strokeLinecap="round"
    >
      <path d="M2 2L12 12M12 2L2 12" />
    </svg>
  );
}

function IPlus({ n }) {
  return (
    <svg
      width={n || 13}
      height={n || 13}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M7 2V12M2 7H12" />
    </svg>
  );
}

function IMinus({ n }) {
  return (
    <svg
      width={n || 13}
      height={n || 13}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    >
      <path d="M2 7H12" />
    </svg>
  );
}

function ITrash({ n }) {
  return (
    <svg
      width={n || 15}
      height={n || 15}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 4h12M5 4V2.5h6V4M6.5 7v5M9.5 7v5M3 4l1 9.5h8L13 4" />
    </svg>
  );
}

function ICheck({ n, c }) {
  return (
    <svg
      width={n || 14}
      height={n || 14}
      viewBox="0 0 14 14"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 7L5.5 11L12 4" />
    </svg>
  );
}

function ILock({ n }) {
  return (
    <svg
      width={n || 13}
      height={n || 13}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="6" width="10" height="7" rx="1.5" />
      <path d="M4.5 6V4.5a2.5 2.5 0 015 0V6" />
      <circle cx="7" cy="9.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function IArrow({ n }) {
  return (
    <svg
      width={n || 14}
      height={n || 14}
      viewBox="0 0 14 14"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M2 7H12M8 3.5L12 7L8 10.5" />
    </svg>
  );
}

function IGrid({ n }) {
  return (
    <svg
      width={n || 14}
      height={n || 14}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    >
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  );
}

function IBag({ n }) {
  return (
    <svg
      width={n || 14}
      height={n || 14}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="1" y="5" width="14" height="10" rx="1.5" />
      <path d="M5 5V3.5A1.5 1.5 0 016.5 2h3A1.5 1.5 0 0111 3.5V5" />
    </svg>
  );
}

function IBox({ n }) {
  return (
    <svg
      width={n || 14}
      height={n || 14}
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M8 1L1 4.5L8 8L15 4.5Z" />
      <path d="M1 4.5V11.5L8 15V8" />
      <path d="M15 4.5V11.5L8 15" />
    </svg>
  );
}

function ISpark({ n }) {
  return (
    <svg
      width={n || 13}
      height={n || 13}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path d="M10 2c0 0 1 5.5 6 6.5-5 1-6 6.5-6 6.5s-1-5.5-6-6.5c5-1 6-6.5 6-6.5z" />
    </svg>
  );
}

/* ── Product Icons (large, used inside product/bundle cards) ── */

function PLightning({ n, c }) {
  return (
    <svg
      width={n || 22}
      height={n || 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z"
        fill={c || "currentColor"}
        fillOpacity="0.2"
        stroke={c || "currentColor"}
      />
      <path d="M13 2L4.5 13.5H11" strokeWidth="1.8" />
      <path d="M13 10.5H19.5L10 22" strokeWidth="1.8" />
    </svg>
  );
}

function PBag({ n, c }) {
  return (
    <svg
      width={n || 22}
      height={n || 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2" />
    </svg>
  );
}

function PChart({ n, c }) {
  return (
    <svg
      width={n || 22}
      height={n || 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
    >
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
      <line x1="2" y1="20" x2="22" y2="20" />
    </svg>
  );
}

function PMobile({ n, c }) {
  return (
    <svg
      width={n || 22}
      height={n || 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <circle cx="12" cy="18" r="0.5" fill={c || "currentColor"} />
    </svg>
  );
}

function PGrid({ n, c }) {
  return (
    <svg
      width={n || 22}
      height={n || 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function PRocket({ n, c }) {
  return (
    <svg
      width={n || 22}
      height={n || 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

function PStar({ n, c }) {
  return (
    <svg
      width={n || 22}
      height={n || 22}
      viewBox="0 0 24 24"
      fill="none"
      stroke={c || "currentColor"}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path
        d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z"
        fill={c || "currentColor"}
        fillOpacity="0.18"
      />
      <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l7.1-1.01L12 2z" />
    </svg>
  );
}

// Map icon string keys → components (used by ProductCard and BundleCard)
const PICONS = {
  lightning: PLightning,
  briefcase: PBag,
  chart: PChart,
  mobile: PMobile,
  grid: PGrid,
  rocket: PRocket,
  star: PStar,
};
