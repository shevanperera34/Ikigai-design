// src/sections/Home.tsx
import React from "react";
import { Hero } from "./Hero";

/* =====================
   TYPES
===================== */
type ServicePillar = {
  title: string;
  subtitle: string;
  points: string[];
};

type Project = {
  label: string;
  name: string;
  blurb: string;
};

type TeamKey = "Shevan" | "Seni" | "Slade";

type TeamMember = {
  key: TeamKey;
  name: string;
  role: string;
  imageUrl: string;
  imgClass?: string;
  bio: string;
  instagram?: string;
};

/* =====================
   ASSETS
===================== */
import shevanprofile from "../assets/ProfilePic_Shevan.png";
import seniprofile from "../assets/Seni_picintro.jpeg";
import sladeIntro from "../assets/slade_pic_intro_1.jpeg";

/* =====================
   DATA
===================== */
const TEAM: TeamMember[] = [
  {
    key: "Shevan",
    name: "Shevan",
    role: "Marketing and Strategy",
    imageUrl: shevanprofile,
    bio:
      "Creative lead focused on brand systems, campaigns, and content that converts.",
    instagram: "https://www.instagram.com/sh3van.n",
  },
  {
    key: "Seni",
    name: "Seni",
    role: "IT and Strategy",
    imageUrl: seniprofile,
    bio:
      "Systems & infrastructure. Builds automation, security, and performance.",
    instagram: "https://www.instagram.com/seniii.r",
  },
  {
    key: "Slade",
    name: "Slade",
    role: "Client Relations and Strategy",
    imageUrl: sladeIntro,
    bio:
      "Client growth, outreach, and partnerships that last.",
    instagram: "https://www.instagram.com/slxde.xx",
  },
];

const servicePillars: ServicePillar[] = [
  {
    title: "Brand Systems",
    subtitle: "Make you recognizable.",
    points: ["Identity", "Messaging", "Visual direction"],
  },
  {
    title: "Web Infrastructure",
    subtitle: "Make you findable.",
    points: ["Websites", "Integrations", "Performance"],
  },
  {
    title: "Growth Architecture",
    subtitle: "Make you scalable.",
    points: ["Funnels", "Content", "Analytics"],
  },
];

const featuredProjects: Project[] = [
  {
    label: "Digital Systems",
    name: "Zuma Blinds",
    blurb: "Premium blinds site with 3D visuals.",
  },
  {
    label: "Digital Systems",
    name: "QuickTread",
    blurb: "Fast-quote tire experience.",
  },
  {
    label: "Creative Strategy",
    name: "Barber Campaign",
    blurb: "Brand + visuals + offer stack.",
  },
];

/* =====================
   TEAM CARD
===================== */
function TeamTile({ member }: { member: TeamMember }) {
  return (
    <div className="max-w-[18rem] rounded-2xl border border-white/15 bg-white/5 p-4 backdrop-blur-md
                    shadow-[0_20px_80px_rgba(0,0,0,0.35)]">
      <div className="aspect-[3/4] rounded-xl overflow-hidden">
        <img src={member.imageUrl} className="w-full h-full object-cover" />
      </div>
      <h3 className="mt-3 text-lg font-semibold text-white text-center">{member.name}</h3>
      <p className="text-xs text-white/70 text-center">{member.role}</p>
      <p className="mt-2 text-[11px] text-white/70 text-center">{member.bio}</p>
    </div>
  );
}

/* =====================
   PAGE
===================== */
export default function Home() {
  return (
    <main className="bg-[#050712] text-slate-100 overflow-x-hidden">
      {/* HERO — untouched */}
      <Hero />

      {/* ABOUT */}
      <section id="about" className="mt-32 px-6 max-w-6xl mx-auto text-center">
        <h2 className="text-3xl tracking-widest uppercase">Who We Are</h2>
        <p className="mt-4 text-slate-300 max-w-3xl mx-auto">
          We’re The Ikigai Project blending creative marketing with technical execution.
          No buzzwords. Just systems that work.
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {TEAM.map((m) => (
            <TeamTile key={m.key} member={m} />
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="mt-32 px-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8">
          {servicePillars.map((s) => (
            <div key={s.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <h3 className="uppercase tracking-widest text-sm">{s.title}</h3>
              <p className="mt-2 text-slate-300">{s.subtitle}</p>
              <ul className="mt-3 text-xs text-slate-400 space-y-1">
                {s.points.map((p) => <li key={p}>• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mt-32 px-6 max-w-6xl mx-auto">
        <h2 className="text-center text-3xl tracking-widest uppercase">Our Work</h2>
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {featuredProjects.map((p) => (
            <div key={p.name} className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase text-slate-400">{p.label}</p>
              <h3 className="mt-2 text-lg">{p.name}</h3>
              <p className="mt-1 text-sm text-slate-400">{p.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-32 px-6 pb-32 max-w-4xl mx-auto text-center">
        <h2 className="text-3xl tracking-widest uppercase">Let’s Build</h2>
        <p className="mt-4 text-slate-300">
          Tell us what you’re building. We’ll help align it.
        </p>
      </section>
    </main>
  );
}

