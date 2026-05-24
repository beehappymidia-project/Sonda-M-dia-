interface RadarSvgProps {
  size?: number
  color?: string
}

export default function RadarSvg({ size = 32, color = '#FFB703' }: RadarSvgProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Outer circle */}
      <circle cx="16" cy="16" r="14" stroke={color} strokeWidth="1.5" opacity="0.3" />
      {/* Mid circle */}
      <circle cx="16" cy="16" r="9" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Inner circle */}
      <circle cx="16" cy="16" r="4" stroke={color} strokeWidth="1.5" opacity="0.8" />
      {/* Center dot */}
      <circle cx="16" cy="16" r="1.5" fill={color} />
      {/* Crosshair lines */}
      <line x1="16" y1="2" x2="16" y2="6" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="16" y1="26" x2="16" y2="30" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="2" y1="16" x2="6" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      <line x1="26" y1="16" x2="30" y2="16" stroke={color} strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
      {/* Sweep indicator */}
      <path
        d="M16 16 L25.9 10.5"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.9"
      />
    </svg>
  )
}
