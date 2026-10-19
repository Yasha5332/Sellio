import React from 'react';

export type LogoVariant = 'kinetic-s' | 'social-spark' | 'infinity-loop';



/**
 * Concept 1: The Kinetic S-Arrow
 * Fuses the 'S' monogram, shopping bag handle, and an upward surge arrow.
 */
export function KineticSMark({ size = 36 }: { size?: number }) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', flexShrink: 0 }}
      role="img"
      aria-label="Sellio Kinetic S Mark"
    >
      <defs>
        <linearGradient id={`ks-body-${id}`} x1="8" y1="8" x2="40" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4B3BFF" />
          <stop offset="60%" stopColor="#6C5CE7" />
          <stop offset="100%" stopColor="#12161C" />
        </linearGradient>
        <linearGradient id={`ks-arrow-${id}`} x1="22" y1="28" x2="42" y2="10" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4B3BFF" />
          <stop offset="50%" stopColor="#00E5FF" />
          <stop offset="100%" stopColor="#D4F56A" />
        </linearGradient>
        <linearGradient id={`ks-handle-${id}`} x1="16" y1="4" x2="32" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D4F56A" />
          <stop offset="100%" stopColor="#4B3BFF" />
        </linearGradient>
      </defs>

      <g transform="translate(0, -1.5)">
        {/* Bag Handle (Top Arch) */}
        <path
          d="M17 14V11C17 7.13401 20.134 4 24 4C27.866 4 31 7.13401 31 11V14"
          stroke={`url(#ks-handle-${id})`}
          strokeWidth="3.5"
          strokeLinecap="round"
        />

        {/* Dynamic S Spine & Bag Base */}
        <path
          d="M34 16H14C11.7909 16 10 17.7909 10 20V22C10 24.2091 11.7909 26 14 26H31C34.3137 26 37 28.6863 37 32V34C37 37.3137 34.3137 40 31 40H12"
          stroke={`url(#ks-body-${id})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Kinetic Surge Arrow launching out of the S */}
        <path
          d="M20 32L38 14M38 14H28M38 14V24"
          stroke={`url(#ks-arrow-${id})`}
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}

/**
 * Concept 2: The Social Commerce Spark
 * Combines chat speech bubble with shopping bag and radiant spark star.
 */
export function SocialSparkMark({ size = 36 }: { size?: number }) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', flexShrink: 0 }}
      role="img"
      aria-label="Sellio Social Spark Mark"
    >
      <defs>
        <linearGradient id={`ss-bubble-${id}`} x1="8" y1="10" x2="42" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4B3BFF" />
          <stop offset="50%" stopColor="#7033FF" />
          <stop offset="100%" stopColor="#12161C" />
        </linearGradient>
        <linearGradient id={`ss-spark-${id}`} x1="28" y1="12" x2="44" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FF6B4A" />
          <stop offset="100%" stopColor="#D4F56A" />
        </linearGradient>
      </defs>

      {/* Tote Bag Handle */}
      <path
        d="M18 14V10C18 6.68629 20.6863 4 24 4C27.3137 4 30 6.68629 30 10V14"
        stroke="#4B3BFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Chat Bubble / Tote Body */}
      <path
        d="M12 14H36C38.7614 14 41 16.2386 41 19V32C41 34.7614 38.7614 37 36 37H20L12 43V37C9.23858 37 7 34.7614 7 32V19C7 16.2386 9.23858 14 12 14Z"
        stroke={`url(#ss-bubble-${id})`}
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Radiant 4-Point Star Spark */}
      <path
        d="M34 16C34 20 37 22 37 22C37 22 34 24 34 28C34 24 31 22 31 22C31 22 34 20 34 16Z"
        fill={`url(#ss-spark-${id})`}
      />
    </svg>
  );
}

/**
 * Concept 3: The Infinity Commerce Loop
 * A continuous loop shaping both an S and shopping silhouette.
 */
export function InfinityLoopMark({ size = 36 }: { size?: number }) {
  const id = React.useId();
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'inline-block', flexShrink: 0 }}
      role="img"
      aria-label="Sellio Infinity Loop Mark"
    >
      <defs>
        <linearGradient id={`inf-grad-${id}`} x1="8" y1="8" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4B3BFF" />
          <stop offset="50%" stopColor="#8A2BE2" />
          <stop offset="100%" stopColor="#00C9A7" />
        </linearGradient>
      </defs>
      {/* Tote handle */}
      <path
        d="M19 13V9C19 6.23858 21.2386 4 24 4C26.7614 4 29 6.23858 29 9V13"
        stroke="#4B3BFF"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      {/* Infinity Bag Body */}
      <path
        d="M16 22C12.6863 22 10 24.6863 10 28C10 31.3137 12.6863 34 16 34C21 34 27 22 32 22C35.3137 22 38 24.6863 38 28C38 31.3137 35.3137 34 32 34C27 34 21 22 16 22Z"
        stroke={`url(#inf-grad-${id})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="8" y="13" width="32" height="27" rx="8" stroke="#12161C" strokeWidth="2.5" strokeDasharray="3 3" opacity="0.25" />
    </svg>
  );
}

/**
 * Main Sellio Logo Component
 */
interface SellioLogoProps {
  variant?: LogoVariant;
  size?: number;
  showWordmark?: boolean;
  wordmarkColor?: string;
  subtitle?: string;
  subtitleColor?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Main Sellio Logo Component
 */
export default function SellioLogo({
  variant = 'kinetic-s',
  size = 36,
  showWordmark = true,
  wordmarkColor = '#12161C',
  subtitle,
  subtitleColor,
  className = '',
  style = {},
}: SellioLogoProps) {
  const MarkComponent =
    variant === 'social-spark'
      ? SocialSparkMark
      : variant === 'infinity-loop'
      ? InfinityLoopMark
      : KineticSMark;

  const dotSize = Math.max(5, Math.round(size * 0.16));
  const dotOffset = Math.max(1, Math.round(size * 0.04));

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: Math.max(10, Math.round(size * 0.28)),
        textDecoration: 'none',
        ...style,
      }}
    >
      <MarkComponent size={size} />
      {showWordmark && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <span
            style={{
              fontFamily: "'Bricolage Grotesque', 'Inter', system-ui, sans-serif",
              fontWeight: 800,
              fontSize: Math.round(size * 0.62),
              letterSpacing: '-0.035em',
              color: wordmarkColor,
              lineHeight: 1,
              display: 'inline-flex',
              alignItems: 'center',
            }}
          >
            Sellio
            <span
              style={{
                width: dotSize,
                height: dotSize,
                borderRadius: '50%',
                background: '#D4F56A',
                border: '1.5px solid #4B3BFF',
                boxSizing: 'border-box',
                display: 'inline-block',
                marginLeft: Math.max(3, Math.round(size * 0.1)),
                flexShrink: 0,
                transform: `translateY(${dotOffset}px)`,
              }}
              aria-hidden="true"
            />
          </span>
          {subtitle && (
            <span
              style={{
                fontFamily: "'Bricolage Grotesque', 'Inter', system-ui, sans-serif",
                fontWeight: 700,
                fontSize: Math.max(12, Math.round(size * 0.44)),
                letterSpacing: '-0.02em',
                color: subtitleColor || (wordmarkColor === '#12161C' ? '#4A525D' : '#A0AAB8'),
                lineHeight: 1,
              }}
            >
              {subtitle}
            </span>
          )}
        </span>
      )}
    </div>
  );
}
