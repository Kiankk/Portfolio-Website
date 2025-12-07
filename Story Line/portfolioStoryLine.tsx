import React, { useState, useEffect, useRef } from 'react';
import { 
  Terminal, 
  Code, 
  Database,
  Cpu, 
  ChevronDown,
  Mail,
  Github,
  Linkedin
} from 'lucide-react';

// ============================================================================
// PART 1: DATA & CONTENT
// ============================================================================

const SKILLS = [
  "Python (Pandas, NumPy)", "C++", "Java", "Stochastic Calculus", "Algorithmic Trading", "Machine Learning", "SQL", "React/Web Dev"
];

const PROJECTS = [
  {
    title: "AlphaSeeker Algo",
    desc: "High-frequency trading strategy leveraging statistical arbitrage on crypto-currency pairs. Implemented in C++ for microsecond latency.",
    tags: ["C++", "Market Microstructure", "WebSockets"],
    link: "#"
  },
  {
    title: "Risk Parity Engine",
    desc: "A portfolio optimization engine using Monte Carlo simulations to balance risk across asset classes automatically.",
    tags: ["Python", "NumPy", "Monte Carlo"],
    link: "#"
  },
  {
    title: "Sentiment-Based Exec",
    desc: "NLP pipeline that ingests financial news and Twitter feeds to adjust execution algorithms in real-time.",
    tags: ["NLP", "Transformers", "Python"],
    link: "#"
  }
];

// ============================================================================
// PART 2: ANIMATION UTILITIES
// ============================================================================

// Helper to create glowing lines on canvas
const strokeGlow = (ctx: CanvasRenderingContext2D, color: string, width: number, blur: number = 10) => {
  ctx.shadowBlur = blur;
  ctx.shadowColor = color;
  ctx.strokeStyle = color;
  ctx.lineWidth = width;
  ctx.stroke();
  ctx.shadowBlur = 0;
};

// Linear Interpolation for smooth animation
const lerp = (start: number, end: number, factor: number) => {
  return start + (end - start) * factor;
};

// ============================================================================
// PART 3: MAIN ANIMATION ENGINE (SCROLLYTELLING)
// ============================================================================

const ScrollyTelling = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const targetScrollRef = useRef(0);
  const currentScrollRef = useRef(0);
  const [activeScene, setActiveScene] = useState(0);

  // --- Scroll Event Listener ---
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrolled = -top;
      const totalScrollable = height - windowHeight;
      targetScrollRef.current = Math.max(0, Math.min(1, scrolled / totalScrollable));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
}