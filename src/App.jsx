import React, { useMemo } from 'react';
import Hyperspeed from './components/Hyperspeed/Hyperspeed';

export default function App() {
  const hyperspeedOptions = useMemo(() => ({
    distortion: "turbulentDistortion",
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [12, 80],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808,
      islandColor: 0x0a0a0a,
      background: 0x000000,
      shoulderLines: 0x131313,
      brokenLines: 0x131313,
      leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
      rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
      sticks: 0x03b3c3
    }
  }), []);

  return (
    <div className="relative w-full overflow-hidden text-on-surface">
      {/* Scroll indicator overlay */}
      <div className="fixed top-0 left-0 w-full z-[60]">
        <div className="h-[2px] bg-gradient-to-r from-primary to-secondary w-1/3"></div>
      </div>

      {/* Interactive 3D Background */}
      <Hyperspeed effectOptions={hyperspeedOptions} />

      {/* TopAppBar */}
      <header className="sticky top-0 w-full z-50 bg-surface-dim/60 backdrop-blur-2xl border-b border-white/5">
        <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-outline-variant/30">
              <img 
                alt="Developer Portrait" 
                className="w-full h-full object-cover" 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVm3Xwpwwq1tjTItg83embfpn329YgYSzqBRlkmP0-Za1X3C_DYUezps2ZJSzccyqNzkG-cHldvSu5HnqvsXE4yOBbtCpZEaA4l3dy-BbKDHQG2LIv7l-ymbRBwohMPqbjhcHzWlMCF7rnEZI1HVXv59owyLZVInECIGl5T2ifKeXuhmqUUQ3fqi-ahwRTNuTBZ641ZgpIEP_BhuRKaZ4-G5oXHhkk91oRw6PdgCPxz10O2xdOZFeKz2pRHoLMfUH3bgcYZzU9dlCm"
              />
            </div>
            <span className="text-xl font-black tracking-tighter text-white font-headline">ENGINEER.CX</span>
          </div>
          
          <nav className="hidden md:flex gap-8 items-center tracking-tight text-white font-label">
            <a href="#hero" className="text-white border-b-2 border-primary pb-1 uppercase tracking-widest text-xs">HOME</a>
            <a href="#projects" className="text-on-surface-variant hover:text-white transition-colors uppercase tracking-widest text-xs">PROJECTS</a>
            <a href="#journey" className="text-on-surface-variant hover:text-white transition-colors uppercase tracking-widest text-xs">JOURNEY</a>
            <a href="#contact" className="px-6 py-2 rounded-full primary-gradient text-on-primary-fixed font-bold active:scale-95 transition-transform hover:opacity-90 uppercase tracking-widest text-xs">Work with me</a>
          </nav>

          <button className="md:hidden text-white">
            <span className="material-symbols-outlined">menu</span>
          </button>
        </div>
      </header>

      <main className="relative z-10">
        {/* Section 1: Hero */}
        <section id="hero" className="relative min-h-[max(800px,100vh)] flex flex-col justify-center px-6 max-w-7xl mx-auto -mt-20">
          <div className="max-w-4xl pt-32">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full bg-surface-container-high/50 backdrop-blur-md border border-outline-variant/20">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-on-surface-variant uppercase">Available for high-scale architectural roles</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8 font-headline">
              Architecting <span className="text-transparent bg-clip-text primary-gradient drop-shadow-[0_0_15px_rgba(115,177,255,0.5)]">Efficient</span> Solutions.
            </h1>
            
            <p className="text-xl md:text-2xl text-on-surface-variant max-w-2xl font-light leading-relaxed mb-12 mix-blend-plus-lighter">
              Focused on scalable systems and high-performance engineering. I build the digital foundations that power modern business logic.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="px-8 py-4 rounded-xl primary-gradient text-on-primary-fixed font-bold text-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3">
                View Ecosystem
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
              <button className="px-8 py-4 rounded-xl glass-panel text-on-surface font-semibold text-lg border border-outline-variant/30 hover:bg-white/10 active:scale-95 transition-all">
                Technical Specs
              </button>
            </div>
          </div>
        </section>

        {/* Section 2: Skills Bento Grid */}
        <section className="py-24 px-6 max-w-7xl mx-auto" id="skills">
          <div className="mb-16">
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Capabilities</h2>
            <div className="text-4xl font-bold tracking-tight text-white drop-shadow-[0_0_8px_rgba(0,0,0,0.8)]">System Intelligence</div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 p-8 rounded-xl glass-panel border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              <div className="flex justify-between items-start mb-12">
                <div>
                  <h3 className="text-2xl font-bold mb-2">Core Languages</h3>
                  <p className="text-on-surface-variant text-sm">Low-level precision with high-level abstractions.</p>
                </div>
                <span className="material-symbols-outlined text-primary text-4xl">code</span>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Node.js', 'TypeScript', 'JavaScript', 'Python', 'SQL'].map(lang => (
                  <span key={lang} className="px-4 py-2 rounded-full bg-surface-container-highest/80 backdrop-blur-sm text-xs font-bold tracking-wider text-on-surface uppercase border border-outline-variant/10">
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-8 rounded-xl glass-panel border border-outline-variant/20 hover:border-outline-variant/40 transition-colors">
              <div className="mb-12">
                <span className="material-symbols-outlined text-secondary text-4xl mb-4">build</span>
                <h3 className="text-2xl font-bold mb-2">Tools</h3>
                <p className="text-on-surface-variant text-sm">Deployment & Ops</p>
              </div>
              <div className="space-y-4">
                {[
                  { name: 'Kubernetes', pct: '90%' },
                  { name: 'Docker', pct: '95%' },
                  { name: 'AWS / GCP', pct: '85%' },
                ].map(tool => (
                  <div key={tool.name} className="flex items-center justify-between group">
                    <span className="text-on-surface-variant group-hover:text-white transition-colors">{tool.name}</span>
                    <div className="w-12 h-1 bg-surface-container-highest/50 rounded-full overflow-hidden">
                      <div className="bg-secondary h-full" style={{ width: tool.pct }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="md:col-span-3 p-8 rounded-xl glass-panel border border-outline-variant/20 grid md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="text-xs font-black tracking-widest text-primary uppercase">Scalability</h4>
                <p className="text-sm text-on-surface-variant">Distributed systems, load balancing, and microservices orchestration.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black tracking-widest text-primary uppercase">Performance</h4>
                <p className="text-sm text-on-surface-variant">Low-latency optimization, memory management, and caching strategies.</p>
              </div>
              <div className="space-y-4">
                <h4 className="text-xs font-black tracking-widest text-primary uppercase">Security</h4>
                <p className="text-sm text-on-surface-variant">End-to-end encryption, OAuth2, and secure API architecture.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Projects */}
        <section className="py-24 px-6 relative" id="projects">
          {/* subtle background separator for projects */}
          <div className="absolute inset-0 bg-surface-dim/40 backdrop-blur-sm -z-10 border-t border-white/5"></div>
          
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4">Portfolio</h2>
                <div className="text-5xl md:text-6xl font-black tracking-tighter text-white font-headline drop-shadow-md">Selected Projects</div>
              </div>
              <p className="text-on-surface-variant max-w-sm">
                A curated collection of systems designed for maximum reliability and throughput.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="group">
                <div className="relative overflow-hidden rounded-xl bg-surface-container-highest/20 mb-8 aspect-video border border-outline-variant/20 group-hover:border-primary/50 transition-colors backdrop-blur-md">
                  <img 
                    alt="FarmEye Project" 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 mix-blend-screen"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDnnZzYdTswc-htRc0yB3DAltj56-v35d6eL-_VqfGGtW44cB2x28UNGhcQw13a2NzxxCWbkCHpvKZ6Kk7gB1OZfdfyNNscA_3NHP0iRIe5kbbi80D-YS4ElK4uBjeSkeXdCNS4MKFU0SohDcbv9nvKMoXLlNBN7Shjqm3pNxF9dR7HsWkpQdHjm9G0FU-Qj71QaJfp5Q_Wkcf0OjetgLKlLCnH6ZNdToOUdQE-HRcMyloR31lMen-paVe3Le1UbijNkEAd32zryvJs"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="flex gap-2">
                      <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-black uppercase">AI / IoT</span>
                      <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase">Real-time</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-primary transition-colors drop-shadow-sm">FarmEye</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  An automated monitoring system for large-scale agriculture. Leverages AI and IoT sensors to predict crop yields with 94% accuracy.
                </p>
                <div className="flex gap-4">
                  {['NODE.JS', 'TYPESCRIPT', 'GCP'].map(tech => (
                    <span key={tech} className="text-xs font-bold text-white tracking-widest border-b border-primary/50 pb-1">{tech}</span>
                  ))}
                </div>
              </div>

              <div className="group">
                <div className="relative overflow-hidden rounded-xl bg-surface-container-highest/20 mb-8 aspect-video border border-outline-variant/20 group-hover:border-secondary/50 transition-colors backdrop-blur-md">
                  <img 
                    alt="Bank Management System" 
                    className="w-full h-full object-cover grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-105 mix-blend-screen" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC2zfPKjIaf7rNQ2_6skFK0qCj-guA1hZtCGMRJcDJaVUNvDR-5F7NaVy-G2FAV83AxtTjwKs0K7Yxr-uSgTfjY4PbkQeCm520xXTI1rlF3HsjFLrPai9tDhwyFAdktKlZ01tDpuSV-COWEI-y3dELZHGmDFwr9JF60z-IRsUGnZ5onAe9lyyr9n9WNFUL431s3CtpUVuEaDPYiB6kFgCJdUJI1pvinS0xaUlgDzsMk30EekL7BOZ_nEyUTvlQZNuI0vQxhI5YLeklR"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface-dim via-transparent to-transparent opacity-80"></div>
                  <div className="absolute bottom-6 left-6">
                    <div className="flex gap-2">
                       <span className="px-3 py-1 rounded-full bg-primary-container text-on-primary-container text-[10px] font-black uppercase">FinTech</span>
                       <span className="px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-[10px] font-black uppercase">Backend</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-3xl font-bold mb-4 group-hover:text-secondary transition-colors drop-shadow-sm">Bank Management System</h3>
                <p className="text-on-surface-variant leading-relaxed mb-6">
                  Secure, ACID-compliant banking backend built for high-concurrency environments. Handles thousands of transactions per second.
                </p>
                <div className="flex gap-4">
                  {['NODE.JS', 'SQL', 'REDIS'].map(tech => (
                     <span key={tech} className="text-xs font-bold text-white tracking-widest border-b border-secondary/50 pb-1">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 4: Journey */}
        <section className="py-24 px-6 max-w-7xl mx-auto" id="journey">
          <div className="text-center mb-20">
            <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 drop-shadow-sm">Evolution</h2>
            <div className="text-4xl font-bold text-white drop-shadow-md">The Engineering Journey</div>
          </div>
          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-[1px] bg-outline-variant/30 md:-translate-x-1/2 shadow-[0_0_10px_rgba(255,255,255,0.1)]"></div>
            
            {[
              {
                period: "2022 — PRESENT",
                role: "Lead Systems Architect",
                desc: "Spearheading the transition to microservices for Fortune 500 logistics firm.",
                color: "primary-gradient",
                shadow: "shadow-[0_0_15px_rgba(115,177,255,0.5)]"
              },
              {
                period: "2020 — 2022",
                role: "Senior Backend Engineer",
                desc: "Optimized payment gateways, reducing latency by 40% across all regions.",
                color: "bg-secondary",
                shadow: "shadow-[0_0_15px_rgba(176,136,254,0.3)]",
                reverse: true
              },
              {
                period: "2018 — 2020",
                role: "Software Developer",
                desc: "Full-stack exploration with a focus on data visualization and API design.",
                color: "bg-outline-variant",
                shadow: ""
              }
            ].map((node, i) => (
              <div key={i} className={`relative mb-24 md:flex items-center w-full ${node.reverse ? 'flex-row-reverse' : 'justify-between'}`}>
                <div className="hidden md:block w-[45%]"></div>
                <div className={`absolute left-0 md:left-1/2 w-4 h-4 rounded-full ${node.color} -translate-x-1/2 z-10 ${node.shadow}`}></div>
                <div className={`pl-8 md:pl-0 md:w-[45%] ${node.reverse ? 'text-left md:text-right' : ''}`}>
                  <div className="glass-panel p-6 rounded-xl border border-outline-variant/20 hover:border-outline-variant/40 transition-colors backdrop-blur-xl">
                    <span className="text-primary font-bold text-xs tracking-widest mb-2 block uppercase">{node.period}</span>
                    <h4 className="text-xl font-bold mb-2">{node.role}</h4>
                    <p className="text-on-surface-variant text-sm">{node.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="relative md:flex md:justify-center items-center w-full pt-10">
              <div className="absolute left-0 md:left-1/2 w-8 h-8 rounded-full primary-gradient -translate-x-1/2 z-10 animate-pulse flex items-center justify-center shadow-[0_0_20px_rgba(115,177,255,0.6)]">
                <span className="material-symbols-outlined text-on-primary-fixed text-sm">star</span>
              </div>
              <div className="pl-12 md:pl-0 md:mt-20 text-center glass-panel md:bg-transparent rounded-xl p-4 md:p-0">
                <h4 className="text-2xl font-black text-white italic tracking-tight">The Frontier: Neural Infrastructure & Edge Computing</h4>
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Contact */}
        <section className="py-32 px-6 relative" id="contact">
          <div className="absolute inset-0 bg-surface-dim/70 backdrop-blur-xl -z-10 border-t border-white/5"></div>
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-sm font-bold tracking-[0.2em] text-primary uppercase mb-4 drop-shadow-sm">Connect</h2>
              <div className="text-5xl font-black tracking-tighter text-white font-headline drop-shadow-lg">Initiate Protocol</div>
            </div>
            
            <div className="glass-panel p-8 md:p-12 rounded-2xl border border-outline-variant/20 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
              <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-on-surface-variant uppercase ml-1">Identity</label>
                    <input className="w-full bg-surface-container-lowest/80 border border-outline-variant/20 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600" placeholder="Full Name" type="text"/>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black tracking-widest text-on-surface-variant uppercase ml-1">Frequency</label>
                    <input className="w-full bg-surface-container-lowest/80 border border-outline-variant/20 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600" placeholder="Email Address" type="email"/>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black tracking-widest text-on-surface-variant uppercase ml-1">Message Transmission</label>
                  <textarea className="w-full bg-surface-container-lowest/80 border border-outline-variant/20 rounded-xl p-4 text-white focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-zinc-600 resize-none" placeholder="Briefly describe your architectural requirements..." rows={4}></textarea>
                </div>
                <button className="w-full py-5 rounded-xl primary-gradient text-on-primary-fixed font-black text-lg tracking-widest uppercase shadow-[0_10px_20px_-5px_rgba(115,177,255,0.4)] hover:brightness-110 active:scale-[0.98] transition-all" type="submit">
                  Send Transmission
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="relative bg-zinc-950/90 backdrop-blur-md w-full py-12 px-6 border-t border-outline-variant/20 z-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-7xl mx-auto">
          <div className="text-lg font-bold text-white tracking-tighter font-headline">ENGINEER.CX</div>
          <div className="flex gap-8 font-label uppercase tracking-[0.05em] text-[10px] text-zinc-500">
            <a className="hover:text-primary transition-colors" href="#">GITHUB</a>
            <a className="hover:text-primary transition-colors" href="#">LINKEDIN</a>
            <a className="hover:text-primary transition-colors" href="#">RESUME</a>
            <a className="hover:text-primary transition-colors" href="#">TWITTER</a>
          </div>
          <div className="font-label uppercase tracking-[0.05em] text-[10px] text-zinc-500">
            © 2026 OBSIDIAN PERFORMANCE. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}
