import React, { useEffect, useRef, useState } from 'react';
import {
    Droplets,
    Leaf,
    Settings,
    Wrench,
    BarChart4,
    GraduationCap,
    Building2,
    School,
    Home,
    Landmark,
    ArrowRight,
    Menu,
    X
} from 'lucide-react';

// --- CUSTOM STYLES & ANIMATIONS ---
const customStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,600;1,9..144,400&family=JetBrains+Mono:wght@400;700&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');

  :root {
    --bg-dark: #0D2B1F;
    --bg-soil: #1A1208;
    --accent-primary: #7FD47A;
    --accent-nutrient: #C8922A;
    --accent-water: #4DB8B0;
    --text-main: #F5F0E8;
    
    --font-display: 'Fraunces', serif;
    --font-body: 'Lora', serif;
    --font-mono: 'JetBrains Mono', monospace;
  }

  body {
    background-color: var(--bg-dark);
    color: var(--text-main);
    font-family: var(--font-body);
    margin: 0;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 400;
  }

  .font-mono {
    font-family: var(--font-mono);
  }

  .bg-noise {
    position: fixed;
    top: 0; left: 0; width: 100vw; height: 100vh;
    pointer-events: none;
    z-index: 50;
    opacity: 0.04;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  }

  /* Scroll Reveal Utilities */
  .reveal {
    opacity: 0;
    transform: translateY(40px);
    transition: all 0.9s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .reveal.active {
    opacity: 1;
    transform: translateY(0);
  }
  .reveal-delay-1 { transition-delay: 100ms; }
  .reveal-delay-2 { transition-delay: 200ms; }
  .reveal-delay-3 { transition-delay: 300ms; }

  /* SVG Animations */
  @keyframes flowDash {
    to {
      stroke-dashoffset: -100;
    }
  }
  .animate-flow {
    stroke-dasharray: 10 15;
    animation: flowDash 2s linear infinite;
  }

  @keyframes pulseGlow {
    0%, 100% { opacity: 0.5; filter: blur(4px); }
    50% { opacity: 1; filter: blur(8px); }
  }
  .glow-node {
    animation: pulseGlow 4s ease-in-out infinite;
  }

  @keyframes slowSpin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  .spin-slow {
    animation: slowSpin 12s linear infinite;
    transform-origin: center;
  }

  /* Diagonal Section Divider */
  .diagonal-divider {
    width: 100%;
    height: 8vw;
    background-color: var(--bg-soil);
    clip-path: polygon(0 100%, 100% 0, 100% 100%);
    margin-top: -8vw;
    position: relative;
    z-index: 10;
  }
  
  /* Custom inputs */
  .custom-input {
    background: transparent;
    border: 1px solid rgba(245, 240, 232, 0.2);
    color: var(--text-main);
    font-family: var(--font-body);
    transition: border-color 0.3s ease;
  }
  .custom-input:focus {
    outline: none;
    border-color: var(--accent-primary);
  }
  .custom-input::placeholder {
    color: rgba(245, 240, 232, 0.4);
  }
`;

// --- COMPONENT: Animated Counter ---
const AnimatedCounter = ({ end, suffix = "", prefix = "", decimals = 0 }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    let start = 0;
                    const duration = 2000;
                    const startTime = performance.now();

                    const animate = (currentTime) => {
                        const elapsed = currentTime - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        // Ease out expo
                        const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);

                        setCount(start + (end - start) * easeOut);

                        if (progress < 1) {
                            requestAnimationFrame(animate);
                        }
                    };
                    requestAnimationFrame(animate);
                    observer.unobserve(entry.target);
                }
            },
            { threshold: 0.5 }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }
        return () => observer.disconnect();
    }, [end]);

    return (
        <span ref={ref}>
            {prefix}
            {count.toFixed(decimals)}
            {suffix}
        </span>
    );
};

// --- COMPONENT: Main App ---
export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Scroll Reveal Hook
    useEffect(() => {
        const reveals = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                    }
                });
            },
            { threshold: 0.15, rootMargin: "0px 0px -50px 0px" }
        );

        reveals.forEach((r) => observer.observe(r));
        return () => observer.disconnect();
    }, []);

    return (
        <div className="relative min-h-screen">
            <style>{customStyles}</style>
            <div className="bg-noise"></div>

            {/* NAVIGATION */}
            <nav className="fixed w-full z-40 top-0 px-6 py-6 transition-all duration-300 mix-blend-difference text-[var(--text-main)]">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        {/* Minimal Loop Logo */}
                        <svg width="32" height="32" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="spin-slow">
                            <path d="M50 10C27.9086 10 10 27.9086 10 50C10 72.0914 27.9086 90 50 90C72.0914 90 90 72.0914 90 50" stroke="var(--accent-primary)" strokeWidth="8" strokeLinecap="round" />
                            <path d="M90 50L75 35M90 50L105 35" stroke="var(--accent-primary)" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
                            <circle cx="50" cy="50" r="15" fill="var(--accent-water)" />
                        </svg>
                        <span className="font-display text-2xl tracking-wide font-semibold">AliveCycle</span>
                    </div>

                    <div className="hidden md:flex gap-8 font-mono text-sm uppercase tracking-widest">
                        <a href="#problem" className="hover:text-[var(--accent-primary)] transition-colors">Problem</a>
                        <a href="#system" className="hover:text-[var(--accent-primary)] transition-colors">System</a>
                        <a href="#impact" className="hover:text-[var(--accent-primary)] transition-colors">Impact</a>
                        <a href="#contact" className="hover:text-[var(--accent-primary)] transition-colors">Contact</a>
                    </div>

                    <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div className="fixed inset-0 z-30 bg-[var(--bg-dark)] pt-32 px-6 flex flex-col gap-8 md:hidden font-display text-4xl">
                    <a href="#problem" onClick={() => setIsMenuOpen(false)}>The Problem</a>
                    <a href="#system" onClick={() => setIsMenuOpen(false)}>The System</a>
                    <a href="#impact" onClick={() => setIsMenuOpen(false)}>Impact Data</a>
                    <a href="#contact" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
                </div>
            )}

            {/* 1. HERO SECTION */}
            <section className="relative min-h-screen flex items-center pt-24 pb-12 px-6 overflow-hidden">
                {/* Abstract animated background lines */}
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <svg width="100%" height="100%" className="absolute">
                        <path d="M-100,200 C300,100 500,400 1200,200" stroke="var(--accent-water)" strokeWidth="2" fill="none" className="animate-flow" />
                        <path d="M-100,500 C400,600 600,200 1200,500" stroke="var(--accent-nutrient)" strokeWidth="2" fill="none" className="animate-flow" style={{ animationDirection: 'reverse', animationDuration: '4s' }} />
                    </svg>
                </div>

                <div className="max-w-7xl mx-auto w-full relative z-10 grid md:grid-cols-12 gap-12 items-center">
                    <div className="md:col-span-10 lg:col-span-8">
                        <div className="reveal">
                            <span className="font-mono text-[var(--accent-primary)] tracking-widest text-sm uppercase mb-6 block border-l-2 border-[var(--accent-primary)] pl-4">
                                Decentralized Environmental Infrastructure
                            </span>
                            <h1 className="text-5xl md:text-7xl lg:text-8xl leading-[1.05] mb-8">
                                Urban waste is a <span className="italic text-[var(--accent-nutrient)]">resource problem</span> disguised as a disposal problem.
                            </h1>
                        </div>

                        <div className="reveal reveal-delay-1 max-w-2xl">
                            <p className="text-lg md:text-xl text-[var(--text-main)] opacity-80 leading-relaxed mb-10">
                                AliveCycle designs, deploys, and operates decentralized systems that turn greywater and organic waste into water, nutrients, and measurable impact — right where they're generated.
                            </p>

                            <a href="#contact" className="inline-flex items-center gap-3 bg-[var(--text-main)] text-[var(--bg-dark)] px-8 py-4 font-mono font-bold uppercase tracking-wider hover:bg-[var(--accent-primary)] transition-all duration-300">
                                Talk to Us About Your Site <ArrowRight size={20} />
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. THE PROBLEM */}
            <section id="problem" className="py-24 px-6 relative bg-[var(--bg-dark)]">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl mb-16 reveal border-b border-[var(--text-main)]/20 pb-6 inline-block">The Gap No One Talks About</h2>

                    <div className="grid md:grid-cols-2 gap-16 md:gap-24 mb-16">
                        <div className="reveal reveal-delay-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[var(--accent-water)]/10 text-[var(--accent-water)] rounded-none border border-[var(--accent-water)]/30">
                                    <Droplets size={24} />
                                </div>
                                <h3 className="text-2xl font-display">The Water Problem</h3>
                            </div>
                            <p className="text-lg opacity-80 leading-relaxed font-body">
                                Greywater from bathrooms, laundry, and kitchens is low-contamination and reusable — but it gets mixed with blackwater in municipal drains. That mixing makes both streams harder and costlier to treat. Recoverable water is lost. Freshwater extraction increases. Groundwater declines.
                            </p>
                        </div>

                        <div className="reveal reveal-delay-2">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="p-3 bg-[var(--accent-nutrient)]/10 text-[var(--accent-nutrient)] rounded-none border border-[var(--accent-nutrient)]/30">
                                    <Leaf size={24} />
                                </div>
                                <h3 className="text-2xl font-display">The Waste Problem</h3>
                            </div>
                            <p className="text-lg opacity-80 leading-relaxed font-body">
                                Organic food waste — kitchen leftovers, preparation scraps, mess waste — is high in nutrients. But it's landfilled or left to rot, releasing methane and leaching into soil. Those nutrients never return to the ecosystem.
                            </p>
                        </div>
                    </div>

                    <div className="reveal relative border-l-4 border-[var(--accent-nutrient)] pl-8 py-4 my-12 bg-white/5 backdrop-blur-sm p-8 md:w-4/5 ml-auto">
                        <p className="text-2xl md:text-3xl font-display leading-tight">
                            "The result: excess freshwater extraction, declining groundwater, poor sanitation, and lost nutrients — <span className="text-[var(--accent-nutrient)] italic">all from the same urban block, every single day.</span>"
                        </p>
                    </div>
                </div>
            </section>

            {/* Transition to Soil Background */}
            <div className="diagonal-divider"></div>

            {/* 3. THE SYSTEM (CORE) */}
            <section id="system" className="py-24 px-6 bg-[var(--bg-soil)] relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="reveal mb-16 text-center">
                        <span className="font-mono text-[var(--accent-primary)] tracking-widest text-sm uppercase mb-4 block">The Architecture</span>
                        <h2 className="text-5xl md:text-6xl">One Loop. Two Recovery Streams.</h2>
                    </div>

                    {/* SVG SYSTEM DIAGRAM */}
                    <div className="w-full overflow-x-auto pb-12 reveal">
                        <div className="min-w-[800px] h-[400px] relative bg-black/20 border border-[var(--text-main)]/10 p-8">
                            <svg width="100%" height="100%" viewBox="0 0 1000 350" preserveAspectRatio="xMidYMid meet">
                                <defs>
                                    <filter id="glow-teal">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                    <filter id="glow-amber">
                                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                {/* Grid Background */}
                                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245, 240, 232, 0.05)" strokeWidth="1" />
                                </pattern>
                                <rect width="100%" height="100%" fill="url(#grid)" />

                                {/* WATER PATH (Teal) */}
                                <path d="M 120 100 L 350 100 L 400 60 L 650 60 L 700 100 L 880 100"
                                    fill="none" stroke="rgba(77, 184, 176, 0.2)" strokeWidth="8" strokeLinecap="round" />
                                <path d="M 120 100 L 350 100 L 400 60 L 650 60 L 700 100 L 880 100"
                                    fill="none" stroke="var(--accent-water)" strokeWidth="3" className="animate-flow" strokeLinecap="round" filter="url(#glow-teal)" />

                                {/* NUTRIENT PATH (Amber) */}
                                <path d="M 120 250 L 350 250 L 400 290 L 650 290 L 700 250 L 880 250"
                                    fill="none" stroke="rgba(200, 146, 42, 0.2)" strokeWidth="8" strokeLinecap="round" />
                                <path d="M 120 250 L 350 250 L 400 290 L 650 290 L 700 250 L 880 250"
                                    fill="none" stroke="var(--accent-nutrient)" strokeWidth="3" className="animate-flow" strokeLinecap="round" filter="url(#glow-amber)" />

                                {/* Convergence Lines (Faint) */}
                                <path d="M 880 100 Q 950 175 880 250" fill="none" stroke="rgba(127, 212, 122, 0.3)" strokeWidth="2" strokeDasharray="4 4" />

                                {/* WATER NODES */}
                                <g transform="translate(120, 100)">
                                    <circle cx="0" cy="0" r="15" fill="var(--bg-dark)" stroke="var(--accent-water)" strokeWidth="3" />
                                    <text x="0" y="-25" fill="var(--text-main)" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">Greywater Source</text>
                                </g>
                                <g transform="translate(350, 100)">
                                    <rect x="-10" y="-10" width="20" height="20" fill="var(--bg-dark)" stroke="var(--accent-water)" strokeWidth="3" transform="rotate(45)" />
                                    <text x="0" y="-25" fill="var(--text-main)" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">Separation</text>
                                </g>
                                <g transform="translate(525, 60)">
                                    <rect x="-40" y="-20" width="80" height="40" fill="var(--accent-water)" fillOpacity="0.1" stroke="var(--accent-water)" strokeWidth="2" />
                                    <text x="0" y="5" fill="var(--accent-water)" fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">Treatment</text>
                                </g>
                                <g transform="translate(700, 100)">
                                    <circle cx="0" cy="0" r="15" fill="var(--bg-dark)" stroke="var(--accent-water)" strokeWidth="3" />
                                    <text x="0" y="-25" fill="var(--text-main)" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">Filtered Water</text>
                                </g>
                                <g transform="translate(880, 100)">
                                    <polygon points="-15,-15 15,0 -15,15" fill="var(--accent-water)" />
                                    <text x="0" y="-25" fill="var(--text-main)" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">Recharge/Reuse</text>
                                </g>

                                {/* NUTRIENT NODES */}
                                <g transform="translate(120, 250)">
                                    <circle cx="0" cy="0" r="15" fill="var(--bg-dark)" stroke="var(--accent-nutrient)" strokeWidth="3" />
                                    <text x="0" y="35" fill="var(--text-main)" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">Organic Waste</text>
                                </g>
                                <g transform="translate(350, 250)">
                                    <rect x="-10" y="-10" width="20" height="20" fill="var(--bg-dark)" stroke="var(--accent-nutrient)" strokeWidth="3" transform="rotate(45)" />
                                    <text x="0" y="35" fill="var(--text-main)" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">Oil Extraction</text>
                                    <path d="M 0 -20 L 0 -50" stroke="var(--accent-nutrient)" strokeWidth="2" strokeDasharray="2 2" />
                                    <text x="0" y="-55" fill="var(--accent-nutrient)" fontSize="10" fontFamily="JetBrains Mono" textAnchor="middle">Biofuel</text>
                                </g>
                                <g transform="translate(525, 290)">
                                    <rect x="-40" y="-20" width="80" height="40" fill="var(--accent-nutrient)" fillOpacity="0.1" stroke="var(--accent-nutrient)" strokeWidth="2" />
                                    <text x="0" y="5" fill="var(--accent-nutrient)" fontSize="14" fontFamily="JetBrains Mono" fontWeight="bold" textAnchor="middle">Composting</text>
                                </g>
                                <g transform="translate(700, 250)">
                                    <circle cx="0" cy="0" r="15" fill="var(--bg-dark)" stroke="var(--accent-nutrient)" strokeWidth="3" />
                                    <text x="0" y="35" fill="var(--text-main)" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">Bio-Fertilizer</text>
                                </g>
                                <g transform="translate(880, 250)">
                                    <polygon points="-15,-15 15,0 -15,15" fill="var(--accent-nutrient)" />
                                    <text x="0" y="35" fill="var(--text-main)" fontSize="12" fontFamily="JetBrains Mono" textAnchor="middle">Urban Soil/Farms</text>
                                </g>
                            </svg>
                        </div>
                    </div>

                    {/* Feature Cards below Diagram */}
                    <div className="grid md:grid-cols-2 gap-8 reveal reveal-delay-1">
                        <div className="border border-[var(--accent-water)]/20 bg-black/20 p-8 hover:border-[var(--accent-water)] transition-colors duration-500">
                            <h3 className="text-2xl font-display text-[var(--accent-water)] mb-4 flex items-center gap-3">
                                <Droplets size={24} /> Water Recovery System
                            </h3>
                            <p className="opacity-80 font-body leading-relaxed">
                                Greywater is diverted before mixing, treated locally using filtration and biological processing, stored, and reused — for landscaping, urban greenery, or groundwater recharge. No large infrastructure required.
                            </p>
                        </div>

                        <div className="border border-[var(--accent-nutrient)]/20 bg-black/20 p-8 hover:border-[var(--accent-nutrient)] transition-colors duration-500">
                            <h3 className="text-2xl font-display text-[var(--accent-nutrient)] mb-4 flex items-center gap-3">
                                <Leaf size={24} /> Nutrient Recovery System
                            </h3>
                            <p className="opacity-80 font-body leading-relaxed">
                                Organic waste is separated, oil is extracted for biofuel, and the remaining matter is processed into bio-fertilizer. It goes back into local soil — or is sold to peri-urban farmers.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. WHY DIFFERENT */}
            <section className="py-24 px-6 bg-[var(--bg-soil)]">
                <div className="max-w-7xl mx-auto">
                    <div className="grid lg:grid-cols-3 gap-16">
                        <div className="lg:col-span-1 reveal">
                            <h2 className="text-4xl md:text-5xl mb-6">We Don't Just Install.<br /><span className="italic text-[var(--accent-primary)]">We Operate.</span></h2>
                            <p className="text-lg opacity-80 leading-relaxed font-body">
                                Most sustainability systems fail not at installation — but at maintenance. AliveCycle is a full-stack service provider. We design, deploy, operate, maintain, train stakeholders, and track outcomes. We stay with the system.
                            </p>
                        </div>

                        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-8">
                            {[
                                { icon: <Settings className="text-[var(--text-main)]" />, title: "Design & Deploy", desc: "Custom systems sized for your site — institution, ward, or society." },
                                { icon: <Wrench className="text-[var(--text-main)]" />, title: "Operate & Maintain", desc: "Ongoing operations handled by our team. No burden on your staff." },
                                { icon: <BarChart4 className="text-[var(--text-main)]" />, title: "ESG Tracking", desc: "Measurable outcomes: water saved, waste reduced, groundwater supported." },
                                { icon: <GraduationCap className="text-[var(--text-main)]" />, title: "Train & Handover", desc: "Local stakeholder training for long-term ownership and operation." }
                            ].map((item, idx) => (
                                <div key={idx} className={`reveal reveal-delay-${idx % 3 + 1} p-6 border border-white/10 bg-white/5`}>
                                    <div className="w-12 h-12 flex items-center justify-center bg-[var(--bg-dark)] border border-white/20 mb-6">
                                        {item.icon}
                                    </div>
                                    <h4 className="text-xl font-display mb-3">{item.title}</h4>
                                    <p className="opacity-70 font-body text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Back to Green Background */}
            <div className="w-full h-24 bg-[var(--bg-dark)]" style={{ clipPath: 'polygon(0 0, 100% 100%, 0 100%)', backgroundColor: 'var(--bg-soil)' }}></div>

            {/* 5. METRICS (ESG) */}
            <section id="impact" className="py-24 px-6 bg-[var(--bg-dark)]">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center max-w-3xl mx-auto mb-20 reveal">
                        <h2 className="text-4xl md:text-5xl mb-6">Infrastructure That Reports Itself</h2>
                        <p className="text-lg opacity-80 leading-relaxed">
                            Every AliveCycle deployment generates traceable ESG data — useful for institutional compliance, government reporting, and sustainability certifications.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { icon: <Droplets />, value: 45000, suffix: "L+", label: "Greywater recovered / day", color: "text-[var(--accent-water)]" },
                            { icon: <Leaf />, value: 1200, suffix: "kg", label: "Bio-fertilizer / month", color: "text-[var(--accent-nutrient)]" },
                            { icon: <Building2 />, value: 65, suffix: "%", label: "Municipal load reduction", color: "text-[var(--accent-primary)]" },
                            { icon: <Droplets />, value: 2.5, suffix: "M", decimals: 1, label: "Groundwater recharge (L)", color: "text-[var(--accent-water)]" }
                        ].map((metric, idx) => (
                            <div key={idx} className="reveal text-center border-t border-[var(--text-main)]/20 pt-8">
                                <div className={`flex justify-center mb-4 opacity-70 ${metric.color}`}>
                                    {metric.icon}
                                </div>
                                <div className={`text-4xl md:text-5xl font-mono font-bold mb-2 ${metric.color}`}>
                                    <AnimatedCounter end={metric.value} suffix={metric.suffix} decimals={metric.decimals} />
                                </div>
                                <div className="font-mono text-xs uppercase tracking-widest opacity-60">
                                    {metric.label}
                                </div>
                            </div>
                        ))}
                    </div>
                    <p className="text-center mt-12 font-mono text-sm opacity-50 reveal">* Example metrics. Actual figures reported per site live dashboard.</p>
                </div>
            </section>

            {/* 6. WHO WE WORK WITH */}
            <section className="py-24 px-6 bg-[var(--bg-dark)] border-t border-[var(--text-main)]/10">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl mb-16 reveal border-b border-[var(--text-main)]/20 pb-6 inline-block">Built for Community Managers</h2>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
                        {[
                            { icon: <Landmark size={32} strokeWidth={1.5} />, title: "Municipalities", desc: "Ward-level and city-scale greywater networks." },
                            { icon: <School size={32} strokeWidth={1.5} />, title: "Institutions", desc: "Hostels, messes, and campus greenery systems." },
                            { icon: <Home size={32} strokeWidth={1.5} />, title: "Societies", desc: "Apartment complexes and housing clusters." },
                            { icon: <Building2 size={32} strokeWidth={1.5} />, title: "Government", desc: "Public infrastructure and civic sanitation projects." }
                        ].map((client, idx) => (
                            <div key={idx} className={`reveal reveal-delay-${idx} bg-white/5 p-8 flex flex-col items-center text-center hover:bg-white/10 transition-colors`}>
                                <div className="mb-6 text-[var(--accent-primary)]">{client.icon}</div>
                                <h4 className="text-xl font-display mb-3">{client.title}</h4>
                                <p className="opacity-70 text-sm font-body">{client.desc}</p>
                            </div>
                        ))}
                    </div>

                    <p className="text-2xl md:text-3xl font-display text-center italic reveal text-[var(--accent-nutrient)]">
                        "If you generate waste and water, AliveCycle turns them into assets."
                    </p>
                </div>
            </section>

            {/* 7. HOW IT WORKS */}
            <section className="py-24 px-6 bg-[var(--bg-soil)] relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl md:text-5xl mb-16 reveal text-center">From Site Visit to Running System</h2>

                    <div className="flex flex-col md:flex-row justify-between relative">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute top-10 left-10 right-10 h-px bg-white/20 z-0"></div>

                        {[
                            { num: "01", title: "Site Assessment", desc: "We study your waste streams, infrastructure, and space." },
                            { num: "02", title: "System Design", desc: "Custom-sized greywater and organic waste solution." },
                            { num: "03", title: "Deployment", desc: "Installation with minimal disruption to existing systems." },
                            { num: "04", title: "Operations", desc: "Our team runs it; your team learns alongside." },
                            { num: "05", title: "Reporting", desc: "Monthly ESG impact data delivered to stakeholders." }
                        ].map((step, idx) => (
                            <div key={idx} className="reveal relative z-10 flex flex-col md:items-center mb-12 md:mb-0 md:w-1/5 md:px-4">
                                <div className="w-20 h-20 bg-[var(--bg-dark)] border border-white/20 flex items-center justify-center font-mono text-2xl text-[var(--accent-primary)] mb-6 md:mx-auto">
                                    {step.num}
                                </div>
                                <h4 className="text-xl font-display mb-2 md:text-center">{step.title}</h4>
                                <p className="opacity-70 text-sm font-body md:text-center leading-relaxed">{step.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. CONTACT / CTA */}
            <section id="contact" className="py-24 px-6 bg-[var(--accent-primary)] text-[var(--bg-dark)]">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
                    <div className="reveal">
                        <h2 className="text-5xl md:text-6xl mb-8">Ready to Close<br />the Loop?</h2>
                        <p className="text-xl opacity-90 leading-relaxed font-body mb-8">
                            Whether you're a municipal planner, an institution administrator, or a housing society committee — if you're ready to stop discarding recoverable resources, we'd like to talk.
                        </p>
                        <button className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[var(--bg-dark)] hover:opacity-70 transition-opacity">
                            Download our service overview <ArrowRight size={20} />
                        </button>
                    </div>

                    <div className="reveal reveal-delay-1 bg-[var(--bg-dark)] p-8 md:p-12 text-[var(--text-main)]">
                        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
                            <div className="grid grid-cols-2 gap-6">
                                <input type="text" placeholder="Name" className="custom-input p-4 w-full" required />
                                <input type="text" placeholder="Organization" className="custom-input p-4 w-full" required />
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                <input type="text" placeholder="Role / Title" className="custom-input p-4 w-full" required />
                                <input type="tel" placeholder="Phone / Email" className="custom-input p-4 w-full" required />
                            </div>
                            <select className="custom-input p-4 w-full appearance-none rounded-none text-[var(--text-main)] bg-[var(--bg-dark)]">
                                <option value="" disabled selected>Type of Site</option>
                                <option value="municipality">Municipality</option>
                                <option value="institution">Institution</option>
                                <option value="society">Residential Society</option>
                                <option value="government">Government Body</option>
                                <option value="other">Other</option>
                            </select>
                            <textarea placeholder="Brief description of your site's needs..." rows="4" className="custom-input p-4 w-full"></textarea>

                            <button type="submit" className="bg-[var(--accent-primary)] text-[var(--bg-dark)] py-4 font-mono font-bold uppercase tracking-wider hover:bg-white transition-colors mt-2">
                                Request a Site Assessment
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* 9. FOOTER */}
            <footer className="py-12 px-6 bg-[var(--bg-dark)] border-t border-[var(--text-main)]/10 text-center md:text-left">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div>
                        <div className="font-display text-2xl font-semibold mb-2">AliveCycle</div>
                        <p className="font-mono text-sm opacity-60">Close the loop. Return what was taken.</p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-6 font-mono text-sm uppercase tracking-wider opacity-80">
                        <a href="#" className="hover:text-[var(--accent-primary)] transition-colors">About</a>
                        <a href="#" className="hover:text-[var(--accent-primary)] transition-colors">Services</a>
                        <a href="#impact" className="hover:text-[var(--accent-primary)] transition-colors">ESG Outcomes</a>
                        <a href="#contact" className="hover:text-[var(--accent-primary)] transition-colors">Contact</a>
                    </div>

                    <div className="text-right">
                        <p className="font-mono text-sm opacity-60 mb-2">@alivecycle</p>
                        <p className="text-xs opacity-40 max-w-[250px] mx-auto md:mx-0">
                            AliveCycle is a decentralized environmental infrastructure service operating in India.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
}