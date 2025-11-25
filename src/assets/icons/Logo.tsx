export default function Logo() {
  return (
    <svg
      width="180"
      height="70"
      viewBox="0 0 220 80"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Brighter gradient for pin */}
        <linearGradient id="rideGradient" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6A5CFF" />
          <stop offset="50%" stopColor="#7C7DFF" />
          <stop offset="100%" stopColor="#4EFF8B" />
        </linearGradient>

        {/* Strong glow */}
        <radialGradient id="pinGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#4EFF8B" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#4EFF8B" stopOpacity="0" />
        </radialGradient>

        {/* Strong shadow for visibility */}
        <filter id="softShadow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="6" stdDeviation="8" floodOpacity="0.45" />
        </filter>
      </defs>

      {/* Glow under pin */}
      <ellipse cx="40" cy="64" rx="25" ry="9" fill="url(#pinGlow)" />

      {/* Map pin */}
      <g filter="url(#softShadow)">
        <path
          d="
            M40 10
            C30 10 22 18 22 28.5
            C22 39 32 49 36 54
            C38 56.5 39 58 40 60
            C41 58 42 56.5 44 54
            C48 49 58 39 58 28.5
            C58 18 50 10 40 10
            Z
          "
          fill="url(#rideGradient)"
        />
      </g>

      {/* Center circle */}
      <circle cx="40" cy="28.5" r="7.5" fill="white" />

      {/* Road inside pin */}
      <path
        d="M32 45 C35 42.5 37.3 41.8 40 41.8 C42.7 41.8 45 42.5 48 45"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Lane divider */}
      <path
        d="M40 25 L40 31"
        stroke="#ffffff"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Text: Ride */}
      <text
        x="90"
        y="45"
        fontFamily="system-ui, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="#ffffff"
      >
        Ride
      </text>

      {/* X in neon green */}
      <text
        x="160"
        y="45"
        fontFamily="system-ui, sans-serif"
        fontSize="32"
        fontWeight="700"
        fill="#4EFF8B"
      >
        X
      </text>
    </svg>
  );
}
