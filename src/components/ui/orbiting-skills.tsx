"use client"
import React, { useEffect, useState, memo } from 'react';
import { FileCode2, Coffee, Terminal, Code, Database, Leaf, GitBranch } from 'lucide-react';

// --- Type Definitions ---
type IconType = 'cpp' | 'java' | 'python' | 'javascript' | 'sql' | 'mongodb' | 'git';

type GlowColor = 'cyan' | 'purple';

interface SkillIconProps {
  type: IconType;
}

interface SkillConfig {
  id: string;
  orbitRadius: number;
  size: number;
  speed: number;
  iconType: IconType;
  phaseShift: number;
  glowColor: GlowColor;
  label: string;
}

interface OrbitingSkillProps {
  config: SkillConfig;
  angle: number;
}

interface GlowingOrbitPathProps {
  radius: number;
  glowColor?: GlowColor;
  animationDelay?: number;
}

// --- Lucide Icon Components ---
const iconComponents: Record<IconType, { component: () => React.JSX.Element; color: string }> = {
  cpp: {
    component: () => <FileCode2 className="w-full h-full text-[#00599C]" strokeWidth={1.5} />,
    color: '#00599C'
  },
  java: {
    component: () => <Coffee className="w-full h-full text-[#5382a1]" strokeWidth={1.5} />,
    color: '#5382a1'
  },
  python: {
    component: () => <Terminal className="w-full h-full text-[#3776AB]" strokeWidth={1.5} />,
    color: '#3776AB'
  },
  javascript: {
    component: () => <Code className="w-full h-full text-[#F7DF1E]" strokeWidth={1.5} />,
    color: '#F7DF1E'
  },
  sql: {
    component: () => <Database className="w-full h-full text-[#4479A1]" strokeWidth={1.5} />,
    color: '#4479A1'
  },
  mongodb: {
    component: () => <Leaf className="w-full h-full text-[#47A248]" strokeWidth={1.5} />,
    color: '#47A248'
  },
  git: {
    component: () => <GitBranch className="w-full h-full text-[#F05032]" strokeWidth={1.5} />,
    color: '#F05032'
  }
};

// --- Memoized Icon Component ---
const SkillIcon = memo(({ type }: SkillIconProps) => {
  const IconComponent = iconComponents[type]?.component;
  return IconComponent ? <IconComponent /> : null;
});
SkillIcon.displayName = 'SkillIcon';

// --- Configuration for the Orbiting Skills ---
const skillsConfig: SkillConfig[] = [
  // Inner Orbit (Core Languages)
  { 
    id: 'cpp',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'cpp', 
    phaseShift: 0, 
    glowColor: 'cyan',
    label: 'C++'
  },
  { 
    id: 'java',
    orbitRadius: 100, 
    size: 45, 
    speed: 1, 
    iconType: 'java', 
    phaseShift: (Math.PI) / 2, 
    glowColor: 'cyan',
    label: 'Java'
  },
  { 
    id: 'python',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'python', 
    phaseShift: Math.PI, 
    glowColor: 'cyan',
    label: 'Python'
  },
  { 
    id: 'javascript',
    orbitRadius: 100, 
    size: 40, 
    speed: 1, 
    iconType: 'javascript', 
    phaseShift: (3 * Math.PI) / 2, 
    glowColor: 'cyan',
    label: 'JavaScript'
  },
  // Outer Orbit (Tools / Databases)
  { 
    id: 'sql',
    orbitRadius: 180, 
    size: 45, 
    speed: -0.6, 
    iconType: 'sql', 
    phaseShift: 0, 
    glowColor: 'purple',
    label: 'SQL'
  },
  { 
    id: 'mongodb',
    orbitRadius: 180, 
    size: 45, 
    speed: -0.6, 
    iconType: 'mongodb', 
    phaseShift: (2 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'MongoDB'
  },
  { 
    id: 'git',
    orbitRadius: 180, 
    size: 40, 
    speed: -0.6, 
    iconType: 'git', 
    phaseShift: (4 * Math.PI) / 3, 
    glowColor: 'purple',
    label: 'Git & GitHub'
  },
];

// --- Memoized Orbiting Skill Component ---
const OrbitingSkill = memo(({ config, angle }: OrbitingSkillProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const { orbitRadius, size, iconType, label } = config;

  const x = Math.cos(angle) * orbitRadius;
  const y = Math.sin(angle) * orbitRadius;

  return (
    <div
      className="absolute top-1/2 left-1/2 transition-all duration-300 ease-out"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        transform: `translate(calc(${x}px - 50%), calc(${y}px - 50%))`,
        zIndex: isHovered ? 20 : 10,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={`
          relative w-full h-full p-2 bg-zinc-900/90 backdrop-blur-sm
          rounded-full flex items-center justify-center border border-white/5
          transition-all duration-300 cursor-pointer
          ${isHovered ? 'scale-125 shadow-2xl' : 'shadow-lg hover:shadow-xl'}
        `}
        style={{
          boxShadow: isHovered
            ? `0 0 30px ${iconComponents[iconType]?.color}40, 0 0 60px ${iconComponents[iconType]?.color}20`
            : undefined
        }}
      >
        <SkillIcon type={iconType} />
        {isHovered && (
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-zinc-900/95 backdrop-blur-sm rounded border border-white/10 text-xs text-white whitespace-nowrap pointer-events-none">
            {label}
          </div>
        )}
      </div>
    </div>
  );
});
OrbitingSkill.displayName = 'OrbitingSkill';

// --- Optimized Orbit Path Component ---
const GlowingOrbitPath = memo(({ radius, glowColor = 'cyan', animationDelay = 0 }: GlowingOrbitPathProps) => {
  const glowColors = {
    cyan: {
      primary: 'rgba(115, 177, 255, 0.4)', // Using the theme's primary color
      secondary: 'rgba(115, 177, 255, 0.2)',
      border: 'rgba(115, 177, 255, 0.3)'
    },
    purple: {
      primary: 'rgba(176, 136, 254, 0.4)', // Using the theme's secondary color
      secondary: 'rgba(176, 136, 254, 0.2)',
      border: 'rgba(176, 136, 254, 0.3)'
    }
  };

  const colors = glowColors[glowColor] || glowColors.cyan;

  return (
    <div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none"
      style={{
        width: `${radius * 2}px`,
        height: `${radius * 2}px`,
        animationDelay: `${animationDelay}s`,
      }}
    >
      {/* Glowing background */}
      <div
        className="absolute inset-0 rounded-full animate-pulse"
        style={{
          background: `radial-gradient(circle, transparent 30%, ${colors.secondary} 70%, ${colors.primary} 100%)`,
          boxShadow: `0 0 60px ${colors.primary}, inset 0 0 60px ${colors.secondary}`,
          animation: 'pulse 4s ease-in-out infinite',
          animationDelay: `${animationDelay}s`,
        }}
      />

      {/* Static ring for depth */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          border: `1px solid ${colors.border}`,
          boxShadow: `inset 0 0 20px ${colors.secondary}`,
        }}
      />
    </div>
  );
});
GlowingOrbitPath.displayName = 'GlowingOrbitPath';

// --- Main App Component ---
export default function OrbitingSkills() {
  const [time, setTime] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      const deltaTime = (currentTime - lastTime) / 1000;
      lastTime = currentTime;

      setTime(prevTime => prevTime + deltaTime);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isPaused]);

  const orbitConfigs: Array<{ radius: number; glowColor: GlowColor; delay: number }> = [
    { radius: 100, glowColor: 'cyan', delay: 0 },
    { radius: 180, glowColor: 'purple', delay: 1.5 }
  ];

  return (
    <div className="w-full flex items-center justify-center overflow-hidden py-12 relative">
      <div 
        className="relative w-[calc(100vw-40px)] h-[calc(100vw-40px)] md:w-[450px] md:h-[450px] flex items-center justify-center"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        
        {/* Central "Code" Icon with enhanced glow */}
        <div className="w-20 h-20 bg-gradient-to-br from-zinc-800 to-zinc-950 rounded-full flex items-center justify-center z-10 relative shadow-2xl border border-white/10">
          <div className="absolute inset-0 rounded-full bg-blue-500/30 blur-xl animate-pulse"></div>
          <div className="absolute inset-0 rounded-full bg-purple-500/20 blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="relative z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#73b1ff" />
                  <stop offset="100%" stopColor="#b088fe" />
                </linearGradient>
              </defs>
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
          </div>
        </div>

        {/* Render glowing orbit paths */}
        {orbitConfigs.map((config) => (
          <GlowingOrbitPath
            key={`path-${config.radius}`}
            radius={config.radius}
            glowColor={config.glowColor}
            animationDelay={config.delay}
          />
        ))}

        {/* Render orbiting skill icons */}
        {skillsConfig.map((config) => {
          const angle = time * config.speed + (config.phaseShift || 0);
          return (
            <OrbitingSkill
              key={config.id}
              config={config}
              angle={angle}
            />
          );
        })}
      </div>
    </div>
  );
}
