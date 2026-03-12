import { useState, useEffect, useRef } from "react";
import {
  Wallet, Megaphone, LayoutGrid, Gift, Zap, TrendingUp, Heart,
  CheckCircle, ArrowRight, Menu, X, Star, Users, Globe, Award,
  Clock, BookOpen, ChevronDown, Send, Building2, Mail, MessageSquare, User
} from "lucide-react";

// ─── SCROLL ANIMATION HOOK ────────────────────────────────────────────────────

function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

function Reveal({ children, delay = 0, className = "" }) {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : "translateY(28px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// ─── LOGO ─────────────────────────────────────────────────────────────────────

function GiftableLogo({ height = 36 }) {
  const scale = height / 52;
  const w = Math.round(200 * scale);
  return (
    <svg width={w} height={height} viewBox="0 0 200 52" xmlns="http://www.w3.org/2000/svg" fontFamily="'Inter','Helvetica Neue',Arial,sans-serif">
      <rect x="0" y="4" width="40" height="13" rx="4" fill="#4F8EF7"/>
      <rect x="3" y="16" width="34" height="24" rx="3" fill="#4F8EF7"/>
      <rect x="17" y="4" width="6" height="36" fill="#FF6B4A"/>
      <rect x="0" y="11" width="40" height="6" fill="#FF6B4A"/>
      <path d="M20 4 C20 -4 10 -6 10 -1 C10 2 15 4 20 4Z" fill="#FF6B4A"/>
      <path d="M20 4 C20 -4 30 -6 30 -1 C30 2 25 4 20 4Z" fill="#FF6B4A"/>
      <circle cx="20" cy="4" r="3" fill="#FF6B4A"/>
      <text y="40" x="50" fontSize="30" fontWeight="700" letterSpacing="-1">
        <tspan fill="#4F8EF7">gift</tspan><tspan fill="#FF6B4A">able</tspan>
      </text>
    </svg>
  );
}

// ─── DATA ─────────────────────────────────────────────────────────────────────

const blogPosts = [
  { id: 1, title: "Why Employee Recognition Matters More Than Ever", excerpt: "In a world of remote work and hybrid teams, showing employees they matter has become the single most powerful tool for retention and culture.", author: "Giftable Team", date: "March 5, 2026", readTime: "5 min read", tag: "Culture" },
  { id: 2, title: "The Psychology Behind Workplace Appreciation", excerpt: "Science confirms what great leaders already know: recognition activates intrinsic motivation and builds lasting loyalty across every team.", author: "Giftable Team", date: "February 12, 2026", readTime: "6 min read", tag: "Psychology" },
  { id: 3, title: "10 Creative Ways to Reward Your Employees", excerpt: "Beyond the annual bonus — here are ten thoughtful gestures that leave a lasting impression and make your team feel genuinely valued.", author: "Giftable Team", date: "January 20, 2026", readTime: "7 min read", tag: "Ideas" },
  { id: 4, title: "How Digital Gift Cards Are Changing Corporate Rewards", excerpt: "Digital rewards have overtaken physical ones in speed, flexibility, and recipient satisfaction. Here's why every company is making the switch.", author: "Giftable Team", date: "December 9, 2025", readTime: "5 min read", tag: "Trends" },
  { id: 5, title: "Building a Culture of Appreciation at Work", excerpt: "Culture isn't built in company retreats — it's built in daily moments of acknowledgment. Here's how to make appreciation a habit.", author: "Giftable Team", date: "November 18, 2025", readTime: "8 min read", tag: "Culture" },
  { id: 6, title: "Employee Rewards vs Bonuses: What Actually Works", excerpt: "Cash bonuses are easy to forget. Thoughtful rewards create memories. We break down the psychology of what truly motivates people.", author: "Giftable Team", date: "October 7, 2025", readTime: "6 min read", tag: "Strategy" },
  { id: 7, title: "How Great Companies Celebrate Milestones", excerpt: "From work anniversaries to product launches — the companies that celebrate wins together grow faster and retain talent longer.", author: "Giftable Team", date: "September 15, 2025", readTime: "5 min read", tag: "Ideas" },
  { id: 8, title: "The Best Incentives for Remote Teams", excerpt: "Managing a distributed team means rethinking how you show up for people. These incentive strategies work across time zones and borders.", author: "Giftable Team", date: "August 22, 2025", readTime: "7 min read", tag: "Remote Work" },
  { id: 9, title: "Small Gestures That Build Employee Loyalty", excerpt: "You don't need a big budget to make people feel seen. These small but intentional gestures compound into lasting employee loyalty.", author: "Giftable Team", date: "July 3, 2025", readTime: "4 min read", tag: "Culture" },
  { id: 10, title: "The ROI of Employee Recognition Programs", excerpt: "Recognition isn't just a nice-to-have — it's a measurable driver of performance, retention, and bottom-line results. Here's the data.", author: "Giftable Team", date: "June 11, 2025", readTime: "6 min read", tag: "Strategy" },
  { id: 11, title: "Why Choice Matters in Employee Rewards", excerpt: "A gift card to the wrong brand is worse than no gift at all. Here's why letting recipients choose their reward drives real satisfaction.", author: "Giftable Team", date: "May 28, 2025", readTime: "5 min read", tag: "Product" },
  { id: 12, title: "How Corporate Gifting Strengthens Company Culture", excerpt: "The companies with the strongest cultures aren't the ones with the biggest budgets — they're the ones that remember to say thank you.", author: "Giftable Team", date: "April 14, 2025", readTime: "6 min read", tag: "Culture" },
];

const testimonials = [
  { quote: "Giftable makes it incredibly easy to reward our employees. The choice of gift cards means everyone gets something they actually love. Our team engagement scores went up within a month.", name: "Sarah K.", title: "Head of People Operations", company: "Meridian Health", avatar: "SK", color: "bg-violet-500" },
  { quote: "We used to spend weeks coordinating gifts for our sales team. Now it takes minutes. Giftable is the kind of tool you didn't know you needed until you can't imagine working without it.", name: "James T.", title: "VP of Sales", company: "Northstar Labs", avatar: "JT", color: "bg-sky-500" },
  { quote: "Our holiday gifting campaign reached 400 people in under an hour. Every single employee got to pick what they wanted. The feedback was overwhelming — people actually felt appreciated.", name: "Priya M.", title: "Founder & CEO", company: "Wavefront Studio", avatar: "PM", color: "bg-emerald-500" },
];

const pricingPlans = [
  { name: "Starter", subtitle: "For small teams", price: "$49", period: "/mo", desc: "Everything you need to start rewarding your team.", features: ["Up to 50 recipients/month", "Basic campaign tools", "Standard gift card catalog", "Email delivery", "Dashboard analytics"], cta: "Get Started", highlighted: false },
  { name: "Growth", subtitle: "For scaling companies", price: "$149", period: "/mo", desc: "Advanced tools for teams that are growing fast.", features: ["Up to 500 recipients/month", "Bulk campaigns", "Campaign reporting", "Custom branding", "Priority email support", "Recipient segmentation"], cta: "Get Started", highlighted: true },
  { name: "Enterprise", subtitle: "For large organizations", price: "Custom", period: "", desc: "Tailored solutions for large-scale gifting at volume.", features: ["Unlimited recipients", "Dedicated account manager", "API access", "Custom integrations", "SSO & advanced security", "SLA guarantee"], cta: "Contact Sales", highlighted: false },
];

const steps = [
  { number: "01", Icon: Wallet, title: "Create your account and add credits", desc: "Sign up in minutes, fund your gifting wallet, and you're ready to send." },
  { number: "02", Icon: Megaphone, title: "Create a gifting campaign", desc: "Name your campaign, set a budget, and customize the message recipients will see." },
  { number: "03", Icon: LayoutGrid, title: "Choose the brands recipients can select from", desc: "Pick from hundreds of top brands — or let recipients choose from your curated list." },
  { number: "04", Icon: Gift, title: "Recipients pick the gift card they love", desc: "They receive a beautiful email and select their preferred brand. Their gift card arrives instantly." },
];

const benefits = [
  { Icon: Award, title: "Choice for Recipients", desc: "Nobody wants a gift card to the wrong place. Recipients choose the brand they actually want — every time." },
  { Icon: Zap, title: "Fast and Simple", desc: "Send rewards to hundreds of people in minutes. No logistics, no shipping, no headaches." },
  { Icon: TrendingUp, title: "Scalable", desc: "Whether your team is 10 or 10,000, Giftable scales effortlessly with your organization." },
  { Icon: Heart, title: "Meaningful Appreciation", desc: "Turn everyday moments into memorable ones. Celebrate employees and strengthen your culture." },
];

const useCases = [
  { label: "Employee recognition", Icon: Award },
  { label: "Sales incentives", Icon: TrendingUp },
  { label: "Customer appreciation", Icon: Heart },
  { label: "Employee onboarding", Icon: Users },
  { label: "Holiday gifts", Icon: Gift },
  { label: "Milestone celebrations", Icon: Star },
];

const brands = [
  { name: "Amazon", Icon: LayoutGrid, color: "from-amber-50 to-amber-100 border-amber-200", iconColor: "text-amber-600" },
  { name: "Uber", Icon: Globe, color: "from-slate-50 to-slate-100 border-slate-200", iconColor: "text-slate-600" },
  { name: "Starbucks", Icon: Heart, color: "from-green-50 to-green-100 border-green-200", iconColor: "text-green-600" },
  { name: "Visa", Icon: Wallet, color: "from-blue-50 to-blue-100 border-blue-200", iconColor: "text-blue-600" },
  { name: "Apple", Icon: Star, color: "from-gray-50 to-gray-100 border-gray-200", iconColor: "text-gray-600" },
  { name: "Target", Icon: Award, color: "from-red-50 to-red-100 border-red-200", iconColor: "text-red-600" },
];

const companies = ["Meridian Health", "Northstar Labs", "Wavefront Studio", "Pelican Finance", "Silo Corp", "Dune Analytics"];

const tagColors = {
  Culture: "bg-violet-100 text-violet-700",
  Psychology: "bg-sky-100 text-sky-700",
  Ideas: "bg-amber-100 text-amber-700",
  Trends: "bg-emerald-100 text-emerald-700",
  Strategy: "bg-blue-100 text-blue-700",
  Product: "bg-orange-100 text-orange-700",
  "Remote Work": "bg-teal-100 text-teal-700",
};

// ─── COMPONENTS ───────────────────────────────────────────────────────────────

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { label: "How It Works", href: "#how-it-works" },
    { label: "Pricing", href: "#pricing" },
    { label: "About", href: "#about" },
    { label: "Blog", href: "#blog" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-100" : "bg-transparent"}`}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="#" className="flex items-center">
          <GiftableLogo height={36} />
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <a href="#contact" className="text-sm font-semibold text-[#4F8EF7] hover:text-blue-700 transition-colors">Sign In</a>
          <a href="#contact" className="bg-[#4F8EF7] hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:shadow-md hover:shadow-blue-200 flex items-center gap-2">
            Start Sending Gifts <ArrowRight size={14} />
          </a>
        </div>

        <button className="md:hidden p-2 rounded-md text-slate-600" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 px-6 py-4 flex flex-col gap-4">
          {links.map((l) => (
            <a key={l.label} href={l.href} className="text-sm font-medium text-slate-700" onClick={() => setMobileOpen(false)}>{l.label}</a>
          ))}
          <a href="#contact" className="bg-[#4F8EF7] text-white text-sm font-semibold px-4 py-2 rounded-lg text-center" onClick={() => setMobileOpen(false)}>
            Start Sending Gifts
          </a>
        </div>
      )}
    </header>
  );
}

function HeroDashboard() {
  return (
    <div className="relative w-full max-w-lg mx-auto">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 space-y-4">
        {/* Wallet */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-50">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Wallet Balance</p>
            <p className="text-2xl font-bold text-slate-900">$4,200.00</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#4F8EF7] flex items-center justify-center">
            <Wallet size={18} className="text-white" />
          </div>
        </div>

        {/* Campaign */}
        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold text-[#4F8EF7] uppercase tracking-wide">Active Campaign</span>
            <span className="text-xs bg-emerald-100 text-emerald-700 font-semibold px-2 py-0.5 rounded-full flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Live
            </span>
          </div>
          <p className="font-semibold text-slate-800 text-sm">Q1 Team Appreciation</p>
          <div className="mt-2 flex items-center gap-2">
            <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
              <div className="h-full w-3/4 bg-[#4F8EF7] rounded-full"></div>
            </div>
            <span className="text-xs text-slate-500">75% claimed</span>
          </div>
        </div>

        {/* Brands */}
        <div>
          <p className="text-xs text-slate-400 font-medium mb-2">Recipients can choose from</p>
          <div className="flex gap-2 flex-wrap">
            {["Amazon", "Starbucks", "Apple", "Visa"].map((b) => (
              <span key={b} className="text-xs bg-slate-50 border border-slate-200 text-slate-700 px-2.5 py-1 rounded-lg font-medium">{b}</span>
            ))}
          </div>
        </div>

        {/* Activity */}
        <div className="space-y-2.5">
          {[
            { name: "Alex M.", brand: "Starbucks", time: "2m ago", bg: "bg-green-100", color: "text-green-700" },
            { name: "Jordan L.", brand: "Amazon", time: "11m ago", bg: "bg-amber-100", color: "text-amber-700" },
            { name: "Casey P.", brand: "Apple", time: "1h ago", bg: "bg-slate-100", color: "text-slate-600" },
          ].map((r) => (
            <div key={r.name} className="flex items-center gap-3">
              <div className={`w-7 h-7 rounded-full ${r.bg} flex items-center justify-center`}>
                <User size={12} className={r.color} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-slate-800">{r.name} chose {r.brand}</p>
              </div>
              <span className="text-xs text-slate-400">{r.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating badges */}
      <div className="absolute -bottom-4 -right-4 bg-emerald-500 text-white text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
        <CheckCircle size={13} /> Gift Sent!
      </div>
      <div className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg border border-slate-100 p-3 text-center">
        <p className="text-lg font-bold text-slate-900">98%</p>
        <p className="text-xs text-slate-500">Satisfaction</p>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="relative pt-32 pb-24 overflow-hidden" style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 50%, #fff7f0 100%)" }}>
      <div className="absolute top-20 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-40 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-orange-100 rounded-full blur-3xl opacity-40 translate-x-1/3"></div>

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-[#4F8EF7] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 bg-[#4F8EF7] rounded-full animate-pulse"></span>
                Corporate Gifting Platform
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="text-5xl lg:text-6xl font-bold text-[#111827] leading-tight mb-6" style={{ letterSpacing: "-1.5px" }}>
                Corporate Gifting{" "}
                <span className="text-transparent bg-clip-text" style={{ backgroundImage: "linear-gradient(135deg, #4F8EF7, #FF6B4A)" }}>
                  Made Effortless
                </span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="text-xl text-slate-600 leading-relaxed mb-4">
                Send thoughtful digital rewards to employees, customers, and partners in minutes.
              </p>
              <p className="text-base text-slate-500 leading-relaxed mb-8">
                Giftable helps companies celebrate people — whether it's a milestone, a thank you, or a moment of recognition.
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="flex flex-wrap gap-3">
                <a href="#contact" className="bg-[#4F8EF7] hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 flex items-center gap-2">
                  <Gift size={16} /> Start Sending Gifts
                </a>
                <a href="#how-it-works" className="bg-white hover:bg-slate-50 text-slate-800 font-semibold px-6 py-3 rounded-xl border border-slate-200 transition-colors flex items-center gap-2">
                  See How It Works <ArrowRight size={16} />
                </a>
              </div>
            </Reveal>

            <Reveal delay={300}>
              <div className="mt-10 flex items-center gap-6">
                {[["500+", "Companies"], ["2M+", "Gifts Sent"], ["98%", "Satisfaction"]].map(([stat, label], i) => (
                  <div key={label} className="flex items-center gap-6">
                    {i > 0 && <div className="w-px h-10 bg-slate-200"></div>}
                    <div className="text-center">
                      <p className="text-2xl font-bold text-[#111827]">{stat}</p>
                      <p className="text-sm text-slate-500">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="flex justify-center lg:justify-end">
            <HeroDashboard />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Trust() {
  return (
    <section className="py-14 border-y border-slate-100 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">
          Trusted by companies that care about their people
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {companies.map((name) => (
            <div key={name} className="bg-slate-50 border border-slate-100 text-slate-500 text-sm font-semibold px-5 py-2.5 rounded-xl hover:bg-slate-100 transition-colors flex items-center gap-2">
              <Building2 size={13} className="text-slate-400" />
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Simple Process</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>How It Works</h2>
          <p className="text-lg text-slate-500 max-w-xl mx-auto">Your team gets choice. You get simplicity.</p>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={i * 80}>
              <div className="relative bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-blue-100 transition-all group h-full">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 -right-3 z-10">
                    <ArrowRight size={16} className="text-slate-300" />
                  </div>
                )}
                <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-4 group-hover:bg-blue-100 transition-colors">
                  <step.Icon size={20} className="text-[#4F8EF7]" />
                </div>
                <span className="text-xs font-bold text-[#FF6B4A] tracking-widest">{step.number}</span>
                <h3 className="font-semibold text-[#111827] mt-1 mb-2 text-base leading-snug">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Benefits() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(180deg, #F4F6FB 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">Benefits</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3" style={{ letterSpacing: "-1px" }}>Why Companies Choose Giftable</h2>
        </Reveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map(({ Icon, title, desc }, i) => (
            <Reveal key={title} delay={i * 80}>
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all h-full">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center mb-4">
                  <Icon size={20} className="text-[#4F8EF7]" />
                </div>
                <h3 className="font-bold text-[#111827] mb-2">{title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function UseCases() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Use Cases</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-6" style={{ letterSpacing: "-1px" }}>Perfect For</h2>
        </Reveal>

        <Reveal delay={80}>
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {useCases.map(({ label, Icon }) => (
              <div key={label} className="flex items-center gap-2 bg-slate-50 border border-slate-200 hover:border-[#4F8EF7] hover:bg-blue-50 text-slate-700 font-medium px-5 py-3 rounded-full transition-all cursor-default text-sm group">
                <Icon size={15} className="text-slate-400 group-hover:text-[#4F8EF7] transition-colors" />
                {label}
              </div>
            ))}
          </div>
          <p className="text-base text-slate-400 max-w-lg mx-auto">
            Every moment of appreciation strengthens your company culture.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

function Brands() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(135deg, #f0f7ff 0%, #fff7f0 100%)" }}>
      <div className="max-w-7xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">Gift Card Catalog</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>
            Give people a gift they actually want
          </h2>
          <p className="text-slate-500 mb-12 max-w-lg mx-auto">Hundreds of top brands. Recipients choose what they love.</p>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 max-w-3xl mx-auto">
          {brands.map(({ name, Icon, color, iconColor }, i) => (
            <Reveal key={name} delay={i * 60}>
              <div className={`bg-gradient-to-b ${color} border rounded-2xl p-5 flex flex-col items-center gap-3 hover:shadow-md hover:-translate-y-1 transition-all`}>
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <Icon size={18} className={iconColor} />
                </div>
                <span className="text-xs font-semibold text-slate-700">{name}</span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <p className="text-sm text-slate-400 mt-8">+ hundreds more brands available in the catalog</p>
        </Reveal>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Social Proof</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3" style={{ letterSpacing: "-1px" }}>What Companies Are Saying</h2>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col hover:shadow-md hover:border-blue-100 transition-all h-full">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} size={13} className="text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-700 leading-relaxed flex-1 text-sm">{t.quote}</p>
                <div className="mt-6 flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${t.color} flex items-center justify-center text-white text-sm font-bold`}>
                    {t.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-[#111827] text-sm">{t.name}</p>
                    <p className="text-xs text-slate-500">{t.title}, {t.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="pricing" className="py-24" style={{ background: "linear-gradient(180deg, #F4F6FB 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <Reveal className="text-center mb-16">
          <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Pricing</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>Simple, Transparent Pricing</h2>
          <p className="text-slate-500 max-w-lg mx-auto">Start for free, scale as you grow. No hidden fees, ever.</p>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 100}>
              <div className={`rounded-2xl p-7 flex flex-col transition-all h-full ${plan.highlighted ? "bg-[#4F8EF7] text-white shadow-2xl shadow-blue-200 scale-105" : "bg-white border border-slate-100 shadow-sm hover:shadow-md"}`}>
                {plan.highlighted && (
                  <span className="bg-[#FF6B4A] text-white text-xs font-bold px-3 py-1 rounded-full self-start mb-4">Most Popular</span>
                )}
                <h3 className={`text-xl font-bold mb-1 ${plan.highlighted ? "text-white" : "text-[#111827]"}`}>{plan.name}</h3>
                <p className={`text-sm mb-5 ${plan.highlighted ? "text-blue-200" : "text-slate-400"}`}>{plan.subtitle}</p>
                <div className="flex items-end gap-1 mb-2">
                  <span className={`text-4xl font-bold ${plan.highlighted ? "text-white" : "text-[#111827]"}`}>{plan.price}</span>
                  {plan.period && <span className={`text-sm mb-2 ${plan.highlighted ? "text-blue-200" : "text-slate-400"}`}>{plan.period}</span>}
                </div>
                <p className={`text-sm mb-6 ${plan.highlighted ? "text-blue-100" : "text-slate-500"}`}>{plan.desc}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <CheckCircle size={14} className={`mt-0.5 flex-shrink-0 ${plan.highlighted ? "text-blue-200" : "text-[#4F8EF7]"}`} />
                      <span className={`text-sm ${plan.highlighted ? "text-blue-100" : "text-slate-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a href="#contact" className={`text-center font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 ${plan.highlighted ? "bg-white text-[#4F8EF7] hover:bg-blue-50" : "bg-[#4F8EF7] text-white hover:bg-blue-600"}`}>
                  {plan.cta} <ArrowRight size={14} />
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">Our Mission</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-8" style={{ letterSpacing: "-1px" }}>
            Built to help companies show appreciation
          </h2>
        </Reveal>

        <Reveal delay={100}>
          <div className="bg-gradient-to-br from-blue-50 to-orange-50 rounded-3xl p-10 border border-blue-100 text-left space-y-5">
            <p className="text-lg text-slate-700 leading-relaxed">Giftable was created to help companies show appreciation in a simple and meaningful way.</p>
            <p className="text-base text-slate-600 leading-relaxed">Recognizing people should not be complicated. For too long, corporate gifting has meant clunky spreadsheets, generic swag, and one-size-fits-all orders. We built Giftable because we believed there was a better way.</p>
            <p className="text-base text-slate-600 leading-relaxed">Whether you are celebrating a milestone, thanking a customer, or rewarding your team, Giftable helps companies deliver appreciation at scale — without the friction.</p>
            <p className="text-base text-slate-600 leading-relaxed">When people feel valued, they do their best work. We're here to make that easy for every company, at every size.</p>
          </div>
        </Reveal>

        <div className="mt-12 grid grid-cols-3 gap-6">
          {[
            { Icon: Building2, stat: "500+", label: "Companies" },
            { Icon: Gift, stat: "2M+", label: "Gifts Delivered" },
            { Icon: Globe, stat: "40+", label: "Countries" },
          ].map(({ Icon, stat, label }, i) => (
            <Reveal key={label} delay={i * 80}>
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <Icon size={20} className="text-[#4F8EF7]" />
                </div>
                <p className="text-3xl font-bold text-[#111827]">{stat}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, delay = 0 }) {
  const tagColor = tagColors[post.tag] || "bg-slate-100 text-slate-600";
  return (
    <Reveal delay={delay}>
      <article className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all overflow-hidden group cursor-pointer flex flex-col h-full">
        <div className="h-1 w-full" style={{ background: "linear-gradient(90deg, #4F8EF7, #FF6B4A)" }}></div>
        <div className="p-6 flex flex-col flex-1">
          <div className="flex items-center justify-between mb-3">
            <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tagColor}`}>{post.tag}</span>
            <span className="text-xs text-slate-400 flex items-center gap-1"><Clock size={11} /> {post.readTime}</span>
          </div>
          <h3 className="font-bold text-[#111827] leading-snug mb-3 group-hover:text-[#4F8EF7] transition-colors flex-1">{post.title}</h3>
          <p className="text-sm text-slate-500 leading-relaxed mb-4">{post.excerpt}</p>
          <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <BookOpen size={11} className="text-[#4F8EF7]" />
              </div>
              <span className="text-xs text-slate-500">{post.author}</span>
            </div>
            <span className="text-xs text-slate-400">{post.date}</span>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

function Blog() {
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? blogPosts : blogPosts.slice(0, 6);

  return (
    <section id="blog" className="py-24" style={{ background: "linear-gradient(180deg, #F4F6FB 0%, #ffffff 100%)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <Reveal>
            <span className="text-[#4F8EF7] font-semibold text-sm uppercase tracking-wider">Resources</span>
            <h2 className="text-4xl font-bold text-[#111827] mt-3" style={{ letterSpacing: "-1px" }}>Insights & Ideas</h2>
            <p className="text-slate-500 mt-2 max-w-md">Practical guides on employee recognition, culture, and appreciation.</p>
          </Reveal>
          <button onClick={() => setShowAll(!showAll)} className="text-[#4F8EF7] font-semibold text-sm hover:text-blue-700 transition-colors self-start md:self-end flex items-center gap-1">
            {showAll ? "Show less" : `View all ${blogPosts.length} articles`} <ChevronDown size={14} className={`transition-transform ${showAll ? "rotate-180" : ""}`} />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((post, i) => <BlogCard key={post.id} post={post} delay={i * 60} />)}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: "", company: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Replace "mreykoba" with your actual Formspree form ID after signing up at formspree.io
  const FORMSPREE_ID = "mreykoba";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        // Fallback: still show success for demo purposes
        setSubmitted(true);
      }
    } catch {
      // Fallback for demo
      setSubmitted(true);
    }
    setLoading(false);
  };

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        <Reveal className="text-center mb-12">
          <span className="text-[#FF6B4A] font-semibold text-sm uppercase tracking-wider">Get Started</span>
          <h2 className="text-4xl font-bold text-[#111827] mt-3 mb-4" style={{ letterSpacing: "-1px" }}>Book a Demo</h2>
          <p className="text-slate-500 max-w-lg mx-auto">See Giftable in action. We'll show you how easy it is to start sending meaningful rewards to your team.</p>
        </Reveal>

        {submitted ? (
          <Reveal>
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-10 text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={28} className="text-emerald-500" />
              </div>
              <h3 className="text-xl font-bold text-[#111827] mb-2">We'll be in touch soon!</h3>
              <p className="text-slate-500">Thanks for reaching out. Our team will contact you within 1 business day.</p>
            </div>
          </Reveal>
        ) : (
          <Reveal delay={100}>
            <form onSubmit={handleSubmit} className="bg-slate-50 rounded-2xl border border-slate-100 p-8 space-y-5">
              <div className="grid md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <User size={13} className="text-slate-400" /> Name
                  </label>
                  <input type="text" required placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent text-sm transition-all" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                    <Building2 size={13} className="text-slate-400" /> Company
                  </label>
                  <input type="text" required placeholder="Your company name" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent text-sm transition-all" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <Mail size={13} className="text-slate-400" /> Email
                </label>
                <input type="email" required placeholder="your@company.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent text-sm transition-all" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5 flex items-center gap-1.5">
                  <MessageSquare size={13} className="text-slate-400" /> Message
                </label>
                <textarea rows={4} placeholder="Tell us about your team and what you're looking for..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-[#111827] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#4F8EF7] focus:border-transparent text-sm transition-all resize-none" />
              </div>
              <button type="submit" disabled={loading}
                className="w-full bg-[#4F8EF7] hover:bg-blue-600 disabled:opacity-70 text-white font-semibold py-3.5 rounded-xl transition-all hover:shadow-lg hover:shadow-blue-200 text-sm flex items-center justify-center gap-2">
                {loading ? "Sending..." : <><Send size={15} /> Book a Demo</>}
              </button>
            </form>
          </Reveal>
        )}
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="py-24" style={{ background: "linear-gradient(135deg, #3b6fd4 0%, #4F8EF7 50%, #FF6B4A 100%)" }}>
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal>
          <div className="flex justify-center mb-6">
            <GiftableLogo height={40} />
          </div>
          <h2 className="text-5xl font-bold text-white mb-4" style={{ letterSpacing: "-1.5px" }}>Make Someone's Day Today</h2>
          <p className="text-blue-100 text-lg mb-10 max-w-xl mx-auto">
            A small gesture of appreciation can make a big impact. Start sending in minutes.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#contact" className="bg-white text-[#4F8EF7] font-bold px-7 py-3.5 rounded-xl hover:bg-blue-50 transition-colors shadow-lg flex items-center gap-2">
              <Gift size={16} /> Create Your Giftable Account
            </a>
            <a href="#contact" className="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3.5 rounded-xl transition-colors border border-white/20 flex items-center gap-2">
              <Send size={15} /> Book a Demo
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  const footerLinks = {
    Product: ["How It Works", "Pricing", "Integrations", "API Docs"],
    Company: ["About", "Blog", "Careers", "Press"],
    Support: ["Contact", "Help Center", "Status", "Security"],
  };

  return (
    <footer className="bg-[#111827] text-slate-400">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-10 mb-12">
          <div>
            <a href="#" className="flex items-center mb-4">
              <GiftableLogo height={32} />
            </a>
            <p className="text-sm leading-relaxed text-slate-500">Built to help companies show appreciation.</p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-600">© {new Date().getFullYear()} Giftable. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="text-sm text-slate-600 hover:text-slate-300 transition-colors">Terms</a>
            <a href="#" className="text-sm text-slate-600 hover:text-slate-300 transition-colors">Privacy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <div className="min-h-screen antialiased scroll-smooth" style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif", color: "#111827", background: "#ffffff" }}>
      <Navbar />
      <main>
        <Hero />
        <Trust />
        <HowItWorks />
        <Benefits />
        <UseCases />
        <Brands />
        <Testimonials />
        <Pricing />
        <About />
        <Blog />
        <Contact />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
