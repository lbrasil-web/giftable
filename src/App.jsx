import { useState, useEffect, useRef } from "react";
import {
  Gift, Wallet, Users, Send, ArrowRight, ArrowLeft, CheckCircle,
  Plus, Minus, X, Menu, ChevronDown, Star, LayoutGrid, Globe,
  Award, Heart, TrendingUp, Zap, Building2, Mail, User, Lock,
  Eye, EyeOff, Upload, Trash2, Edit2, Clock, Shield, FileCheck,
  KeyRound, LogOut, Bell, Settings, BarChart2, Inbox, CreditCard,
  ChevronRight, Sparkles, Package, Check, AlertCircle
} from "lucide-react";

// ─── BRAND ASSETS (reused from corporate site) ───────────────────────────────

function GiftableLogo({ height = 36, white = false }) {
  const scale = height / 52;
  const w = Math.round(200 * scale);
  const blue = white ? "#ffffff" : "#4F8EF7";
  const coral = white ? "#ffffff" : "#FF6B4A";
  return (
    <svg width={w} height={height} viewBox="0 0 200 52" xmlns="http://www.w3.org/2000/svg" fontFamily="'DM Sans','Helvetica Neue',Arial,sans-serif">
      <rect x="0" y="4" width="40" height="13" rx="4" fill={blue}/>
      <rect x="3" y="16" width="34" height="24" rx="3" fill={blue}/>
      <rect x="17" y="4" width="6" height="36" fill={coral}/>
      <rect x="0" y="11" width="40" height="6" fill={coral}/>
      <path d="M20 4 C20 -4 10 -6 10 -1 C10 2 15 4 20 4Z" fill={coral}/>
      <path d="M20 4 C20 -4 30 -6 30 -1 C30 2 25 4 20 4Z" fill={coral}/>
      <circle cx="20" cy="4" r="3" fill={coral}/>
      <text y="40" x="50" fontSize="30" fontWeight="700" letterSpacing="-1">
        <tspan fill={blue}>gift</tspan><tspan fill={coral}>able</tspan>
      </text>
    </svg>
  );
}

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const BLUE = "#4F8EF7";
const CORAL = "#FF6B4A";
const DARK = "#111827";
const BG = "#F4F6FB";

// ─── BRAND DATA ───────────────────────────────────────────────────────────────
const BRANDS = [
  { id: "amazon",    name: "Amazon",    Icon: LayoutGrid, color: "from-amber-50 to-amber-100 border-amber-200",  iconColor: "text-amber-600",   bg: "bg-amber-500" },
  { id: "starbucks", name: "Starbucks", Icon: Heart,      color: "from-green-50 to-green-100 border-green-200",  iconColor: "text-green-600",   bg: "bg-green-600" },
  { id: "uber",      name: "Uber Eats", Icon: Globe,      color: "from-slate-50 to-slate-100 border-slate-200",  iconColor: "text-slate-600",   bg: "bg-slate-800" },
  { id: "visa",      name: "Visa",      Icon: Wallet,     color: "from-blue-50 to-blue-100 border-blue-200",     iconColor: "text-blue-600",    bg: "bg-blue-600" },
  { id: "apple",     name: "Apple",     Icon: Star,       color: "from-gray-50 to-gray-100 border-gray-200",     iconColor: "text-gray-600",    bg: "bg-gray-800" },
  { id: "target",    name: "Target",    Icon: Award,      color: "from-red-50 to-red-100 border-red-200",        iconColor: "text-red-600",     bg: "bg-red-600" },
  { id: "netflix",   name: "Netflix",   Icon: TrendingUp, color: "from-red-50 to-rose-100 border-rose-200",      iconColor: "text-rose-600",    bg: "bg-rose-700" },
  { id: "doordash",  name: "DoorDash",  Icon: Package,    color: "from-orange-50 to-orange-100 border-orange-200", iconColor: "text-orange-500", bg: "bg-orange-500" },
];

// ─── SEED DATA ────────────────────────────────────────────────────────────────
const SEED_CAMPAIGNS = [
  { id: 1, name: "Employee Appreciation Week", description: "A thank-you reward for the team", amount: 50, brands: ["amazon","starbucks","visa"], recipients: ["alex@brightwave.io","jordan@brightwave.io","casey@brightwave.io","morgan@brightwave.io","riley@brightwave.io"], status: "sent", sentAt: "March 5, 2026", total: 250 },
  { id: 2, name: "Q1 Sales Team Reward", description: "Celebrating Q1 quota attainment", amount: 100, brands: ["apple","visa","amazon"], recipients: ["drew@brightwave.io","sam@brightwave.io","taylor@brightwave.io"], status: "sent", sentAt: "February 20, 2026", total: 300 },
  { id: 3, name: "New Hire Welcome", description: "Welcome gift for new team members", amount: 75, brands: ["starbucks","amazon","target"], recipients: ["new1@brightwave.io","new2@brightwave.io"], status: "active", sentAt: "March 10, 2026", total: 150 },
];

// ─── SHARED UI COMPONENTS ─────────────────────────────────────────────────────

function Btn({ children, onClick, variant = "primary", size = "md", disabled = false, className = "", type = "button" }) {
  const base = "inline-flex items-center justify-center gap-2 font-semibold rounded-xl transition-all duration-200 cursor-pointer";
  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-5 py-2.5 text-sm", lg: "px-7 py-3.5 text-base" };
  const variants = {
    primary: `bg-[${BLUE}] hover:bg-blue-600 text-white shadow-sm hover:shadow-md hover:shadow-blue-200 disabled:opacity-50`,
    coral: `bg-[${CORAL}] hover:bg-orange-500 text-white shadow-sm hover:shadow-md hover:shadow-orange-200 disabled:opacity-50`,
    outline: "bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700",
    ghost: "text-slate-600 hover:bg-slate-100 hover:text-slate-900",
    danger: "bg-red-50 border border-red-200 text-red-600 hover:bg-red-100",
  };
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
      style={variant === "primary" ? { backgroundColor: BLUE } : variant === "coral" ? { backgroundColor: CORAL } : {}}>
      {children}
    </button>
  );
}

function Card({ children, className = "", onClick, hover = false }) {
  return (
    <div onClick={onClick}
      className={`bg-white rounded-2xl border border-slate-100 shadow-sm ${hover ? "hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer" : ""} ${className}`}>
      {children}
    </div>
  );
}

function Input({ label, type = "text", placeholder, value, onChange, icon: Icon, error, required, className = "" }) {
  const [show, setShow] = useState(false);
  const isPassword = type === "password";
  return (
    <div className={className}>
      {label && <label className="block text-sm font-medium text-slate-700 mb-1.5">{label}{required && <span className="text-red-400 ml-0.5">*</span>}</label>}
      <div className="relative">
        {Icon && <Icon size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />}
        <input
          type={isPassword ? (show ? "text" : "password") : type}
          placeholder={placeholder} value={value} onChange={onChange} required={required}
          className={`w-full ${Icon ? "pl-9" : "pl-4"} pr-4 py-3 rounded-xl border ${error ? "border-red-300 bg-red-50" : "border-slate-200 bg-white"} text-[${DARK}] placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[${BLUE}] focus:border-transparent text-sm transition-all`}
        />
        {isPassword && (
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
            {show ? <EyeOff size={14} /> : <Eye size={14} />}
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

function Badge({ children, color = "blue" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-emerald-100 text-emerald-700",
    coral: "bg-orange-100 text-orange-700",
    slate: "bg-slate-100 text-slate-600",
    violet: "bg-violet-100 text-violet-700",
  };
  return <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${colors[color]}`}>{children}</span>;
}

function StatCard({ icon: Icon, label, value, sub, color = "blue" }) {
  const colors = { blue: "bg-blue-50 text-blue-500", coral: "bg-orange-50 text-orange-500", green: "bg-emerald-50 text-emerald-500", violet: "bg-violet-50 text-violet-500" };
  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl ${colors[color]} flex items-center justify-center`}>
          <Icon size={18} />
        </div>
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm font-medium text-slate-500 mt-0.5">{label}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </Card>
  );
}

// ─── SIDEBAR NAV ──────────────────────────────────────────────────────────────

function Sidebar({ page, setPage, user, onLogout }) {
  const nav = [
    { id: "dashboard",  label: "Dashboard",       Icon: BarChart2 },
    { id: "campaigns",  label: "Campaigns",        Icon: Send },
    { id: "recipients", label: "Recipients",       Icon: Users },
    { id: "wallet",     label: "Wallet",           Icon: Wallet },
    { id: "settings",   label: "Settings",         Icon: Settings },
  ];
  return (
    <aside className="w-60 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0">
      <div className="px-5 py-4 border-b border-slate-100">
        <GiftableLogo height={30} />
      </div>
      <nav className="flex-1 p-3 space-y-0.5">
        {nav.map(({ id, label, Icon }) => (
          <button key={id} onClick={() => setPage(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${page === id ? "bg-blue-50 text-[#4F8EF7]" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"}`}>
            <Icon size={16} />
            {label}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-slate-100">
        <div className="flex items-center gap-3 px-3 py-2.5 mb-1">
          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">{user.name}</p>
            <p className="text-xs text-slate-400 truncate">{user.company}</p>
          </div>
        </div>
        <button onClick={onLogout} className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all">
          <LogOut size={13} /> Sign Out
        </button>
      </div>
    </aside>
  );
}

// ─── TOP BAR ─────────────────────────────────────────────────────────────────

function TopBar({ title, user, wallet, onAddCredits }) {
  return (
    <div className="h-14 border-b border-slate-100 bg-white px-6 flex items-center justify-between sticky top-0 z-30">
      <h1 className="text-base font-bold text-slate-900">{title}</h1>
      <div className="flex items-center gap-3">
        <button onClick={onAddCredits} className="flex items-center gap-2 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-200 text-slate-700 hover:text-blue-700 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all">
          <Wallet size={13} className="text-slate-400" />
          <span className="text-slate-500">Balance:</span>
          <span className="font-bold">${wallet.toLocaleString()}</span>
        </button>
        <button className="w-8 h-8 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 transition-all">
          <Bell size={14} />
        </button>
        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-600">
          {user.name.split(" ").map(n => n[0]).join("")}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: LANDING ────────────────────────────────────────────────────────────

function LandingPage({ setPage }) {
  return (
    <div className="min-h-screen" style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: "linear-gradient(135deg, #f0f7ff 0%, #ffffff 60%, #fff7f0 100%)" }}>
      {/* Nav */}
      <header className="max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
        <GiftableLogo height={34} />
        <div className="flex items-center gap-3">
          <Btn variant="ghost" onClick={() => window.open("https://giftable-28mt.vercel.app/", "_blank")}>Log In</Btn>
          <Btn variant="primary" onClick={() => window.open("https://giftable-28mt.vercel.app/", "_blank")}>Get Started <ArrowRight size={14} /></Btn>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-16 pb-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-600 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></span>
              Corporate Gifting Platform
            </div>
            <h1 className="text-5xl font-bold leading-tight mb-6" style={{ color: DARK, letterSpacing: "-1.5px" }}>
              Appreciation,{" "}
              <span className="text-transparent bg-clip-text" style={{ backgroundImage: `linear-gradient(135deg, ${BLUE}, ${CORAL})` }}>
                made effortless
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-4">
              Giftable helps companies send flexible digital rewards that feel thoughtful, simple, and meaningful.
            </p>
            <p className="text-base text-slate-500 mb-10">
              Create a campaign in minutes. Recipients choose their favorite brand. Everyone wins.
            </p>
            <div className="flex flex-wrap gap-3">
              <Btn variant="primary" size="lg" onClick={() => window.open("https://giftable-28mt.vercel.app/", "_blank")}>
                <Gift size={16} /> Create Your Account
              </Btn>
              <Btn variant="outline" size="lg" onClick={() => window.open("https://giftable-28mt.vercel.app/", "_blank")}>
                Log In <ArrowRight size={14} />
              </Btn>
            </div>
            <div className="mt-10 flex items-center gap-6">
              {[["500+", "Companies"], ["2M+", "Gifts Sent"], ["98%", "Satisfaction"]].map(([stat, label], i) => (
                <div key={label} className="flex items-center gap-6">
                  {i > 0 && <div className="w-px h-8 bg-slate-200"></div>}
                  <div>
                    <p className="text-xl font-bold" style={{ color: DARK }}>{stat}</p>
                    <p className="text-xs text-slate-500">{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product preview */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-orange-50 rounded-3xl blur-2xl opacity-60"></div>
            <Card className="relative p-6 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-50">
                <div>
                  <p className="text-xs text-slate-400 uppercase tracking-wide font-medium">Wallet Balance</p>
                  <p className="text-2xl font-bold text-slate-900">$4,200.00</p>
                </div>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: BLUE }}>
                  <Wallet size={18} className="text-white" />
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: BLUE }}>Active Campaign</span>
                  <Badge color="green"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span> Live</Badge>
                </div>
                <p className="font-semibold text-slate-800 text-sm">Employee Appreciation Week</p>
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 rounded-full" style={{ backgroundColor: BLUE }}></div>
                  </div>
                  <span className="text-xs text-slate-500">75% claimed</span>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {BRANDS.slice(0, 4).map(b => (
                  <div key={b.id} className={`bg-gradient-to-b ${b.color} border rounded-xl p-3 flex flex-col items-center gap-1.5`}>
                    <div className="w-7 h-7 bg-white rounded-lg flex items-center justify-center shadow-sm">
                      <b.Icon size={13} className={b.iconColor} />
                    </div>
                    <span className="text-xs font-medium text-slate-600">{b.name}</span>
                  </div>
                ))}
              </div>
              <div className="absolute -bottom-3 -right-3 bg-emerald-500 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
                <CheckCircle size={12} /> Gift Sent!
              </div>
            </Card>
          </div>
        </div>

        {/* Feature pills */}
        <div className="mt-20 grid md:grid-cols-3 gap-4">
          {[
            { Icon: Zap, title: "Send in minutes", desc: "Set up a campaign, add recipients, and rewards are delivered instantly." },
            { Icon: Award, title: "Recipients choose", desc: "Let your team pick the brand they actually want — no guessing required." },
            { Icon: TrendingUp, title: "Track everything", desc: "See redemption rates, campaign stats, and wallet activity in real time." },
          ].map(({ Icon, title, desc }) => (
            <Card key={title} className="p-5 flex gap-4 items-start">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                <Icon size={18} style={{ color: BLUE }} />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 mb-1 text-sm">{title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{desc}</p>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── PAGE: REGISTER ───────────────────────────────────────────────────────────

function RegisterPage({ setPage, onRegister }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", terms: false });
  const [errors, setErrors] = useState({});
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.type === "checkbox" ? e.target.checked : e.target.value }));

  const submit = e => {
    e.preventDefault();
    const errs = {};
    if (!form.name) errs.name = "Required";
    if (!form.email.includes("@")) errs.email = "Enter a valid email";
    if (form.password.length < 6) errs.password = "At least 6 characters";
    if (!form.company) errs.company = "Required";
    if (!form.terms) errs.terms = "Please accept the terms";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onRegister({ name: form.name, email: form.email, company: form.company });
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: BG }}>
      {/* Left panel */}
      <div className="hidden lg:flex w-2/5 flex-col justify-between p-10" style={{ background: `linear-gradient(160deg, ${BLUE} 0%, #3b6fd4 100%)` }}>
        <GiftableLogo height={32} white />
        <div className="text-white space-y-6">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Gift size={22} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold leading-tight" style={{ letterSpacing: "-1px" }}>
            Make appreciation easier across your whole company.
          </h2>
          <p className="text-blue-100 text-sm leading-relaxed">
            Join 500+ companies using Giftable to send meaningful digital rewards that your team actually loves.
          </p>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/20">
            {[["500+", "Companies"], ["2M+", "Gifts"], ["98%", "Satisfaction"]].map(([v, l]) => (
              <div key={l}>
                <p className="text-xl font-bold">{v}</p>
                <p className="text-xs text-blue-200">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-blue-200">© {new Date().getFullYear()} Giftable. All rights reserved.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8"><GiftableLogo height={30} /></div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: DARK, letterSpacing: "-0.5px" }}>Create your account</h2>
          <p className="text-slate-500 text-sm mb-8">Start sending meaningful rewards in minutes.</p>

          <form onSubmit={submit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input label="Full Name" placeholder="Sarah Chen" value={form.name} onChange={set("name")} icon={User} error={errors.name} required />
              <Input label="Company Name" placeholder="BrightWave Labs" value={form.company} onChange={set("company")} icon={Building2} error={errors.company} required />
            </div>
            <Input label="Work Email" type="email" placeholder="sarah@brightwave.io" value={form.email} onChange={set("email")} icon={Mail} error={errors.email} required />
            <Input label="Password" type="password" placeholder="At least 6 characters" value={form.password} onChange={set("password")} icon={Lock} error={errors.password} required />
            <div>
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input type="checkbox" checked={form.terms} onChange={set("terms")} className="mt-0.5 rounded border-slate-300 text-blue-500" />
                <span className="text-xs text-slate-500">I agree to the <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a></span>
              </label>
              {errors.terms && <p className="text-xs text-red-500 mt-1">{errors.terms}</p>}
            </div>
            <Btn type="submit" variant="primary" size="lg" className="w-full">
              Create Account <ArrowRight size={15} />
            </Btn>
          </form>

          <p className="text-center text-sm text-slate-500 mt-6">
            Already have an account?{" "}
            <button onClick={() => window.open("https://giftable-28mt.vercel.app/", "_blank")} className="font-semibold hover:underline" style={{ color: BLUE }}>Log In</button>
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE: LOGIN ──────────────────────────────────────────────────────────────

function LoginPage({ setPage, onLogin }) {
  const [form, setForm] = useState({ email: "sarah@brightwave.io", password: "password" });
  const [error, setError] = useState("");
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));

  const submit = e => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Please fill in all fields."); return; }
    onLogin();
  };

  return (
    <div className="min-h-screen flex" style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif", background: BG }}>
      <div className="hidden lg:flex w-2/5 flex-col justify-between p-10" style={{ background: `linear-gradient(160deg, ${CORAL} 0%, #d94f2e 100%)` }}>
        <GiftableLogo height={32} white />
        <div className="text-white space-y-4">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
            <Heart size={22} className="text-white" />
          </div>
          <h2 className="text-3xl font-bold leading-tight" style={{ letterSpacing: "-1px" }}>
            Welcome back. Your team is waiting.
          </h2>
          <p className="text-orange-100 text-sm leading-relaxed">
            Log in to manage campaigns, send rewards, and track appreciation across your whole organization.
          </p>
          <Card className="bg-white/10 border-white/20 p-4">
            <div className="flex gap-1 mb-2">
              {[...Array(5)].map((_, i) => <Star key={i} size={11} className="text-yellow-300 fill-yellow-300" />)}
            </div>
            <p className="text-white text-xs leading-relaxed">"Giftable completely changed how we recognize our people. It's the first time I've seen an employee recognition tool that employees actually look forward to."</p>
            <p className="text-orange-200 text-xs mt-2 font-medium">— Head of People, Northstar Labs</p>
          </Card>
        </div>
        <p className="text-xs text-orange-200">© {new Date().getFullYear()} Giftable. All rights reserved.</p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-sm">
          <div className="lg:hidden mb-8"><GiftableLogo height={30} /></div>
          <h2 className="text-2xl font-bold mb-1" style={{ color: DARK, letterSpacing: "-0.5px" }}>Welcome back</h2>
          <p className="text-slate-500 text-sm mb-8">Log in to your Giftable account.</p>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-3 mb-4">
              <AlertCircle size={14} /> {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-4">
            <Input label="Work Email" type="email" placeholder="sarah@brightwave.io" value={form.email} onChange={set("email")} icon={Mail} />
            <Input label="Password" type="password" placeholder="Your password" value={form.password} onChange={set("password")} icon={Lock} />
            <div className="flex justify-end">
              <button type="button" className="text-xs font-medium hover:underline" style={{ color: BLUE }}>Forgot password?</button>
            </div>
            <Btn type="submit" variant="primary" size="lg" className="w-full">
              Log In <ArrowRight size={15} />
            </Btn>
          </form>

          <div className="my-6 flex items-center gap-3">
            <div className="flex-1 h-px bg-slate-200"></div>
            <span className="text-xs text-slate-400">or</span>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <button onClick={() => window.open("https://giftable-28mt.vercel.app/", "_blank")} className="font-semibold hover:underline" style={{ color: BLUE }}>Sign Up Free</button>
          </p>

          <p className="text-center text-xs text-slate-400 mt-6">
            Demo: email pre-filled, any password works.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────

function DashboardPage({ user, wallet, campaigns, setPage, setActiveCampaign }) {
  const totalSent = campaigns.filter(c => c.status === "sent").reduce((s, c) => s + c.total, 0);
  const totalRecipients = campaigns.reduce((s, c) => s + c.recipients.length, 0);

  return (
    <div className="p-6 space-y-6 max-w-6xl">
      {/* Welcome */}
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold" style={{ color: DARK, letterSpacing: "-0.5px" }}>
            Good morning, {user.name.split(" ")[0]} 👋
          </h2>
          <p className="text-slate-500 text-sm mt-1">{user.company} · Here's what's happening with your gifting.</p>
        </div>
        <Btn variant="primary" onClick={() => setPage("create-campaign")}>
          <Plus size={14} /> Create Campaign
        </Btn>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Wallet}    label="Wallet Balance"     value={`$${wallet.toLocaleString()}`}  color="blue"   sub="Available credits" />
        <StatCard icon={Send}      label="Campaigns Sent"     value={campaigns.filter(c=>c.status==="sent").length} color="coral"  sub="All time" />
        <StatCard icon={Users}     label="Total Recipients"   value={totalRecipients}                color="green"  sub="Across all campaigns" />
        <StatCard icon={Gift}      label="Total Rewarded"     value={`$${totalSent.toLocaleString()}`} color="violet" sub="Value delivered" />
      </div>

      {/* Quick actions */}
      <div className="grid md:grid-cols-3 gap-4">
        {[
          { title: "Add Credits", desc: "Top up your wallet to send more rewards.", Icon: CreditCard, action: () => setPage("wallet"), color: "blue" },
          { title: "Create Campaign", desc: "Set up a new gifting campaign in minutes.", Icon: Send, action: () => setPage("create-campaign"), color: "coral" },
          { title: "View Campaigns", desc: "Track campaign performance and redemptions.", Icon: BarChart2, action: () => setPage("campaigns"), color: "green" },
        ].map(({ title, desc, Icon, action, color }) => {
          const colors = { blue: { bg: "bg-blue-50 hover:bg-blue-100", icon: "bg-blue-500", text: "text-blue-700" }, coral: { bg: "bg-orange-50 hover:bg-orange-100", icon: "bg-orange-500", text: "text-orange-700" }, green: { bg: "bg-emerald-50 hover:bg-emerald-100", icon: "bg-emerald-500", text: "text-emerald-700" } }[color];
          return (
            <button key={title} onClick={action}
              className={`${colors.bg} rounded-2xl p-5 text-left transition-all hover:shadow-sm border border-transparent hover:border-slate-200 group`}>
              <div className={`w-10 h-10 ${colors.icon} rounded-xl flex items-center justify-center mb-3`}>
                <Icon size={18} className="text-white" />
              </div>
              <h3 className={`font-bold text-sm ${colors.text} mb-1`}>{title}</h3>
              <p className="text-xs text-slate-500">{desc}</p>
            </button>
          );
        })}
      </div>

      {/* Recent campaigns */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-900">Recent Campaigns</h3>
          <Btn variant="ghost" size="sm" onClick={() => setPage("campaigns")}>View all <ChevronRight size={12} /></Btn>
        </div>
        <div className="space-y-3">
          {campaigns.slice(0, 3).map(c => (
            <Card key={c.id} hover className="p-4 flex items-center gap-4" onClick={() => { setActiveCampaign(c); setPage("campaign-detail"); }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.status === "active" ? "#dcfce7" : "#eff6ff" }}>
                <Send size={16} style={{ color: c.status === "active" ? "#16a34a" : BLUE }} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className="font-semibold text-slate-900 text-sm truncate">{c.name}</p>
                  <Badge color={c.status === "active" ? "green" : "blue"}>{c.status === "active" ? "Active" : "Sent"}</Badge>
                </div>
                <p className="text-xs text-slate-500">{c.recipients.length} recipients · ${c.amount}/ea · ${c.total} total</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400">{c.sentAt}</p>
                <p className="text-xs font-semibold" style={{ color: BLUE }}>View →</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── CAMPAIGNS LIST ───────────────────────────────────────────────────────────

function CampaignsPage({ campaigns, setPage, setActiveCampaign }) {
  return (
    <div className="p-6 space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: DARK }}>Campaigns</h2>
          <p className="text-sm text-slate-500 mt-0.5">{campaigns.length} campaigns total</p>
        </div>
        <Btn variant="primary" onClick={() => setPage("create-campaign")}>
          <Plus size={14} /> New Campaign
        </Btn>
      </div>

      <div className="space-y-3">
        {campaigns.map(c => (
          <Card key={c.id} hover className="p-5 flex items-center gap-4" onClick={() => { setActiveCampaign(c); setPage("campaign-detail"); }}>
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: c.status === "active" ? "#dcfce7" : "#eff6ff" }}>
              <Send size={18} style={{ color: c.status === "active" ? "#16a34a" : BLUE }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <p className="font-bold text-slate-900 truncate">{c.name}</p>
                <Badge color={c.status === "active" ? "green" : "blue"}>{c.status === "active" ? "Active" : "Sent"}</Badge>
              </div>
              <p className="text-sm text-slate-500 mb-2 truncate">{c.description}</p>
              <div className="flex items-center gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><Users size={11} /> {c.recipients.length} recipients</span>
                <span className="flex items-center gap-1"><Gift size={11} /> ${c.amount} per gift</span>
                <span className="flex items-center gap-1"><Wallet size={11} /> ${c.total} total</span>
                <span className="flex items-center gap-1"><Clock size={11} /> {c.sentAt}</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex gap-1">
                {c.brands.slice(0, 3).map(bid => {
                  const brand = BRANDS.find(b => b.id === bid);
                  return brand ? (
                    <div key={bid} className={`w-7 h-7 rounded-lg bg-gradient-to-b ${brand.color} border flex items-center justify-center`}>
                      <brand.Icon size={12} className={brand.iconColor} />
                    </div>
                  ) : null;
                })}
              </div>
              <ChevronRight size={16} className="text-slate-300" />
            </div>
          </Card>
        ))}
      </div>

      {campaigns.length === 0 && (
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Send size={24} style={{ color: BLUE }} />
          </div>
          <h3 className="font-bold text-slate-800 mb-2">No campaigns yet</h3>
          <p className="text-sm text-slate-500 mb-4">Create your first gifting campaign to get started.</p>
          <Btn variant="primary" onClick={() => setPage("create-campaign")}>Create Campaign</Btn>
        </div>
      )}
    </div>
  );
}

// ─── CAMPAIGN DETAIL ──────────────────────────────────────────────────────────

function CampaignDetailPage({ campaign, setPage, onPreviewEmail }) {
  if (!campaign) return null;
  return (
    <div className="p-6 space-y-6 max-w-4xl">
      <div className="flex items-center gap-3 mb-2">
        <Btn variant="ghost" size="sm" onClick={() => setPage("campaigns")}><ArrowLeft size={14} /> Back</Btn>
      </div>
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <h2 className="text-xl font-bold" style={{ color: DARK }}>{campaign.name}</h2>
            <Badge color={campaign.status === "active" ? "green" : "blue"}>{campaign.status === "active" ? "Active" : "Sent"}</Badge>
          </div>
          <p className="text-sm text-slate-500">{campaign.description}</p>
        </div>
        <Btn variant="outline" size="sm" onClick={() => onPreviewEmail(campaign)}>
          <Inbox size={13} /> Preview Email
        </Btn>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: DARK }}>{campaign.recipients.length}</p>
          <p className="text-xs text-slate-500 mt-0.5">Recipients</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: DARK }}>${campaign.amount}</p>
          <p className="text-xs text-slate-500 mt-0.5">Per Gift</p>
        </Card>
        <Card className="p-4 text-center">
          <p className="text-2xl font-bold" style={{ color: DARK }}>${campaign.total}</p>
          <p className="text-xs text-slate-500 mt-0.5">Total Spent</p>
        </Card>
      </div>

      <Card className="p-5">
        <h3 className="font-bold text-slate-800 mb-3 text-sm">Gift Card Brands</h3>
        <div className="flex flex-wrap gap-2">
          {campaign.brands.map(bid => {
            const brand = BRANDS.find(b => b.id === bid);
            return brand ? (
              <div key={bid} className={`flex items-center gap-2 bg-gradient-to-b ${brand.color} border rounded-xl px-3 py-2`}>
                <brand.Icon size={13} className={brand.iconColor} />
                <span className="text-xs font-semibold text-slate-700">{brand.name}</span>
              </div>
            ) : null;
          })}
        </div>
      </Card>

      <Card className="p-5">
        <h3 className="font-bold text-slate-800 mb-3 text-sm">Recipients ({campaign.recipients.length})</h3>
        <div className="space-y-2">
          {campaign.recipients.map((email, i) => (
            <div key={i} className="flex items-center gap-3 py-2 border-b border-slate-50 last:border-0">
              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold" style={{ color: BLUE }}>
                {email[0].toUpperCase()}
              </div>
              <span className="text-sm text-slate-700">{email}</span>
              <Badge color="green" className="ml-auto"><Check size={10} /> Delivered</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── WALLET ───────────────────────────────────────────────────────────────────

function WalletPage({ wallet, setWallet }) {
  const [custom, setCustom] = useState("");
  const [selected, setSelected] = useState(null);
  const [success, setSuccess] = useState(false);

  const presets = [100, 500, 1000, 2500];

  const addCredits = () => {
    const amount = selected || parseInt(custom);
    if (!amount || amount <= 0) return;
    setWallet(w => w + amount);
    setSuccess(true);
    setSelected(null);
    setCustom("");
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="p-6 space-y-6 max-w-3xl">
      <div>
        <h2 className="text-xl font-bold" style={{ color: DARK }}>Wallet & Credits</h2>
        <p className="text-sm text-slate-500 mt-0.5">Manage your gifting balance.</p>
      </div>

      {/* Balance card */}
      <div className="rounded-2xl p-6 text-white" style={{ background: `linear-gradient(135deg, ${BLUE} 0%, #3b6fd4 100%)` }}>
        <p className="text-sm font-medium text-blue-200 mb-1">Available Balance</p>
        <p className="text-4xl font-bold mb-4">${wallet.toLocaleString()}</p>
        <div className="flex items-center gap-3 text-xs text-blue-200">
          <Shield size={12} />
          <span>Credits never expire · SOC 2 Type II Certified</span>
        </div>
      </div>

      {success && (
        <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm rounded-xl p-3">
          <CheckCircle size={16} /> Credits added successfully!
        </div>
      )}

      <Card className="p-6">
        <h3 className="font-bold text-slate-800 mb-4">Add Credits</h3>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {presets.map(p => (
            <button key={p} onClick={() => { setSelected(p); setCustom(""); }}
              className={`py-3 rounded-xl border text-sm font-semibold transition-all ${selected === p ? "border-blue-500 bg-blue-50 text-blue-700" : "border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-blue-50"}`}>
              Add ${p.toLocaleString()}
            </button>
          ))}
        </div>
        <div className="mb-4">
          <label className="block text-xs font-medium text-slate-600 mb-1.5">Custom Amount</label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
            <input type="number" placeholder="Enter amount" value={custom}
              onChange={e => { setCustom(e.target.value); setSelected(null); }}
              className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-transparent"
              style={{ "--tw-ring-color": BLUE }}
            />
          </div>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 mb-4 space-y-2">
          <p className="text-xs font-semibold text-slate-600 mb-2">Simulated Payment Method</p>
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-blue-300 transition-all">
            <CreditCard size={16} className="text-slate-400" />
            <span className="text-sm text-slate-700 font-medium">•••• •••• •••• 4242</span>
            <Badge color="blue" className="ml-auto">Default</Badge>
          </div>
          <div className="flex items-center gap-3 bg-white border border-slate-200 rounded-xl p-3 cursor-pointer hover:border-blue-300 transition-all">
            <Building2 size={16} className="text-slate-400" />
            <span className="text-sm text-slate-700 font-medium">ACH · BrightWave Labs Operating</span>
          </div>
        </div>

        <Btn variant="primary" size="lg" className="w-full" onClick={addCredits} disabled={!selected && !custom}>
          <Plus size={15} /> Add {selected ? `$${selected.toLocaleString()}` : custom ? `$${parseInt(custom).toLocaleString()}` : "Credits"}
        </Btn>
      </Card>

      {/* Transaction history */}
      <Card className="p-5">
        <h3 className="font-bold text-slate-800 mb-3 text-sm">Recent Transactions</h3>
        <div className="space-y-2">
          {[
            { label: "Q1 Sales Team Reward", amount: -300, date: "Feb 20, 2026", type: "debit" },
            { label: "Credits Added", amount: 1000, date: "Feb 15, 2026", type: "credit" },
            { label: "Employee Appreciation Week", amount: -250, date: "Mar 5, 2026", type: "debit" },
            { label: "Credits Added", amount: 500, date: "Jan 30, 2026", type: "credit" },
          ].map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${t.type === "credit" ? "bg-emerald-50" : "bg-red-50"}`}>
                {t.type === "credit" ? <Plus size={13} className="text-emerald-600" /> : <Minus size={13} className="text-red-500" />}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-slate-800">{t.label}</p>
                <p className="text-xs text-slate-400">{t.date}</p>
              </div>
              <span className={`text-sm font-bold ${t.type === "credit" ? "text-emerald-600" : "text-red-500"}`}>
                {t.type === "credit" ? "+" : ""}${Math.abs(t.amount).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}

// ─── CREATE CAMPAIGN ──────────────────────────────────────────────────────────

function CreateCampaignPage({ setPage, wallet, onDraftSave }) {
  const [form, setForm] = useState({
    name: "",
    description: "",
    amount: "50",
    sendDate: "",
    brands: [],
  });
  const [errors, setErrors] = useState({});
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }));
  const toggleBrand = id => setForm(f => ({ ...f, brands: f.brands.includes(id) ? f.brands.filter(b => b !== id) : [...f.brands, id] }));

  const next = () => {
    const errs = {};
    if (!form.name) errs.name = "Campaign name is required";
    if (!form.amount || parseInt(form.amount) <= 0) errs.amount = "Enter a valid amount";
    if (form.brands.length === 0) errs.brands = "Select at least one brand";
    if (Object.keys(errs).length) { setErrors(errs); return; }
    onDraftSave(form);
    setPage("add-recipients");
  };

  const estimatedCost = parseInt(form.amount) || 0;

  return (
    <div className="p-6 max-w-3xl space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        {["Campaign Setup", "Add Recipients", "Review & Send"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            {i > 0 && <div className="w-8 h-px bg-slate-200"></div>}
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${i === 0 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
              <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${i === 0 ? "bg-blue-500 text-white" : "bg-slate-300 text-white"}`}>{i + 1}</span>
              {step}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold" style={{ color: DARK }}>Create a Campaign</h2>
        <p className="text-sm text-slate-500 mt-0.5">Set up your gifting campaign. Recipients choose the brand they love.</p>
      </div>

      <Card className="p-6 space-y-5">
        <Input label="Campaign Name" placeholder="Employee Appreciation Week" value={form.name} onChange={set("name")} icon={Send} error={errors.name} required />
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Description <span className="text-slate-400 font-normal">(optional)</span></label>
          <textarea rows={2} placeholder="A thank-you reward for the team..." value={form.description} onChange={set("description")}
            className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 resize-none placeholder-slate-400 transition-all" />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1.5">Gift Amount per Recipient <span className="text-red-400">*</span></label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-medium">$</span>
              <input type="number" placeholder="50" value={form.amount} onChange={set("amount")} min="1"
                className="w-full pl-8 pr-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2" />
            </div>
            {errors.amount && <p className="text-xs text-red-500 mt-1">{errors.amount}</p>}
          </div>
          <Input label="Send Date (optional)" type="date" value={form.sendDate} onChange={set("sendDate")} icon={Clock} />
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-800">Available Brands</h3>
            <p className="text-xs text-slate-500 mt-0.5">Select brands recipients can choose from</p>
          </div>
          <span className="text-xs font-semibold" style={{ color: BLUE }}>{form.brands.length} selected</span>
        </div>
        {errors.brands && <p className="text-xs text-red-500 mb-3">{errors.brands}</p>}
        <div className="grid grid-cols-4 gap-3">
          {BRANDS.map(brand => {
            const selected = form.brands.includes(brand.id);
            return (
              <button key={brand.id} onClick={() => toggleBrand(brand.id)}
                className={`relative p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${selected ? "border-blue-400 bg-blue-50 shadow-sm" : `bg-gradient-to-b ${brand.color} border-transparent hover:border-blue-200`}`}>
                {selected && (
                  <div className="absolute top-2 right-2 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                    <Check size={9} className="text-white" />
                  </div>
                )}
                <div className="w-9 h-9 bg-white rounded-xl flex items-center justify-center shadow-sm">
                  <brand.Icon size={16} className={brand.iconColor} />
                </div>
                <span className="text-xs font-semibold text-slate-700">{brand.name}</span>
              </button>
            );
          })}
        </div>
      </Card>

      {wallet < estimatedCost && (
        <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 text-xs rounded-xl p-3">
          <AlertCircle size={13} /> Your wallet balance may be too low. <button onClick={() => setPage("wallet")} className="font-bold underline">Add credits</button>
        </div>
      )}

      <div className="flex justify-between">
        <Btn variant="outline" onClick={() => setPage("dashboard")}>Cancel</Btn>
        <Btn variant="primary" onClick={next}>Next: Add Recipients <ArrowRight size={14} /></Btn>
      </div>
    </div>
  );
}

// ─── ADD RECIPIENTS ───────────────────────────────────────────────────────────

function AddRecipientsPage({ draft, setPage, onDraftSave }) {
  const [recipients, setRecipients] = useState([""]);
  const [csvNote, setCsvNote] = useState(false);

  const updateEmail = (i, val) => setRecipients(r => r.map((e, idx) => idx === i ? val : e));
  const addRow = () => setRecipients(r => [...r, ""]);
  const removeRow = i => setRecipients(r => r.filter((_, idx) => idx !== i));
  const validEmails = recipients.filter(e => e.includes("@"));
  const totalCost = validEmails.length * (parseInt(draft?.amount) || 0);

  const next = () => {
    if (validEmails.length === 0) return;
    onDraftSave({ ...draft, recipients: validEmails });
    setPage("review");
  };

  return (
    <div className="p-6 max-w-3xl space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        {["Campaign Setup", "Add Recipients", "Review & Send"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            {i > 0 && <div className="w-8 h-px bg-slate-200"></div>}
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${i === 1 ? "bg-blue-100 text-blue-700" : i === 0 ? "bg-slate-100 text-slate-400" : "bg-slate-100 text-slate-400"}`}>
              <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${i === 1 ? "bg-blue-500 text-white" : i === 0 ? "bg-emerald-400 text-white" : "bg-slate-300 text-white"}`}>
                {i === 0 ? <Check size={9} /> : i + 1}
              </span>
              {step}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold" style={{ color: DARK }}>Add Recipients</h2>
        <p className="text-sm text-slate-500 mt-0.5">Add the email addresses of people who will receive this gift.</p>
      </div>

      {/* Campaign summary */}
      <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 flex items-center gap-4">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Send size={16} style={{ color: BLUE }} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-bold text-slate-800">{draft?.name || "Campaign"}</p>
          <p className="text-xs text-slate-500">${draft?.amount || 0} per recipient</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-bold" style={{ color: BLUE }}>${totalCost}</p>
          <p className="text-xs text-slate-500">estimated total</p>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-slate-800">Recipient Emails</h3>
          <button onClick={() => setCsvNote(!csvNote)}
            className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 transition-colors border border-slate-200 px-3 py-1.5 rounded-lg hover:border-blue-300 hover:bg-blue-50">
            <Upload size={12} /> Upload CSV
          </button>
        </div>

        {csvNote && (
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-3 mb-4 text-xs text-blue-700 flex items-start gap-2">
            <AlertCircle size={13} className="mt-0.5 flex-shrink-0" />
            CSV upload is simulated in this prototype. Use manual entry below.
          </div>
        )}

        <div className="space-y-2 mb-3">
          {recipients.map((email, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 relative">
                <Mail size={13} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="email" placeholder={`recipient${i + 1}@company.com`} value={email}
                  onChange={e => updateEmail(i, e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 placeholder-slate-400"
                />
              </div>
              {recipients.length > 1 && (
                <button onClick={() => removeRow(i)} className="w-8 h-8 rounded-xl bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 flex items-center justify-center transition-all">
                  <Trash2 size={13} />
                </button>
              )}
              {email.includes("@") && (
                <div className="w-6 h-6 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check size={11} className="text-emerald-600" />
                </div>
              )}
            </div>
          ))}
        </div>

        <button onClick={addRow}
          className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-blue-600 transition-colors py-2">
          <Plus size={14} /> Add another recipient
        </button>

        {validEmails.length > 0 && (
          <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-sm">
            <span className="text-slate-600"><span className="font-bold text-slate-900">{validEmails.length}</span> valid recipient{validEmails.length !== 1 ? "s" : ""}</span>
            <span className="font-bold" style={{ color: BLUE }}>Estimated total: ${totalCost}</span>
          </div>
        )}
      </Card>

      <div className="flex justify-between">
        <Btn variant="outline" onClick={() => setPage("create-campaign")}><ArrowLeft size={14} /> Back</Btn>
        <Btn variant="primary" onClick={next} disabled={validEmails.length === 0}>
          Next: Review <ArrowRight size={14} />
        </Btn>
      </div>
    </div>
  );
}

// ─── REVIEW PAGE ──────────────────────────────────────────────────────────────

function ReviewPage({ draft, setPage, wallet, onSend }) {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  if (!draft) return null;
  const total = (draft.recipients?.length || 0) * (parseInt(draft.amount) || 0);

  const handleSend = async () => {
    setSending(true);
    await new Promise(r => setTimeout(r, 1800));
    setSending(false);
    setSent(true);
    onSend(draft, total);
  };

  if (sent) {
    return (
      <div className="p-6 max-w-2xl">
        <div className="text-center py-16">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={36} className="text-emerald-500" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: DARK, letterSpacing: "-0.5px" }}>Campaign Sent! 🎉</h2>
          <p className="text-slate-500 mb-2">Your campaign <span className="font-semibold text-slate-800">"{draft.name}"</span> has been sent.</p>
          <p className="text-sm text-slate-400 mb-8">{draft.recipients?.length} recipients will receive their gift email shortly.</p>
          <div className="flex justify-center gap-3">
            <Btn variant="outline" onClick={() => setPage("campaigns")}>View Campaigns</Btn>
            <Btn variant="primary" onClick={() => setPage("dashboard")}>Back to Dashboard</Btn>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 max-w-3xl space-y-6">
      {/* Progress */}
      <div className="flex items-center gap-2 mb-2">
        {["Campaign Setup", "Add Recipients", "Review & Send"].map((step, i) => (
          <div key={step} className="flex items-center gap-2">
            {i > 0 && <div className="w-8 h-px bg-slate-200"></div>}
            <div className={`flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${i === 2 ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-400"}`}>
              <span className={`w-4 h-4 rounded-full text-xs flex items-center justify-center ${i < 2 ? "bg-emerald-400 text-white" : "bg-blue-500 text-white"}`}>
                {i < 2 ? <Check size={9} /> : "3"}
              </span>
              {step}
            </div>
          </div>
        ))}
      </div>

      <div>
        <h2 className="text-xl font-bold" style={{ color: DARK }}>Review & Send</h2>
        <p className="text-sm text-slate-500 mt-0.5">Double-check everything before sending your campaign.</p>
      </div>

      <Card className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-slate-800">Campaign Details</h3>
          <button onClick={() => setPage("create-campaign")} className="text-xs font-semibold flex items-center gap-1 hover:underline" style={{ color: BLUE }}>
            <Edit2 size={11} /> Edit
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div><p className="text-slate-400 text-xs mb-0.5">Campaign Name</p><p className="font-semibold text-slate-800">{draft.name}</p></div>
          <div><p className="text-slate-400 text-xs mb-0.5">Gift Amount</p><p className="font-semibold text-slate-800">${draft.amount} per recipient</p></div>
          <div className="col-span-2"><p className="text-slate-400 text-xs mb-0.5">Description</p><p className="font-semibold text-slate-800">{draft.description || "—"}</p></div>
        </div>
        <div className="pt-3 border-t border-slate-100">
          <p className="text-slate-400 text-xs mb-2">Selected Brands</p>
          <div className="flex flex-wrap gap-2">
            {draft.brands.map(bid => {
              const brand = BRANDS.find(b => b.id === bid);
              return brand ? (
                <div key={bid} className={`flex items-center gap-1.5 bg-gradient-to-b ${brand.color} border rounded-lg px-2.5 py-1`}>
                  <brand.Icon size={11} className={brand.iconColor} />
                  <span className="text-xs font-medium text-slate-700">{brand.name}</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-bold text-slate-800">Recipients</h3>
          <button onClick={() => setPage("add-recipients")} className="text-xs font-semibold flex items-center gap-1 hover:underline" style={{ color: BLUE }}>
            <Edit2 size={11} /> Edit
          </button>
        </div>
        <div className="space-y-1.5 mb-4 max-h-40 overflow-y-auto">
          {draft.recipients?.map((email, i) => (
            <div key={i} className="flex items-center gap-2 py-1.5">
              <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold" style={{ color: BLUE }}>
                {email[0]?.toUpperCase()}
              </div>
              <span className="text-sm text-slate-700">{email}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 border-t border-slate-100 flex justify-between text-sm">
          <span className="text-slate-600">{draft.recipients?.length} recipients</span>
          <span className="font-bold" style={{ color: DARK }}>Total: ${total}</span>
        </div>
      </Card>

      {/* Cost summary */}
      <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
        <div className="flex justify-between items-center text-sm mb-2">
          <span className="text-slate-600">Gift amount ({draft.recipients?.length} × ${draft.amount})</span>
          <span className="font-semibold">${total}</span>
        </div>
        <div className="flex justify-between items-center text-sm mb-3">
          <span className="text-slate-600">Platform fee</span>
          <span className="font-semibold text-emerald-600">Free</span>
        </div>
        <div className="flex justify-between items-center font-bold border-t border-slate-200 pt-3">
          <span>Total charged</span>
          <span className="text-lg" style={{ color: DARK }}>${total}</span>
        </div>
        <div className="flex justify-between items-center text-xs mt-2 text-slate-400">
          <span>Remaining balance after send</span>
          <span>${(wallet - total).toLocaleString()}</span>
        </div>
      </div>

      {wallet < total && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-xs rounded-xl p-3">
          <AlertCircle size={13} /> Insufficient balance. <button onClick={() => setPage("wallet")} className="font-bold underline">Add credits</button> to continue.
        </div>
      )}

      <div className="flex justify-between">
        <Btn variant="outline" onClick={() => setPage("add-recipients")}><ArrowLeft size={14} /> Back</Btn>
        <Btn variant="primary" size="lg" onClick={handleSend} disabled={sending || wallet < total} className="min-w-40">
          {sending ? (
            <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> Sending...</span>
          ) : (
            <><Send size={15} /> Send Campaign</>
          )}
        </Btn>
      </div>
    </div>
  );
}

// ─── SETTINGS PAGE ────────────────────────────────────────────────────────────

function SettingsPage({ user }) {
  return (
    <div className="p-6 max-w-2xl space-y-6">
      <div>
        <h2 className="text-xl font-bold" style={{ color: DARK }}>Settings</h2>
        <p className="text-sm text-slate-500 mt-0.5">Manage your account and company preferences.</p>
      </div>

      <Card className="p-6 space-y-4">
        <h3 className="font-bold text-slate-800">Profile</h3>
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <div className="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-xl font-bold" style={{ color: BLUE }}>
            {user.name.split(" ").map(n => n[0]).join("")}
          </div>
          <div>
            <p className="font-bold text-slate-900">{user.name}</p>
            <p className="text-sm text-slate-500">{user.email}</p>
            <p className="text-sm text-slate-500">{user.company}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Full Name" value={user.name} onChange={() => {}} />
          <Input label="Company" value={user.company} onChange={() => {}} />
          <Input label="Email" type="email" value={user.email} onChange={() => {}} className="col-span-2" />
        </div>
        <Btn variant="primary">Save Changes</Btn>
      </Card>

      <Card className="p-6 space-y-3">
        <h3 className="font-bold text-slate-800">Security</h3>
        <div className="flex items-center justify-between py-2">
          <div>
            <p className="text-sm font-medium text-slate-800">Password</p>
            <p className="text-xs text-slate-400">Last changed 30 days ago</p>
          </div>
          <Btn variant="outline" size="sm">Change Password</Btn>
        </div>
        <div className="flex items-center justify-between py-2 border-t border-slate-100">
          <div>
            <p className="text-sm font-medium text-slate-800">Two-Factor Authentication</p>
            <p className="text-xs text-slate-400">Add an extra layer of security</p>
          </div>
          <Btn variant="outline" size="sm">Enable 2FA</Btn>
        </div>
      </Card>

      <Card className="p-6 space-y-3">
        <h3 className="font-bold text-slate-800">Notifications</h3>
        {["Campaign sent confirmation", "Recipient redemption updates", "Low balance alerts", "Weekly summary report"].map(n => (
          <div key={n} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0">
            <p className="text-sm text-slate-700">{n}</p>
            <div className="w-10 h-5 bg-blue-500 rounded-full relative cursor-pointer">
              <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── RECIPIENTS PAGE ──────────────────────────────────────────────────────────

function RecipientsPage({ campaigns }) {
  const allRecipients = [...new Set(campaigns.flatMap(c => c.recipients))];
  return (
    <div className="p-6 max-w-3xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold" style={{ color: DARK }}>Recipients</h2>
          <p className="text-sm text-slate-500 mt-0.5">{allRecipients.length} unique recipients across all campaigns</p>
        </div>
      </div>
      <Card className="p-5">
        <div className="space-y-2">
          {allRecipients.map((email, i) => {
            const campaignCount = campaigns.filter(c => c.recipients.includes(email)).length;
            return (
              <div key={i} className="flex items-center gap-3 py-2.5 border-b border-slate-50 last:border-0">
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-sm font-bold" style={{ color: BLUE }}>
                  {email[0].toUpperCase()}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-800">{email}</p>
                  <p className="text-xs text-slate-400">{campaignCount} campaign{campaignCount !== 1 ? "s" : ""}</p>
                </div>
                <Badge color="green"><Check size={10} /> Active</Badge>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ─── EMAIL PREVIEW / REDEMPTION FLOW ─────────────────────────────────────────

function EmailPreviewModal({ campaign, onClose, onRedeem }) {
  const [step, setStep] = useState("email"); // email | choose | confirmed
  const [chosen, setChosen] = useState(null);

  const brandObjs = BRANDS.filter(b => campaign.brands.includes(b.id));

  if (step === "confirmed") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
        <Card className="w-full max-w-md p-8 text-center">
          <div className="w-16 h-16 bg-emerald-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <CheckCircle size={28} className="text-emerald-500" />
          </div>
          <GiftableLogo height={26} />
          <h3 className="text-xl font-bold mt-4 mb-2" style={{ color: DARK }}>Your gift card is on its way! 🎉</h3>
          <p className="text-sm text-slate-500 mb-2">
            Your <span className="font-semibold text-slate-700">{BRANDS.find(b => b.id === chosen)?.name}</span> gift card worth <span className="font-semibold text-slate-700">${campaign.amount}</span> has been delivered to your inbox.
          </p>
          <p className="text-xs text-slate-400 mb-6">Check your email for the redemption code and instructions.</p>
          <div className="flex gap-2 justify-center text-xs text-slate-400">
            <Shield size={12} /> Powered by Giftable · Secure & Instant
          </div>
          <Btn variant="primary" className="mt-6 w-full" onClick={onClose}>Close Preview</Btn>
        </Card>
      </div>
    );
  }

  if (step === "choose") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
        <Card className="w-full max-w-lg">
          <div className="p-6 border-b border-slate-100">
            <div className="flex items-center justify-between mb-1">
              <GiftableLogo height={26} />
              <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={18} /></button>
            </div>
            <h3 className="text-lg font-bold mt-4" style={{ color: DARK }}>Choose your gift card</h3>
            <p className="text-sm text-slate-500">You have a <span className="font-bold text-slate-800">${campaign.amount} gift</span> to redeem. Pick the brand you love.</p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3 mb-4">
              {brandObjs.map(brand => (
                <button key={brand.id} onClick={() => setChosen(brand.id)}
                  className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all ${chosen === brand.id ? "border-blue-400 bg-blue-50" : `bg-gradient-to-b ${brand.color} border-transparent hover:border-blue-200`}`}>
                  {chosen === brand.id && <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0"><Check size={8} className="text-white" /></div>}
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm flex-shrink-0">
                    <brand.Icon size={15} className={brand.iconColor} />
                  </div>
                  <span className="text-sm font-semibold text-slate-700">{brand.name}</span>
                </button>
              ))}
            </div>
            <Btn variant="primary" size="lg" className="w-full" disabled={!chosen} onClick={() => setStep("confirmed")}>
              Confirm — Get my {chosen ? BRANDS.find(b => b.id === chosen)?.name : "gift"} card <ArrowRight size={14} />
            </Btn>
          </div>
        </Card>
      </div>
    );
  }

  // Email preview
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }}>
      <div className="w-full max-w-lg">
        {/* Email chrome */}
        <div className="bg-white rounded-t-2xl px-5 py-3 border-b border-slate-100 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500">📧 Recipient Email Preview</span>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
        </div>
        {/* Email body */}
        <div className="bg-slate-50 rounded-b-2xl overflow-hidden border border-t-0 border-slate-200">
          <div className="bg-white px-5 py-3 border-b border-slate-100 text-xs text-slate-500 space-y-0.5">
            <div><span className="font-medium text-slate-700">From:</span> gifts@giftable.io</div>
            <div><span className="font-medium text-slate-700">Subject:</span> 🎁 You've received a gift from {campaign.company || "BrightWave Labs"}!</div>
          </div>
          <div className="p-6 space-y-5">
            <div className="text-center">
              <GiftableLogo height={28} />
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ background: `linear-gradient(135deg, ${BLUE}, ${CORAL})` }}>
                <Gift size={26} className="text-white" />
              </div>
              <h2 className="text-xl font-bold mb-1" style={{ color: DARK }}>You've received a gift! 🎉</h2>
              <p className="text-sm text-slate-600">
                <span className="font-semibold">BrightWave Labs</span> has sent you a <span className="font-bold">${campaign.amount} gift card</span> as part of their <span className="italic">{campaign.name}</span> campaign.
              </p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 text-center">
              <p className="text-2xl font-bold mb-1" style={{ color: DARK }}>${campaign.amount}</p>
              <p className="text-xs text-slate-500">to spend at your favorite brands</p>
              <div className="flex justify-center gap-2 mt-3">
                {brandObjs.slice(0, 4).map(b => (
                  <div key={b.id} className={`w-8 h-8 bg-gradient-to-b ${b.color} border rounded-lg flex items-center justify-center`}>
                    <b.Icon size={13} className={b.iconColor} />
                  </div>
                ))}
              </div>
            </div>
            <button onClick={() => setStep("choose")}
              className="w-full py-3.5 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90"
              style={{ background: `linear-gradient(135deg, ${BLUE}, ${CORAL})` }}>
              Choose Your Gift Card →
            </button>
            <p className="text-center text-xs text-slate-400">
              This gift was sent via <span style={{ color: BLUE }}>giftable.io</span> · Questions? Contact gifts@giftable.io
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── APP SHELL (authenticated) ────────────────────────────────────────────────

function AppShell({ user, onLogout }) {
  const [page, setPage] = useState("dashboard");
  const [wallet, setWallet] = useState(3850);
  const [campaigns, setCampaigns] = useState(SEED_CAMPAIGNS.map(c => ({ ...c, company: user.company })));
  const [draft, setDraft] = useState(null);
  const [activeCampaign, setActiveCampaign] = useState(null);
  const [emailPreview, setEmailPreview] = useState(null);

  const pageTitle = {
    dashboard: "Dashboard", campaigns: "Campaigns", "campaign-detail": "Campaign Detail",
    wallet: "Wallet", "create-campaign": "Create Campaign", "add-recipients": "Add Recipients",
    review: "Review & Send", settings: "Settings", recipients: "Recipients",
  }[page] || "Giftable";

  const saveDraft = data => setDraft(prev => ({ ...prev, ...data }));

  const handleSend = (d, total) => {
    const newCampaign = {
      id: Date.now(),
      name: d.name, description: d.description || "",
      amount: parseInt(d.amount), brands: d.brands,
      recipients: d.recipients, status: "sent",
      sentAt: new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
      total, company: user.company,
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    setWallet(w => w - total);
  };

  const renderPage = () => {
    switch (page) {
      case "dashboard":    return <DashboardPage user={user} wallet={wallet} campaigns={campaigns} setPage={setPage} setActiveCampaign={setActiveCampaign} />;
      case "campaigns":    return <CampaignsPage campaigns={campaigns} setPage={setPage} setActiveCampaign={setActiveCampaign} />;
      case "campaign-detail": return <CampaignDetailPage campaign={activeCampaign} setPage={setPage} onPreviewEmail={setEmailPreview} />;
      case "wallet":       return <WalletPage wallet={wallet} setWallet={setWallet} />;
      case "create-campaign": return <CreateCampaignPage setPage={setPage} wallet={wallet} onDraftSave={saveDraft} />;
      case "add-recipients":  return <AddRecipientsPage draft={draft} setPage={setPage} onDraftSave={saveDraft} />;
      case "review":       return <ReviewPage draft={draft} setPage={setPage} wallet={wallet} onSend={handleSend} />;
      case "settings":     return <SettingsPage user={user} />;
      case "recipients":   return <RecipientsPage campaigns={campaigns} />;
      default:             return <DashboardPage user={user} wallet={wallet} campaigns={campaigns} setPage={setPage} setActiveCampaign={setActiveCampaign} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden" style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif" }}>
      <Sidebar page={page} setPage={setPage} user={user} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar title={pageTitle} user={user} wallet={wallet} onAddCredits={() => setPage("wallet")} />
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
      </div>
      {emailPreview && (
        <EmailPreviewModal campaign={emailPreview} onClose={() => setEmailPreview(null)} />
      )}
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────

export default function GiftableApp() {
  const [screen, setScreen] = useState("landing"); // landing | login | register | app
  const [user, setUser] = useState(null);

  const handleRegister = (data) => {
    setUser({ ...data, email: data.email });
    setScreen("app");
  };

  const handleLogin = () => {
    setUser({ name: "Sarah Chen", email: "sarah@brightwave.io", company: "BrightWave Labs" });
    setScreen("app");
  };

  const handleLogout = () => {
    setUser(null);
    setScreen("landing");
  };

  if (screen === "app" && user) {
    return <AppShell user={user} onLogout={handleLogout} />;
  }

  return (
    <div style={{ fontFamily: "'DM Sans','Helvetica Neue',Arial,sans-serif" }}>
      {screen === "landing"  && <LandingPage setPage={setScreen} />}
      {screen === "register" && <RegisterPage setPage={setScreen} onRegister={handleRegister} />}
      {screen === "login"    && <LoginPage setPage={setScreen} onLogin={handleLogin} />}
    </div>
  );
}
