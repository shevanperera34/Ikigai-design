// src/sections/Home.tsx
import { useEffect } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { Hero } from "./Hero";
import ServicesPreview from "../components/ServicesPreview";
import WorkPreview from "../components/WorkPreview";
import ContactPreview from "../components/ContactPreview";




/* =====================
   TYPES
===================== */
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
    imgClass: "object-top",
    bio: "Creative lead focused on brand systems, campaigns, and content that converts.",
    instagram: "https://www.instagram.com/sh3van.n",
  },
  {
    key: "Seni",
    name: "Seni",
    role: "IT and Strategy",
    imageUrl: seniprofile,
    imgClass: "object-center",
    bio: "Systems & infrastructure. Builds automation, security, and performance.",
    instagram: "https://www.instagram.com/seniii.r",
  },
  {
    key: "Slade",
    name: "Slade",
    role: "Client Relations and Strategy",
    imageUrl: sladeIntro,
    imgClass: "object-center",
    bio: "Client growth, outreach, and partnerships that last.",
    instagram: "https://www.instagram.com/slxde.xx",
  },
];

/* =====================
   SHARED HOME TITLE STYLE
   (matches Services page vibe)
===================== */
const HOME_TITLE =
  "font-[Space_Grotesk] uppercase tracking-widest text-3xl sm:text-4xl md:text-5xl";

/* =====================
   TEAM TILE (Home)
===================== */
function TeamTile({ member }: { member: TeamMember }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/about")}
      className="group relative w-full max-w-[19rem] overflow-hidden rounded-2xl border border-white/15 backdrop-blur-md
                 shadow-[0_20px_80px_rgba(0,0,0,0.35)] transition-transform duration-300 transform-gpu
                 hover:-translate-y-1 hover:scale-[1.03]
                 hover:shadow-[0_30px_120px_rgba(0,0,0,0.45)] text-left"
      style={{
        background:
          "linear-gradient(180deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.05) 100%)",
      }}
      aria-label={`Go to About page (team) from ${member.name}`}
    >
      {/* subtle brand wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(90% 70% at -10% -10%, rgba(0,51,255,0.10), transparent 60%), radial-gradient(90% 70% at 110% -10%, rgba(108,0,255,0.10), transparent 60%)",
        }}
      />

      <div className="relative p-3">
        <div className="rounded-xl overflow-hidden ring-1 ring-white/20 bg-white/[0.06]">
          <div className="aspect-[3/4] w-full">
            <img
              src={member.imageUrl}
              alt={member.name}
              className={`h-full w-full object-cover ${member.imgClass ?? ""}`}
            />
          </div>
        </div>

        <div className="mt-3 text-center">
          {/* title font applied here too */}
          <h3 className="font-[Space_Grotesk] uppercase tracking-widest text-lg text-white">
            {member.name}
          </h3>
          <div className="mt-1 inline-flex items-center rounded-full border border-white/20 bg-white/[0.06] px-3 py-1 text-[11px] text-white/85">
            {member.role}
          </div>
        </div>

        <p className="mt-3 px-2 pb-1 text-[11px] leading-relaxed text-white/70 text-center">
          {member.bio}
        </p>

        <div className="mt-3 flex items-center justify-center">
          <span className="text-[10px] text-white/55 transition group-hover:text-white/80">
            View full team →
          </span>
        </div>
      </div>
    </button>
  );
}

/* =====================
   PAGE
===================== */
export default function Home() {
useEffect(() => {
  api.health()
    .then((r) => console.log("API health:", r))
    .catch((e) => console.error("API health failed:", e));
}, []);

  return (
    <main className="bg-[#050712] text-slate-100 overflow-x-hidden">
      {/* HERO — untouched */}
      <Hero />

      {/* SERVICES */}
      <section id="services" className="mt-32">
        <ServicesPreview />
      </section>

      {/* ABOUT */}
      <section id="about" className="mt-32 px-6 max-w-6xl mx-auto text-center">
        <h2 className={HOME_TITLE}>Who We Are</h2>
        <p className="mt-4 text-slate-300 max-w-3xl mx-auto">
          We’re The Ikigai Project. We design systems that give brands clarity, confidence, and the power to move decisively
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {TEAM.map((m) => (
            <TeamTile key={m.key} member={m} />
          ))}
        </div>
      </section>

      {/* WORK */}
      <section id="work" className="mt-32">
        <WorkPreview />
      </section>

      {/* CONTACT */}
      <section id="contact" className="mt-32 pb-32">
        <ContactPreview />
      </section>
    </main>
  );
}

