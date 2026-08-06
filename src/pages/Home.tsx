import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Zap, Brain, Eye, Target, Users, Puzzle,
  BookOpen, FileText, Play, Download,
  Mail,
} from 'lucide-react';
import logoWhite from '../assets/clankr-logo-white.png';
import marcusSprite from '../assets/marcus-sprite.png';
import elenaSprite from '../assets/elena-sprite.png';
import oldTomSprite from '../assets/oldtom-sprite.png';
import townScene from '../assets/town-scene.jpg';
import Contact from './Contact';

/* ─── Animated NPC Pipeline ──────────────────────────────────── */
const PIPELINE_STEPS = [
  { icon: Eye,    label: 'Perceive',  desc: 'Senses the world',        color: '#22d3ee' },
  { icon: Brain,  label: 'Remember',  desc: 'Recalls past experience',  color: '#818cf8' },
  { icon: Target, label: 'Plan',      desc: 'Forms goals & steps',      color: '#f472b6' },
  { icon: Zap,    label: 'Act',       desc: 'Executes autonomously',    color: '#4ade80' },
];

function Pipeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setActive(p => (p + 1) % PIPELINE_STEPS.length), 1400);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative">
      {/* Connecting line */}
      <div className="absolute top-10 left-[12.5%] right-[12.5%] h-px hidden md:block"
        style={{ background: 'rgba(255,255,255,0.06)' }} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {PIPELINE_STEPS.map((step, i) => {
          const Icon = step.icon;
          const isActive = active === i;
          return (
            <div
              key={step.label}
              className="flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-500 cursor-default"
              style={{
                background: isActive ? `${step.color}12` : 'rgba(255,255,255,0.02)',
                border: `1px solid ${isActive ? step.color + '40' : 'rgba(255,255,255,0.06)'}`,
                boxShadow: isActive ? `0 0 30px ${step.color}18` : 'none',
                transform: isActive ? 'translateY(-4px)' : 'none',
              }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-500"
                style={{
                  background: isActive ? `${step.color}20` : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${isActive ? step.color + '50' : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                <Icon size={20} style={{ color: isActive ? step.color : '#4b5563' }} />
              </div>
              <div className="text-center">
                <div className="text-sm font-semibold text-white mb-0.5">{step.label}</div>
                <div className="text-xs text-gray-500">{step.desc}</div>
              </div>
              {i < PIPELINE_STEPS.length - 1 && (
                <div className="absolute hidden md:block" style={{
                  right: '-12px', top: '40px',
                  width: '24px', height: '1px',
                  background: isActive ? PIPELINE_STEPS[i].color : 'transparent',
                  transition: 'background 0.5s',
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Stats strip ────────────────────────────────────────────── */
const STATS = [
  { value: '3',   unit: 'min',  label: 'to author your first NPC' },
  { value: '100', unit: '%',    label: 'autonomous decision making' },
  { value: '∞',   unit: '',     label: 'unique playthroughs' },
  { value: 'Any', unit: '',     label: 'LLM provider supported' },
];

function CountUp({ target }: { target: string }) {
  const [display, setDisplay] = useState(target);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const num = parseInt(target);
    if (isNaN(num)) { setDisplay(target); return; }

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started.current) {
        started.current = true;
        let start = 0;
        setDisplay('0');
        const step = Math.ceil(num / 30);
        const t = setInterval(() => {
          start = Math.min(start + step, num);
          setDisplay(String(start));
          if (start >= num) clearInterval(t);
        }, 40);
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{display}</span>;
}

/* ─── Doc card ───────────────────────────────────────────────── */
function DocCard({ icon, title, description, href, badge }: {
  icon: React.ReactNode; title: string; description: string; href: string; badge?: string;
}) {
  return (
    <Link to={href} className="glass-card rounded-xl p-5 flex items-start gap-4 transition-all duration-200 group">
      <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: 'rgba(6,182,212,0.12)', border: '1px solid rgba(6,182,212,0.2)' }}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white font-semibold text-sm group-hover:text-cyan-300 transition-colors">{title}</span>
          {badge && (
            <span className="text-xs px-2 py-0.5 rounded-full font-medium"
              style={{ background: 'rgba(74,222,128,0.15)', color: '#4ade80', border: '1px solid rgba(74,222,128,0.3)' }}>
              {badge}
            </span>
          )}
        </div>
        <p className="text-gray-500 text-xs leading-relaxed">{description}</p>
      </div>
      <ArrowRight size={14} className="text-gray-600 group-hover:text-cyan-400 transition-colors shrink-0 mt-0.5" />
    </Link>
  );
}

/* ─── NPC Card Panel ─────────────────────────────────────────── */
/* Pixel-scene backdrops for the mission section — each NPC staged in the setting their role implies. */
const NPCS = [
  {
    name: 'Marcus',
    role: 'Town Guard',
    color: '#22d3ee',
    spriteImg: marcusSprite,
    thought: '"That merchant is selling silk 40% below market rate. Could be stolen goods — I should investigate."',
    goal: 'Maintain market security',
    memories: ['Assisted player in arrest (2 days ago)', 'Unusual price drop at stall #7 (1h ago)'],
    action: 'InvestigateTarget(stall_7)',
  },
  {
    name: 'Elena',
    role: 'Silk Merchant',
    color: '#4ade80',
    spriteImg: elenaSprite,
    thought: '"Festival in 3 days. If I undercut Aldric now, I can capture his regulars before he restocks."',
    goal: 'Maximize festival profits',
    memories: ['Aldric restocked yesterday', 'Festival crowd +40% expected (3 days)'],
    action: 'AdjustPrices(silk, -15%)',
  },
  {
    name: 'Old Tom',
    role: 'Tavern Keeper',
    color: '#a78bfa',
    spriteImg: oldTomSprite,
    thought: '"The guard\'s watching that merchant closely. Something\'s brewing. Regulars will want to hear about this."',
    goal: 'Gather useful information',
    memories: ['Overheard bandit rumor this morning', 'Guard noticed suspicious merchant (now)'],
    action: 'ObserveNearby(market_square)',
  },
];

/* ─── Town scene ─────────────────────────────────────────────── */
function TownScene() {
  return (
    <div className="rounded-xl overflow-hidden text-left" style={{ background: '#0a0f1e', border: '1px solid rgba(255,255,255,0.08)' }}>
      {/* Scene bar */}
      <div className="flex items-center gap-1.5 px-4 py-3" style={{ background: 'rgba(255,255,255,0.03)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <span className="w-3 h-3 rounded-full bg-red-500/60" />
        <span className="w-3 h-3 rounded-full bg-yellow-500/60" />
        <span className="w-3 h-3 rounded-full bg-green-500/60" />
        <span className="ml-2 text-xs text-gray-600">clankr_town.scene</span>
      </div>
      <img
        src={townScene}
        alt="Marcus, Elena, and Old Tom in the town square, each with a thought bubble showing what they're reasoning about"
        className="w-full h-auto block"
      />
    </div>
  );
}

function NPCPanel() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(p => (p + 1) % NPCS.length);
        setVisible(true);
      }, 350);
    }, 4000);
    return () => clearInterval(t);
  }, []);

  const npc = NPCS[idx];
  const prev = NPCS[(idx + NPCS.length - 1) % NPCS.length];
  const prev2 = NPCS[(idx + NPCS.length - 2) % NPCS.length];

  const cardBase: React.CSSProperties = {
    background: 'rgba(8, 13, 26, 0.9)',
    backdropFilter: 'blur(12px)',
    borderRadius: '14px',
    fontFamily: 'inherit',
  };

  return (
    <div className="relative w-full max-w-[340px] mx-auto" style={{ height: '340px' }}>
      {/* Ghost card 2 (furthest back) */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ ...cardBase, border: `1px solid ${prev2.color}18`, transform: 'rotate(4deg) translateY(12px) scale(0.93)', opacity: 0.35 }} />
      {/* Ghost card 1 */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ ...cardBase, border: `1px solid ${prev.color}25`, transform: 'rotate(2deg) translateY(6px) scale(0.96)', opacity: 0.55 }} />

      {/* Main card */}
      <div className="absolute inset-0 flex flex-col transition-opacity duration-300"
        style={{ ...cardBase, border: `1px solid ${npc.color}35`, opacity: visible ? 1 : 0, boxShadow: `0 0 40px ${npc.color}10, 0 20px 60px rgba(0,0,0,0.5)` }}>

        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3" style={{ borderBottom: `1px solid ${npc.color}18` }}>
          <div className="flex items-center gap-2.5">
            <img src={npc.spriteImg} alt={npc.name} className="w-12 h-12 rounded-md object-cover" />
            <div>
              <div className="text-white font-semibold text-sm leading-none">{npc.name}</div>
              <div className="text-xs mt-0.5" style={{ color: npc.color + 'aa' }}>{npc.role}</div>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-xs font-medium" style={{ color: '#4ade80' }}>
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            ACTIVE
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 flex flex-col gap-3 px-4 py-3 overflow-hidden">
          {/* Thought */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: npc.color + '99' }}>
              💭 Thinking
            </div>
            <p className="text-gray-300 text-xs leading-relaxed italic">{npc.thought}</p>
          </div>

          {/* Goal */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: npc.color + '99' }}>
              🎯 Current Goal
            </div>
            <div className="text-white text-xs font-medium">{npc.goal}</div>
          </div>

          {/* Memory */}
          <div>
            <div className="text-xs font-semibold uppercase tracking-wider mb-1.5" style={{ color: npc.color + '99' }}>
              🧠 Memory
            </div>
            <div className="space-y-1">
              {npc.memories.map(m => (
                <div key={m} className="flex items-start gap-1.5 text-xs text-gray-400">
                  <span className="mt-1.5 w-1 h-1 rounded-full shrink-0" style={{ background: npc.color }} />
                  {m}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer — action */}
        <div className="px-4 py-2.5 rounded-b-[14px]" style={{ background: `${npc.color}08`, borderTop: `1px solid ${npc.color}15` }}>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold" style={{ color: npc.color + '80' }}>⚡ Action</span>
            <code className="text-xs font-mono" style={{ color: npc.color }}>{npc.action}</code>
          </div>
        </div>
      </div>

      {/* NPC counter dots */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5">
        {NPCS.map((_, i) => (
          <button key={i} onClick={() => { setVisible(false); setTimeout(() => { setIdx(i); setVisible(true); }, 200); }}
            className="w-1.5 h-1.5 rounded-full transition-all duration-300"
            style={{ background: i === idx ? NPCS[i].color : 'rgba(255,255,255,0.15)', transform: i === idx ? 'scale(1.3)' : 'scale(1)' }} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <div className="overflow-x-clip">
      {/* Dot grid */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.04) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }} />

      {/* ══ HERO ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden pt-24 pb-20">
        <div className="orb absolute w-[500px] h-[500px] -top-20 right-0 opacity-20 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.6) 0%, transparent 70%)' }} />
        <div className="orb absolute w-[350px] h-[350px] bottom-10 left-0 opacity-12 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div className="space-y-7">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight tracking-tight">
                  Humanlike behavior for the next generation
                  {' '}
                  <span
                    className="mt-1 block"
                    style={{ color: '#4ade80', textShadow: '0 0 40px rgba(74,222,128,0.3)' }}
                  >
                    of game NPCs
                  </span>
                </h1>
              </div>

              <p className="text-lg text-gray-400 max-w-lg">
                Give your NPCs memory, perception, and goals, making every playthrough more immersive and unique.
              </p>

              <div className="flex flex-wrap gap-3">
                <Link to="/download"
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
                  style={{ background: '#06b6d4', color: '#04080f' }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#22d3ee')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#06b6d4')}>
                  <Download size={15} /> Download for Unreal Engine
                </Link>
                <a href="#demo" onClick={e => { e.preventDefault(); document.getElementById('demo')?.scrollIntoView({ behavior: 'smooth' }); }}
                  className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.12)', color: 'white' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}>
                  Watch Demo <ArrowRight size={15} />
                </a>
              </div>
            </div>

            {/* Right */}
            <div className="flex items-center justify-center lg:justify-end pb-8">
              <NPCPanel />
            </div>
          </div>
        </div>
      </section>

      {/* ══ DEMO VIDEO ════════════════════════════════════════════ */}
      <section id="demo" className="relative py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="orb absolute w-[500px] h-[300px] top-0 left-1/4 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse, rgba(139,92,246,0.5) 0%, transparent 70%)' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">See it live</span>
            <h2 className="text-3xl font-bold text-white mt-2">Watch NPCs think for themselves</h2>
          </div>
          <div className="rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 0 60px rgba(6,182,212,0.07)' }}>
            <div className="relative pb-[56.25%] h-0">
              <iframe src="https://www.youtube.com/embed/ANQRXpAMjt4" title="Clankr Demo"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen />
            </div>
          </div>
        </div>
      </section>

      {/* ══ MISSION ═══════════════════════════════════════════════ */}
      <section id="about" className="relative py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs text-purple-400 font-semibold tracking-widest uppercase">What drives us</span>
              <h2 className="text-3xl font-bold text-white mt-2 mb-5">We dreamed of NPCs with real agency</h2>
              <p className="text-gray-400 leading-relaxed">
                Growing up with classic games like Mario, Pokémon, Skyrim, and Dark Souls, we always thought NPCs would become more intelligent and evolve beyond merely repeating the same dialogue in loops. We imagined a knight who remembers your battles together, a merchant who reacts to market shifts, and characters with plans and agency of their own-a world that feels genuinely alive. This is the vision we're building.
              </p>
              <div className="mt-6 flex flex-col gap-3">
                {['Merchants who adapt to market changes', 'Guards who remember past encounters', 'Villagers with their own agendas'].map(t => (
                  <div key={t} className="flex items-center gap-2.5 text-sm text-gray-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                    {t}
                  </div>
                ))}
              </div>
            </div>
            <TownScene />
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════ */}
      <section className="relative py-20 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="orb absolute w-[400px] h-[400px] top-0 right-1/4 opacity-10 pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.5) 0%, transparent 70%)' }} />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">How it works</span>
            <h2 className="text-3xl font-bold text-white mt-2">Every NPC runs its own AI loop</h2>
            <p className="text-gray-500 mt-3 max-w-lg mx-auto text-sm">
              Continuously cycling through perception, memory, planning, and action, in real time.
            </p>
          </div>
          <Pipeline />
        </div>
      </section>

      {/* ══ STATS ═════════════════════════════════════════════════ */}
      <section className="relative py-16 border-t border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map(s => (
              <div key={s.label} className="text-center">
                <div className="text-4xl font-bold text-white mb-1">
                  <CountUp target={s.value} /><span className="text-cyan-400">{s.unit}</span>
                </div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURES ══════════════════════════════════════════════ */}
      <section className="relative py-20 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-xs text-cyan-400 font-semibold tracking-widest uppercase">Capabilities</span>
            <h2 className="text-3xl font-bold text-white mt-2">Built for believable characters</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { Icon: Brain,  color: '#22d3ee', title: 'Long-term Memory',     desc: 'NPCs remember past events and let them shape personality over time.' },
              { Icon: Eye,    color: '#818cf8', title: 'Rich Perception',       desc: 'Sense and respond to environmental events in real time.' },
              { Icon: Target, color: '#f472b6', title: 'Goal & Planning',       desc: 'Form multi-step plans and pursue them autonomously.' },
              { Icon: Users,  color: '#fb923c', title: 'Social Intelligence',   desc: 'Build relationships, develop rivalries, and adapt socially.' },
              { Icon: Puzzle, color: '#4ade80', title: 'Modular & Extensible',  desc: 'Implement custom NPC actions in ordinary game code and describe them in natural language.' },
              { Icon: Zap,    color: '#facc15', title: 'Engine Agnostic',       desc: 'Engine-agnostic backend designed for native engine adapters. Currently available for Unreal Engine.' },
            ].map(({ Icon, color, title, desc }) => (
              <div key={title}
                className="rounded-xl p-5 transition-all duration-200 group"
                style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.06)' }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = color + '35';
                  (e.currentTarget as HTMLElement).style.background = color + '08';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.06)';
                  (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.02)';
                }}
              >
                <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                  style={{ background: color + '15', border: `1px solid ${color}30` }}>
                  <Icon size={16} style={{ color }} />
                </div>
                <div className="text-sm font-semibold text-white mb-1">{title}</div>
                <div className="text-xs text-gray-500 leading-relaxed">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ DOCS HUB ══════════════════════════════════════════════ */}
      <section className="relative py-16 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 rounded flex items-center justify-center"
                style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}>
                <BookOpen size={12} className="text-cyan-400" />
              </div>
              <h2 className="text-base font-semibold text-white">Documentation Hub</h2>
            </div>
            <Link to="/docs/unrealengine" className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300 transition-colors">
              View all <ArrowRight size={12} />
            </Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            <DocCard icon={<Play size={16} className="text-cyan-400" />} title="Quick Start"
              description="Get up and running in minutes." href="/docs/unrealengine/quickstart" />
            <DocCard icon={<BookOpen size={16} className="text-cyan-400" />} title="UE Plugin Docs"
              description="Full API reference for the Unreal Engine plugin." href="/docs/unrealengine" />
            <DocCard icon={<FileText size={16} className="text-cyan-400" />} title="Changelog"
              description="What's new in every release." href="/docs/unrealengine/changelog" badge="Latest" />
          </div>
        </div>
      </section>

      {/* ══ CONTACT ═══════════════════════════════════════════════ */}
      <section id="contact" className="border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <Contact />
      </section>

      {/* ══ FOOTER ════════════════════════════════════════════════ */}
      <footer className="border-t py-14" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(4,8,15,0.6)' }}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
            <div className="col-span-2 md:col-span-1 space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: 'rgba(6,182,212,0.15)', border: '1px solid rgba(6,182,212,0.3)' }}>
                  <img src={logoWhite} alt="" className="w-4 h-4 object-contain" />
                </div>
                <span className="text-white font-semibold text-sm">Clankr Intelligence</span>
              </div>
              <p className="text-xs text-gray-600 max-w-xs">AI-powered NPCs for the next generation of games.</p>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Product</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><a href="#demo" onClick={e=>{e.preventDefault();document.getElementById('demo')?.scrollIntoView({behavior:'smooth'})}} className="hover:text-gray-300 transition-colors">Demo</a></li>
                <li><Link to="/docs/unrealengine/changelog" className="hover:text-gray-300 transition-colors">Changelog</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Resources</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><Link to="/docs/unrealengine" className="hover:text-gray-300 transition-colors">Documentation</Link></li>
                <li><Link to="/docs/unrealengine/quickstart" className="hover:text-gray-300 transition-colors">Quick Start</Link></li>
                <li><Link to="/docs/unrealengine/authoring-guide" className="hover:text-gray-300 transition-colors">Authoring Guide</Link></li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-widest">Company</h4>
              <ul className="space-y-2 text-xs text-gray-600">
                <li><a href="mailto:dli@clankrintelligence.com" className="flex items-center gap-1.5 hover:text-gray-300 transition-colors"><Mail size={10} /> Email us</a></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between gap-2 pt-6" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
            <p className="text-xs text-gray-700">© 2025 Clankr Intelligence. All rights reserved.</p>
            <p className="text-xs text-gray-700">Making NPCs feel alive.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
