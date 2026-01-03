// src/sections/Home.tsx
import { useEffect } from "react";
import { api } from "../lib/api";
import { useNavigate } from "react-router-dom";
import { Hero } from "./Hero";
import ServicesPreview from "../components/ServicesPreview";
import WorkPreview from "../components/WorkPreview";
import ContactPreview from "../components/ContactPreview";
import SEO from "../components/SEO";
import SEOText from "../components/SEOText";

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
  x?: string;        // ✅ add
  linkedin?: string; // ✅ add
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
    x: "https://x.com/PereraShevan", 
    linkedin: "https://www.linkedin.com/in/shevan-p-b62922242/",
  },
  {
    key: "Seni",
    name: "Seni",
    role: "IT and Strategy",
    imageUrl: seniprofile,
    imgClass: "object-center",
    bio: "Systems & infrastructure. Builds automation, security, and performance.",
    instagram: "https://www.instagram.com/seniii.r",
    x: "https://x.com/seniii_r", 
    linkedin: "https://www.linkedin.com/in/seni/", 
  },
  {
    key: "Slade",
    name: "Slade",
    role: "Client Relations and Strategy",
    imageUrl: sladeIntro,
    imgClass: "object-center",
    bio: "Client growth, outreach, and partnerships that last.",
    instagram: "https://www.instagram.com/slxde.xx",
    x: "https://x.com/yourhandle", 
    linkedin: "https://www.linkedin.com/in/afolabi-akinlolu-bb461735a/", 
  },
];

/* =====================
   SHARED HOME TITLE STYLE
===================== */
const HOME_TITLE =
  "font-[Space_Grotesk] uppercase tracking-widest text-3xl sm:text-4xl md:text-5xl";

/* =====================
   SOCIAL ICONS (inline SVG)
===================== */
function IconX(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M18.9 2H22l-6.8 7.8L23 22h-6.5l-5.1-7.5L4.9 22H2l7.4-8.4L1 2h6.6l4.6 6.8L18.9 2Zm-1.1 18h1.7L7.1 3.9H5.3L17.8 20Z" />
    </svg>
  );
}

function IconLinkedIn(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" {...props}>
      <path d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 8.5H4.5V23.5H.5V8.5ZM8.5 8.5H12.3V10.6H12.35C12.88 9.6 14.18 8.5 16.12 8.5C20.12 8.5 20.9 11.1 20.9 14.5V23.5H16.9V15.5C16.9 13.6 16.86 11.2 14.28 11.2C11.66 11.2 11.26 13.2 11.26 15.4V23.5H7.26V8.5H8.5Z" />
    </svg>
  );
}

function IconInstagram(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 256 256"
      aria-hidden="true"
      fill="currentColor"
      {...props}
    >
      <path d="M127.999746,23.06353 C162.177385,23.06353 166.225393,23.1936027 179.722476,23.8094161 C192.20235,24.3789926 198.979853,26.4642218 203.490736,28.2166477 C209.464938,30.5386501 213.729395,33.3128586 218.208268,37.7917319 C222.687141,42.2706052 225.46135,46.5350617 227.782844,52.5092638 C229.535778,57.0201472 231.621007,63.7976504 232.190584,76.277016 C232.806397,89.7746075 232.93647,93.8226147 232.93647,128.000254 C232.93647,162.177893 232.806397,166.225901 232.190584,179.722984 C231.621007,192.202858 229.535778,198.980361 227.782844,203.491244 C225.46135,209.465446 222.687141,213.729903 218.208268,218.208776 C213.729395,222.687649 209.464938,225.461858 203.490736,227.783352 C198.979853,229.536286 192.20235,231.621516 179.722476,232.191092 C166.227425,232.806905 162.179418,232.936978 127.999746,232.936978 C93.8200742,232.936978 89.772067,232.806905 76.277016,232.191092 C63.7971424,231.621516 57.0196391,229.536286 52.5092638,227.783352 C46.5345536,225.461858 42.2700971,222.687649 37.7912238,218.208776 C33.3123505,213.729903 30.538142,209.465446 28.2166477,203.491244 C26.4637138,198.980361 24.3784845,192.202858 23.808908,179.723492 C23.1930946,166.225901 23.0630219,162.177893 23.0630219,128.000254 C23.0630219,93.8226147 23.1930946,89.7746075 23.808908,76.2775241 C24.3784845,63.7976504 26.4637138,57.0201472 28.2166477,52.5092638 C30.538142,46.5350617 33.3123505,42.2706052 37.7912238,37.7917319 C42.2700971,33.3128586 46.5345536,30.5386501 52.5092638,28.2166477 C57.0196391,26.4642218 63.7971424,24.3789926 76.2765079,23.8094161 C89.7740994,23.1936027 93.8221066,23.06353 127.999746,23.06353 M127.999746,0 C93.2367791,0 88.8783247,0.147348072 75.2257637,0.770274749 C61.601148,1.39218523 52.2968794,3.55566141 44.1546281,6.72008828 C35.7374966,9.99121548 28.5992446,14.3679613 21.4833489,21.483857 C14.3674532,28.5997527 9.99070739,35.7380046 6.71958019,44.1551362 C3.55515331,52.2973875 1.39167714,61.6016561 0.769766653,75.2262718 C0.146839975,88.8783247 0,93.2372872 0,128.000254 C0,162.763221 0.146839975,167.122183 0.769766653,180.774236 C1.39167714,194.398852 3.55515331,203.703121 6.71958019,211.845372 C9.99070739,220.261995 14.3674532,227.400755 21.4833489,234.516651 C28.5992446,241.632547 35.7374966,246.009293 44.1546281,249.28042 C52.2968794,252.444847 61.601148,254.608323 75.2257637,255.230233 C88.8783247,255.85316 93.2367791,256 127.999746,256 C162.762713,256 167.121675,255.85316 180.773728,255.230233 C194.398344,254.608323 203.702613,252.444847 211.844864,249.28042 C220.261995,246.009293 227.400247,241.632547 234.516143,234.516651 C241.632039,227.400755 246.008785,220.262503 249.279912,211.845372 C252.444339,203.703121 254.607815,194.398852 255.229725,180.774236 C255.852652,167.122183 256,162.763221 256,128.000254 C256,93.2372872 255.852652,88.8783247 255.229725,75.2262718 C254.607815,61.6016561 252.444339,52.2973875 249.279912,44.1551362 C246.008785,35.7380046 241.632039,28.5997527 234.516143,21.483857 C227.400247,14.3679613 220.261995,9.99121548 211.844864,6.72008828 C203.702613,3.55566141 194.398344,1.39218523 180.773728,0.770274749 C167.121675,0.147348072 162.762713,0 127.999746,0 Z M127.999746,62.2703115 C91.698262,62.2703115 62.2698034,91.69877 62.2698034,128.000254 C62.2698034,164.301738 91.698262,193.730197 127.999746,193.730197 C164.30123,193.730197 193.729689,164.301738 193.729689,128.000254 C193.729689,91.69877 164.30123,62.2703115 127.999746,62.2703115 Z M127.999746,170.667175 C104.435741,170.667175 85.3328252,151.564259 85.3328252,128.000254 C85.3328252,104.436249 104.435741,85.3333333 127.999746,85.3333333 C151.563751,85.3333333 170.666667,104.436249 170.666667,128.000254 C170.666667,151.564259 151.563751,170.667175 127.999746,170.667175 Z M211.686338,59.6734287 C211.686338,68.1566129 204.809755,75.0337031 196.326571,75.0337031 C187.843387,75.0337031 180.966297,68.1566129 180.966297,59.6734287 C180.966297,51.1902445 187.843387,44.3136624 196.326571,44.3136624 C204.809755,44.3136624 211.686338,51.1902445 211.686338,59.6734287 Z" />
    </svg>
  );
}

/* =====================
   TEAM TILE (Home)
===================== */
function TeamTile({ member }: { member: TeamMember }) {
  const navigate = useNavigate();

  // Stops card navigation when clicking social links
  const stopCardClick: React.MouseEventHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const SocialLink = ({
    href,
    label,
    children,
  }: {
    href?: string;
    label: string;
    children: React.ReactNode;
  }) => {
    if (!href) return null;

    return (
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        aria-label={`${member.name} on ${label}`}
        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/[0.06]
                   p-2 text-white/75 transition hover:text-white hover:border-white/35 hover:bg-white/[0.10]"
      >
        {children}
      </a>
    );
  };

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

        {/* ✅ socials row */}
        <div className="mt-3 flex items-center justify-center gap-2">
          <SocialLink href={member.instagram} label="Instagram">
    <IconInstagram className="h-4 w-4" />
  </SocialLink>

          <SocialLink href={member.x} label="X">
            <IconX className="h-4 w-4" />
          </SocialLink>

          <SocialLink href={member.linkedin} label="LinkedIn">
            <IconLinkedIn className="h-4 w-4" />
          </SocialLink>
        </div>

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

  return (
    <main className="bg-[#050712] text-slate-100 overflow-x-hidden">
       <SEO
        title="The Ikigai Project | Brand Systems, Web Infrastructure & Growth Architecture"
        description="A human-first digital studio building brand systems, intelligent websites, and growth architecture for companies that want clarity, speed, and real results."
        path="/"
      />
       <SEOText page="home" />
      <Hero />

      <section id="services" className="mt-32">
        <ServicesPreview />
      </section>

      <section id="about" className="mt-32 px-6 max-w-6xl mx-auto text-center">
        <h2 className={HOME_TITLE}>Who We Are</h2>
        <p className="mt-4 text-slate-300 max-w-3xl mx-auto">
          We’re The Ikigai Project. We design systems that give brands clarity,
          confidence, and the power to move decisively
        </p>

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 justify-items-center">
          {TEAM.map((m) => (
            <TeamTile key={m.key} member={m} />
          ))}
        </div>
      </section>

      <section id="work" className="mt-32">
        <WorkPreview />
      </section>

      <section id="contact" className="mt-32 pb-32">
        <ContactPreview />
      </section>
    </main>
  );
}
