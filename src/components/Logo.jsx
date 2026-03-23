// Logo SVG para "FluxoZen" (nome escolhido por ser memorável, moderno e transmite tranquilidade e controle)
// Cores: gradiente azul-ciano-roxo, estilo minimalista

// Logo para "CashPilot": Ícone de avião minimalista com gradiente, remetendo a controle e direção financeira
export default function Logo() {
  return (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="logo-gradient" x1="0" y1="0" x2="44" y2="44" gradientUnits="userSpaceOnUse">
          <stop stopColor="#06b6d4" />
          <stop offset="0.5" stopColor="#6366f1" />
          <stop offset="1" stopColor="#a21caf" />
        </linearGradient>
      </defs>
      {/* Avião minimalista */}
      <polygon points="22,6 26,24 22,20 18,24" fill="url(#logo-gradient)" />
      <rect x="20" y="24" width="4" height="12" rx="2" fill="url(#logo-gradient)" />
      <rect x="19" y="36" width="6" height="2" rx="1" fill="url(#logo-gradient)" />
      {/* Círculo de controle */}
      <circle cx="22" cy="22" r="20" stroke="url(#logo-gradient)" strokeWidth="2.5" fill="none" />
    </svg>
  );
}
