import { useState, useEffect, useRef } from "react";

// ==================== CONSTANTS ====================
const ADMIN_EMAILS = ["oilandinformation12333@gmail.com", "alisaifaldeen12@gmail.com"];

const ENGINEERING_SECTIONS = [
  {
    id: "heat-transfer",
    title: "انتقال الحرارة",
    titleEn: "Heat Transfer",
    icon: "🔥",
    color: "#FF6B35",
    gradient: "linear-gradient(135deg, #FF6B35, #FF8C61)",
    sources: ["Holman - Heat Transfer", "Incropera - Fundamentals of Heat and Mass Transfer", "Cengel - Heat Transfer"],
    topics: ["التوصيل الحراري", "الحمل الحراري", "الإشعاع", "المبادلات الحرارية", "الغلي والتكثيف"],
  },
  {
    id: "mass-transfer",
    title: "انتقال الكتلة",
    titleEn: "Mass Transfer",
    icon: "⚗️",
    color: "#4ECDC4",
    gradient: "linear-gradient(135deg, #4ECDC4, #44A08D)",
    sources: ["Treybal - Mass Transfer Operations", "Geankoplis - Transport Processes", "Unit Operations - McCabe"],
    topics: ["الانتشار", "الامتصاص", "التقطير", "الاستخلاص", "الامتزاز"],
  },
  {
    id: "fluid-flow",
    title: "جريان الموائع",
    titleEn: "Fluid Flow",
    icon: "🌊",
    color: "#3B82F6",
    gradient: "linear-gradient(135deg, #3B82F6, #1D4ED8)",
    sources: ["Munson - Fundamentals of Fluid Mechanics", "White - Fluid Mechanics", "Unit Operations - McCabe"],
    topics: ["معادلة برنولي", "جريان لامينار وتوربولنت", "الأنابيب والمضخات", "العدد رينولدز", "ميكانيكا الموائع الحسابية"],
  },
  {
    id: "separation",
    title: "عمليات الفصل",
    titleEn: "Separation Processes",
    icon: "🧪",
    color: "#8B5CF6",
    gradient: "linear-gradient(135deg, #8B5CF6, #6D28D9)",
    sources: ["Seader - Separation Process Principles", "King - Separation Processes", "Unit Operations - McCabe"],
    topics: ["التقطير", "الامتصاص والتجريد", "الاستخلاص بالمذيب", "التبخير", "الترشيح والطرد المركزي"],
  },
  {
    id: "design",
    title: "تصميم المفاعلات والعمليات",
    titleEn: "Process & Reactor Design",
    icon: "⚙️",
    color: "#F59E0B",
    gradient: "linear-gradient(135deg, #F59E0B, #D97706)",
    sources: ["Coulson & Richardson - Chemical Engineering Design", "Towler - Chemical Engineering Design", "Levenspiel - Chemical Reaction Engineering"],
    topics: ["تصميم المفاعلات", "تحسين العمليات", "تقييم الاقتصادي", "السلامة والموثوقية", "HAZOP"],
  },
  {
    id: "gas-petro",
    title: "هندسة عمليات الغاز والبتروكيمياويات",
    titleEn: "Gas & Petrochemicals Engineering",
    icon: "🏭",
    color: "#10B981",
    gradient: "linear-gradient(135deg, #10B981, #059669)",
    sources: ["Heppler & Staudt - Gas Processing", "Arnold & Stewart - Surface Production Operations", "Campbell - Gas Conditioning and Processing"],
    topics: ["معالجة الغاز الطبيعي", "عمليات تكرير النفط", "البتروكيمياويات", "LNG وLPG", "حفظ الضغط والتدفق"],
  },
];

const COURSES = [
  {
    id: 1,
    title: "دورة إنتاج المنظفات",
    description: "تعلم أساسيات وتقنيات إنتاج المنظفات الصناعية والمنزلية من المواد الخام حتى المنتج النهائي",
    originalPrice: 35,
    currentPrice: 10,
    icon: "🧴",
    duration: "8 ساعات",
    level: "متوسط",
  },
  {
    id: 2,
    title: "جهاز UV-Visible لقياس التركيز العضوي",
    description: "دورة شاملة في استخدام مطياف الأشعة فوق البنفسجية والمرئية لقياس تركيز المركبات العضوية",
    originalPrice: 35,
    currentPrice: 10,
    icon: "🔬",
    duration: "6 ساعات",
    level: "متقدم",
  },
];

const SOCIAL_LINKS = [
  { name: "قناة تيليغرام العامة", url: "https://t.me/chemicallyengineer", icon: "📢", color: "#0088cc" },
  { name: "منصة GoT التعليمية", url: "https://t.me/GoT_information", icon: "📚", color: "#0088cc" },
  { name: "إنستغرام الهيئة", url: "https://www.instagram.com/chemical_authority", icon: "📸", color: "#E1306C" },
  { name: "إنستغرام GoT", url: "https://www.instagram.com/chemically_information", icon: "📸", color: "#E1306C" },
  { name: "لينكدإن", url: "https://www.linkedin.com/in/chemical-engineer-trainee-engineer-241630373", icon: "💼", color: "#0077B5" },
  { name: "المركز التدريبي", url: "https://t.me/chemicaltrainee", icon: "🎓", color: "#0088cc" },
];

const SAMPLE_JOBS = [
  { id: 1, title: "مهندس كيميائي - مصفى البصرة", company: "شركة نفط البصرة", location: "البصرة", salary: "2,500,000 - 3,500,000 د.ع", type: "دوام كامل", posted: "منذ يومين" },
  { id: 2, title: "مهندس عمليات - مصنع الأسمدة", company: "الشركة العامة للأسمدة الجنوبية", location: "البصرة", salary: "2,000,000 - 2,800,000 د.ع", type: "دوام كامل", posted: "منذ 3 أيام" },
  { id: 3, title: "مشرف جودة - صناعة البتروكيمياء", company: "مجموعة صناعات البتروكيمياء", location: "البصرة / العراق", salary: "1,800,000 - 2,500,000 د.ع", type: "دوام كامل", posted: "منذ أسبوع" },
  { id: 4, title: "مهندس سلامة HSE", company: "شركة لوك أويل", location: "الرميلة، البصرة", salary: "$1,500 - $2,500", type: "دوام كامل", posted: "منذ 4 أيام" },
  { id: 5, title: "باحث في مجال الطاقة المتجددة", company: "وزارة النفط - مركز البحوث", location: "بغداد / البصرة", salary: "حسب الاتفاق", type: "دوام كامل", posted: "منذ يوم" },
];

const COMMUNITY_MEMBERS = [
  { id: 1, name: "م. أحمد حسين الجابري", title: "مهندس عمليات - شركة BP", location: "البصرة", hobby: "كرة القدم والقراءة", avatar: "أ", color: "#3B82F6" },
  { id: 2, name: "م. زينب علي المحمداوي", title: "مهندسة كيميائية - وزارة النفط", location: "البصرة", hobby: "الرسم والطبيعة", avatar: "ز", color: "#8B5CF6" },
  { id: 3, name: "م. كريم جاسم العامري", title: "مدير مختبر - مصفى الجنوب", location: "البصرة", hobby: "البرمجة والتقنية", avatar: "ك", color: "#10B981" },
];

// ==================== STORAGE (localStorage simulation with state) ====================
function useStorage(key, defaultValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = window._appStorage?.[key];
      return item !== undefined ? item : defaultValue;
    } catch { return defaultValue; }
  });
  const set = (v) => {
    if (!window._appStorage) window._appStorage = {};
    window._appStorage[key] = v;
    setValue(v);
  };
  return [value, set];
}

// ==================== AI CHAT COMPONENT ====================
function AIChat({ section, onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: `مرحباً! أنا مساعدك الذكي في مجال ${section?.title || "الهندسة الكيميائية"}. يمكنك سؤالي عن أي موضوع هندسي وسأجيبك مستعيناً بأفضل المصادر الهندسية المتخصصة.` }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
  const messagesEnd = useRef(null);
  const fileRef = useRef(null);

  useEffect(() => { messagesEnd.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() && !image) return;
    const userMsg = { role: "user", content: input, image };
    setMessages(m => [...m, userMsg]);
    setInput("");
    setImage(null);
    setLoading(true);

    try {
      const systemPrompt = `أنت مساعد هندسي متخصص في الهندسة الكيميائية، متخصص في ${section?.title || "الهندسة الكيميائية"}. 
استند في إجاباتك على أفضل المصادر الهندسية مثل: ${section?.sources?.join(", ") || "Holman, McCabe, Coulson & Richardson"}.
أجب باللغة العربية بشكل احترافي ومفصل. اذكر المعادلات والمعايير الهندسية عند الحاجة.
أنت تمثل منصة G&OT Engineering - الهيئة العامة للمهندسين الكيميائيين في البصرة.`;

      const contentArr = [{ type: "text", text: input || "ماذا يوجد في هذه الصورة؟ حللها هندسياً." }];
      if (image) {
        contentArr.unshift({ type: "image", source: { type: "base64", media_type: image.type, data: image.data } });
      }

      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: contentArr }],
        }),
      });
      const data = await response.json();
      const text = data.content?.map(c => c.text || "").join("") || "عذراً، حدث خطأ في الاستجابة.";
      setMessages(m => [...m, { role: "assistant", content: text }]);
    } catch {
      setMessages(m => [...m, { role: "assistant", content: "عذراً، حدث خطأ في الاتصال. يرجى المحاولة مرة أخرى." }]);
    }
    setLoading(false);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const base64 = ev.target.result.split(",")[1];
      setImage({ data: base64, type: file.type, name: file.name });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000, backdropFilter: "blur(8px)" }}>
      <div style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 20, width: "min(700px, 95vw)", height: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 25px 80px rgba(0,0,0,0.8)" }}>
        <div style={{ padding: "20px 24px", borderBottom: "1px solid #1E3A5F", display: "flex", justifyContent: "space-between", alignItems: "center", background: section?.gradient || "linear-gradient(135deg,#1E3A5F,#0F2447)", borderRadius: "20px 20px 0 0" }}>
          <div>
            <div style={{ fontWeight: 700, color: "#fff", fontSize: 18 }}>{section?.icon} {section?.title || "اسأل مهندساً كيميائياً"}</div>
            <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>مدعوم بالذكاء الاصطناعي • {section?.sources?.[0] || "المصادر الهندسية المتخصصة"}</div>
          </div>
          <button onClick={onClose} style={{ background: "rgba(255,255,255,0.15)", border: "none", color: "#fff", width: 36, height: 36, borderRadius: "50%", cursor: "pointer", fontSize: 18 }}>✕</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((msg, i) => (
            <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
              {msg.role === "assistant" && (
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, marginLeft: 10, flexShrink: 0 }}>🤖</div>
              )}
              <div style={{ maxWidth: "75%", background: msg.role === "user" ? "linear-gradient(135deg,#1E3A5F,#1D4ED8)" : "#1E293B", borderRadius: msg.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", padding: "12px 16px", color: "#E2E8F0", fontSize: 14, lineHeight: 1.7, border: "1px solid rgba(255,255,255,0.05)" }}>
                {msg.image && <div style={{ marginBottom: 8, color: "#60A5FA", fontSize: 12 }}>📎 {msg.image.name}</div>}
                <div style={{ whiteSpace: "pre-wrap", direction: "rtl", textAlign: "right" }}>{msg.content}</div>
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>🤖</div>
              <div style={{ background: "#1E293B", borderRadius: "18px 18px 18px 4px", padding: "12px 20px", display: "flex", gap: 6 }}>
                {[0,1,2].map(j => <div key={j} style={{ width: 8, height: 8, borderRadius: "50%", background: "#3B82F6", animation: `bounce 1.2s ${j*0.2}s infinite` }} />)}
              </div>
            </div>
          )}
          <div ref={messagesEnd} />
        </div>

        {image && (
          <div style={{ padding: "8px 20px", background: "#1E293B", display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#60A5FA", fontSize: 13 }}>📎 {image.name}</span>
            <button onClick={() => setImage(null)} style={{ background: "none", border: "none", color: "#EF4444", cursor: "pointer" }}>✕</button>
          </div>
        )}

        <div style={{ padding: "16px 20px", borderTop: "1px solid #1E3A5F", display: "flex", gap: 10, alignItems: "flex-end" }}>
          <button onClick={() => fileRef.current?.click()} style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12, color: "#60A5FA", width: 44, height: 44, cursor: "pointer", fontSize: 18, flexShrink: 0 }} title="إرسال صورة">📎</button>
          <input ref={fileRef} type="file" accept="image/*" onChange={handleImage} style={{ display: "none" }} />
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); } }}
            placeholder="اكتب سؤالك الهندسي هنا... (Enter للإرسال)"
            style={{ flex: 1, background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: "12px 16px", color: "#E2E8F0", resize: "none", minHeight: 44, maxHeight: 120, fontSize: 14, outline: "none", direction: "rtl", fontFamily: "inherit" }}
            rows={1}
          />
          <button onClick={sendMessage} disabled={loading} style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 12, color: "#fff", width: 44, height: 44, cursor: "pointer", fontSize: 20, flexShrink: 0, opacity: loading ? 0.5 : 1 }}>➤</button>
        </div>
      </div>
    </div>
  );
}

// ==================== AUTH MODAL ====================
function AuthModal({ mode, onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(mode === "login");
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setError("");
    if (!form.email || !form.password) { setError("يرجى ملء جميع الحقول"); return; }
    if (!isLogin && form.password !== form.confirm) { setError("كلمتا المرور غير متطابقتين"); return; }
    if (!isLogin && !form.name) { setError("يرجى إدخال الاسم"); return; }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    const isAdmin = ADMIN_EMAILS.includes(form.email.toLowerCase());
    const userData = {
      name: form.name || form.email.split("@")[0],
      email: form.email,
      isAdmin,
      joinDate: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    };
    onLogin(userData);
    setLoading(false);
    onClose();
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2000, backdropFilter: "blur(10px)" }}>
      <div style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 24, padding: 40, width: "min(440px,95vw)", boxShadow: "0 40px 100px rgba(0,0,0,0.9)" }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 48, marginBottom: 8 }}>⚗️</div>
          <h2 style={{ color: "#fff", margin: 0, fontSize: 24, fontWeight: 700 }}>{isLogin ? "تسجيل الدخول" : "إنشاء حساب"}</h2>
          <p style={{ color: "#64748B", margin: "8px 0 0", fontSize: 14 }}>منصة G&OT Engineering</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {!isLogin && (
            <input value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} placeholder="الاسم الكامل" style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none", direction: "rtl", width: "100%", boxSizing: "border-box" }} />
          )}
          <input value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} placeholder="البريد الإلكتروني" type="email" style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none", direction: "ltr", width: "100%", boxSizing: "border-box" }} />
          <input value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} placeholder="كلمة المرور" type="password" style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none", direction: "ltr", width: "100%", boxSizing: "border-box" }} />
          {!isLogin && (
            <input value={form.confirm} onChange={e => setForm(f => ({...f, confirm: e.target.value}))} placeholder="تأكيد كلمة المرور" type="password" style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: "14px 16px", color: "#fff", fontSize: 14, outline: "none", direction: "ltr", width: "100%", boxSizing: "border-box" }} />
          )}
          {error && <div style={{ color: "#EF4444", fontSize: 13, textAlign: "center", background: "rgba(239,68,68,0.1)", padding: "10px 16px", borderRadius: 8 }}>{error}</div>}
          <button onClick={handleSubmit} disabled={loading} style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 12, padding: "14px", color: "#fff", fontSize: 16, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>
            {loading ? "جاري المعالجة..." : isLogin ? "دخول" : "إنشاء الحساب"}
          </button>
          <p style={{ color: "#64748B", textAlign: "center", margin: 0, fontSize: 13 }}>
            {isLogin ? "ليس لديك حساب؟ " : "لديك حساب؟ "}
            <span onClick={() => setIsLogin(!isLogin)} style={{ color: "#3B82F6", cursor: "pointer" }}>{isLogin ? "سجّل الآن" : "سجّل دخولك"}</span>
          </p>
        </div>
        <button onClick={onClose} style={{ position: "absolute", top: 16, left: 16, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", width: 32, height: 32, borderRadius: "50%", cursor: "pointer" }}>✕</button>
      </div>
    </div>
  );
}

// ==================== ADMIN DASHBOARD ====================
function AdminDashboard({ users, videos, onAddVideo, onClose }) {
  const [tab, setTab] = useState("users");
  const [videoForm, setVideoForm] = useState({ title: "", url: "", section: "", price: 0, isFree: true, description: "" });

  const tabs = [
    { id: "users", label: "المستخدمون", icon: "👥" },
    { id: "videos", label: "الفيديوات", icon: "🎬" },
    { id: "stats", label: "الإحصائيات", icon: "📊" },
    { id: "messages", label: "الرسائل الجماعية", icon: "📨" },
  ];

  return (
    <div style={{ position: "fixed", inset: 0, background: "#060D1A", zIndex: 3000, overflowY: "auto" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 32, borderBottom: "1px solid #1E3A5F", paddingBottom: 20 }}>
          <div>
            <h1 style={{ color: "#fff", margin: 0, fontSize: 28, fontWeight: 800 }}>🛡️ لوحة التحكم</h1>
            <p style={{ color: "#64748B", margin: "4px 0 0", fontSize: 14 }}>منصة G&OT Engineering - صلاحيات المدير</p>
          </div>
          <button onClick={onClose} style={{ background: "#EF4444", border: "none", borderRadius: 10, color: "#fff", padding: "10px 20px", cursor: "pointer", fontWeight: 700 }}>✕ إغلاق</button>
        </div>

        <div style={{ display: "flex", gap: 12, marginBottom: 32, flexWrap: "wrap" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{ background: tab === t.id ? "linear-gradient(135deg,#3B82F6,#1D4ED8)" : "#1E293B", border: "1px solid #334155", borderRadius: 12, color: "#fff", padding: "10px 20px", cursor: "pointer", fontWeight: 600, fontSize: 14 }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {tab === "users" && (
          <div>
            <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>المستخدمون المسجلون ({users.length})</h2>
            <div style={{ display: "grid", gap: 12 }}>
              {users.length === 0 ? (
                <div style={{ background: "#1E293B", borderRadius: 16, padding: 40, textAlign: "center", color: "#64748B" }}>لا يوجد مستخدمون مسجلون بعد</div>
              ) : users.map((u, i) => (
                <div key={i} style={{ background: "#1E293B", borderRadius: 16, padding: "16px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", border: "1px solid #334155" }}>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700 }}>{u.name}</div>
                    <div style={{ color: "#60A5FA", fontSize: 13 }}>{u.email}</div>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ color: "#94A3B8", fontSize: 12 }}>تاريخ الانضمام: {new Date(u.joinDate).toLocaleDateString("ar-IQ")}</div>
                    <div style={{ color: "#94A3B8", fontSize: 12 }}>آخر دخول: {new Date(u.lastLogin).toLocaleDateString("ar-IQ")}</div>
                  </div>
                  <div style={{ background: u.isAdmin ? "#F59E0B" : "#10B981", color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                    {u.isAdmin ? "مدير" : "مستخدم"}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === "videos" && (
          <div>
            <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>إدارة الفيديوات التعليمية</h2>
            <div style={{ background: "#1E293B", borderRadius: 16, padding: 24, marginBottom: 24, border: "1px solid #334155" }}>
              <h3 style={{ color: "#60A5FA", marginTop: 0 }}>➕ إضافة فيديو جديد</h3>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <input value={videoForm.title} onChange={e => setVideoForm(f => ({...f, title: e.target.value}))} placeholder="عنوان الفيديو" style={inputStyle} />
                <input value={videoForm.url} onChange={e => setVideoForm(f => ({...f, url: e.target.value}))} placeholder="رابط الفيديو" style={{...inputStyle, direction: "ltr"}} />
                <select value={videoForm.section} onChange={e => setVideoForm(f => ({...f, section: e.target.value}))} style={inputStyle}>
                  <option value="">اختر القسم</option>
                  {ENGINEERING_SECTIONS.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
                </select>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <label style={{ color: "#94A3B8", display: "flex", alignItems: "center", gap: 8 }}>
                    <input type="checkbox" checked={videoForm.isFree} onChange={e => setVideoForm(f => ({...f, isFree: e.target.checked}))} />
                    مجاني
                  </label>
                  {!videoForm.isFree && <input type="number" value={videoForm.price} onChange={e => setVideoForm(f => ({...f, price: e.target.value}))} placeholder="السعر $" style={{...inputStyle, width: "auto"}} />}
                </div>
              </div>
              <textarea value={videoForm.description} onChange={e => setVideoForm(f => ({...f, description: e.target.value}))} placeholder="وصف الفيديو" style={{...inputStyle, width: "100%", height: 80, marginTop: 12, resize: "vertical"}} />
              <button onClick={() => { onAddVideo(videoForm); setVideoForm({ title: "", url: "", section: "", price: 0, isFree: true, description: "" }); }}
                style={{ marginTop: 12, background: "linear-gradient(135deg,#10B981,#059669)", border: "none", borderRadius: 10, color: "#fff", padding: "12px 24px", cursor: "pointer", fontWeight: 700 }}>
                ✅ إضافة الفيديو
              </button>
            </div>

            {videos.length > 0 && (
              <div style={{ display: "grid", gap: 12 }}>
                {videos.map((v, i) => (
                  <div key={i} style={{ background: "#1E293B", borderRadius: 12, padding: "16px 20px", display: "flex", justifyContent: "space-between", border: "1px solid #334155" }}>
                    <div>
                      <div style={{ color: "#fff", fontWeight: 700 }}>🎬 {v.title}</div>
                      <div style={{ color: "#64748B", fontSize: 13 }}>{ENGINEERING_SECTIONS.find(s => s.id === v.section)?.title}</div>
                    </div>
                    <div style={{ background: v.isFree ? "#10B981" : "#F59E0B", color: "#fff", padding: "4px 12px", borderRadius: 20, fontSize: 12, fontWeight: 700, alignSelf: "center" }}>
                      {v.isFree ? "مجاني" : `$${v.price}`}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === "stats" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))", gap: 20 }}>
            {[
              { label: "إجمالي المستخدمين", value: users.length, icon: "👥", color: "#3B82F6" },
              { label: "الفيديوات المضافة", value: videos.length, icon: "🎬", color: "#8B5CF6" },
              { label: "الأقسام الهندسية", value: ENGINEERING_SECTIONS.length, icon: "📚", color: "#10B981" },
              { label: "الدورات المتاحة", value: COURSES.length, icon: "🎓", color: "#F59E0B" },
              { label: "أعضاء المجتمع", value: "1,500+", icon: "🏛️", color: "#EF4444" },
              { label: "الوظائف المتاحة", value: SAMPLE_JOBS.length, icon: "💼", color: "#06B6D4" },
            ].map((s, i) => (
              <div key={i} style={{ background: "#1E293B", borderRadius: 16, padding: 24, textAlign: "center", border: `1px solid ${s.color}33` }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>{s.icon}</div>
                <div style={{ color: s.color, fontSize: 32, fontWeight: 800 }}>{s.value}</div>
                <div style={{ color: "#94A3B8", fontSize: 13, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {tab === "messages" && (
          <div>
            <h2 style={{ color: "#fff", fontSize: 20, marginBottom: 20 }}>📨 إرسال رسائل جماعية</h2>
            <div style={{ background: "#1E293B", borderRadius: 16, padding: 24, border: "1px solid #334155" }}>
              <p style={{ color: "#94A3B8", lineHeight: 1.7 }}>
                سيتم إرسال الرسائل تلقائياً عند تسجيل كل مستخدم جديد. يمكنك أيضاً إرسال رسائل جماعية لجميع المستخدمين ({users.length} مستخدم).
              </p>
              <textarea placeholder="اكتب رسالتك هنا..." style={{...inputStyle, width: "100%", height: 120, resize: "vertical"}} />
              <button style={{ marginTop: 12, background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 10, color: "#fff", padding: "12px 24px", cursor: "pointer", fontWeight: 700 }}>
                📤 إرسال للجميع
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const inputStyle = { background: "#0F172A", border: "1px solid #334155", borderRadius: 10, padding: "12px 16px", color: "#fff", fontSize: 14, outline: "none", direction: "rtl", width: "100%", boxSizing: "border-box" };

// ==================== MAIN APP ====================
export default function GOTEngineeringPlatform() {
  const [currentUser, setCurrentUser] = useStorage("gotUser", null);
  const [users, setUsers] = useStorage("gotUsers", []);
  const [videos, setVideos] = useStorage("gotVideos", []);
  const [posts, setPosts] = useStorage("gotPosts", []);
  const [activeSection, setActiveSection] = useState("home");
  const [showAuth, setShowAuth] = useState(null);
  const [showAI, setShowAI] = useState(null);
  const [showAdmin, setShowAdmin] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [newPost, setNewPost] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [profileForm, setProfileForm] = useState({ title: "", location: "", hobby: "", workplace: "" });

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    const existing = users.find(u => u.email === userData.email);
    if (!existing) setUsers([...users, userData]);
  };

  const handleAddVideo = (video) => setVideos(v => [...v, { ...video, id: Date.now() }]);

  const handlePost = () => {
    if (!newPost.trim()) return;
    setPosts(p => [{ id: Date.now(), text: newPost, author: currentUser?.name, email: currentUser?.email, date: new Date().toISOString(), likes: 0 }, ...p]);
    setNewPost("");
  };

  const navItems = [
    { id: "home", label: "الرئيسية", icon: "🏠" },
    { id: "sections", label: "الأقسام الهندسية", icon: "📚" },
    { id: "ask", label: "اسأل مهندساً", icon: "💬" },
    { id: "community", label: "المجتمع", icon: "👥" },
    { id: "jobs", label: "الوظائف", icon: "💼" },
    { id: "courses", label: "الدورات", icon: "🎓" },
    { id: "about", label: "من نحن", icon: "ℹ️" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#060D1A", color: "#E2E8F0", fontFamily: "'Cairo', 'Segoe UI', sans-serif", direction: "rtl" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; } ::-webkit-scrollbar-track { background: #0F172A; } ::-webkit-scrollbar-thumb { background: #334155; border-radius: 3px; }
        @keyframes bounce { 0%,80%,100%{transform:scale(0)} 40%{transform:scale(1)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(30px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .nav-item:hover { background: rgba(59,130,246,0.15) !important; }
        .section-card:hover { transform: translateY(-8px); border-color: rgba(59,130,246,0.5) !important; }
        .btn-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(59,130,246,0.4) !important; }
        .job-card:hover { border-color: #3B82F6 !important; transform: translateX(-4px); }
        .course-card:hover { transform: translateY(-6px); }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(6,13,26,0.95)", backdropFilter: "blur(20px)", borderBottom: "1px solid #1E3A5F", padding: "0 24px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 70 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }} onClick={() => setActiveSection("home")}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "linear-gradient(135deg,#1E3A5F,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 900, color: "#fff", border: "2px solid #3B82F6" }}>G</div>
            <div>
              <div style={{ fontWeight: 800, fontSize: 16, color: "#fff", lineHeight: 1 }}>G&OT Engineering</div>
              <div style={{ fontSize: 11, color: "#60A5FA", lineHeight: 1.4 }}>الهيئة العامة للمهندسين الكيميائيين - البصرة</div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", justifyContent: "center" }}>
            {navItems.map(n => (
              <button key={n.id} className="nav-item" onClick={() => setActiveSection(n.id)}
                style={{ background: activeSection === n.id ? "rgba(59,130,246,0.2)" : "transparent", border: activeSection === n.id ? "1px solid #3B82F6" : "1px solid transparent", borderRadius: 10, color: activeSection === n.id ? "#60A5FA" : "#94A3B8", padding: "6px 12px", cursor: "pointer", fontSize: 13, fontWeight: 600, transition: "all 0.2s", fontFamily: "inherit" }}>
                {n.icon} {n.label}
              </button>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            {currentUser ? (
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                {currentUser.isAdmin && (
                  <button onClick={() => setShowAdmin(true)} style={{ background: "linear-gradient(135deg,#F59E0B,#D97706)", border: "none", borderRadius: 10, color: "#fff", padding: "8px 14px", cursor: "pointer", fontWeight: 700, fontSize: 12 }}>🛡️ لوحة التحكم</button>
                )}
                <div style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 10, padding: "6px 14px", color: "#60A5FA", fontSize: 13, fontWeight: 600 }}>👤 {currentUser.name}</div>
                <button onClick={() => setCurrentUser(null)} style={{ background: "#1E293B", border: "1px solid #334155", borderRadius: 10, color: "#94A3B8", padding: "8px 12px", cursor: "pointer", fontSize: 12 }}>خروج</button>
              </div>
            ) : (
              <>
                <button onClick={() => setShowAuth("login")} style={{ background: "transparent", border: "1px solid #334155", borderRadius: 10, color: "#94A3B8", padding: "8px 16px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>دخول</button>
                <button onClick={() => setShowAuth("register")} className="btn-hover" style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 10, color: "#fff", padding: "8px 16px", cursor: "pointer", fontSize: 13, fontWeight: 700, fontFamily: "inherit", transition: "all 0.2s" }}>تسجيل</button>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* HOME PAGE */}
      {activeSection === "home" && (
        <div>
          {/* HERO */}
          <div style={{ position: "relative", padding: "100px 24px 80px", textAlign: "center", overflow: "hidden", background: "radial-gradient(ellipse at center top, rgba(30,58,95,0.4) 0%, transparent 70%)" }}>
            <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(59,130,246,0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(16,185,129,0.05) 0%, transparent 50%)", pointerEvents: "none" }} />
            <div style={{ maxWidth: 900, margin: "0 auto", animation: "fadeInUp 0.8s ease" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 50, padding: "8px 20px", marginBottom: 32 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", animation: "pulse 2s infinite", display: "inline-block" }} />
                <span style={{ color: "#60A5FA", fontSize: 14, fontWeight: 600 }}>منصة هندسية متخصصة • مدعومة بالذكاء الاصطناعي</span>
              </div>
              <h1 style={{ fontSize: "clamp(32px,5vw,64px)", fontWeight: 900, color: "#fff", lineHeight: 1.2, marginBottom: 24 }}>
                <span style={{ background: "linear-gradient(135deg,#3B82F6,#10B981)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>G&OT Engineering</span>
                <br />منصة الهندسة الكيميائية
              </h1>
              <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "#94A3B8", lineHeight: 1.8, maxWidth: 700, margin: "0 auto 40px", fontWeight: 400 }}>
                الهيئة العامة للمهندسين الكيميائيين في البصرة • أكثر من 1500 مهندس • تعليم هندسي متكامل مدعوم بالذكاء الاصطناعي والمصادر العلمية المتخصصة
              </p>
              <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
                <button onClick={() => setActiveSection("sections")} className="btn-hover"
                  style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 14, color: "#fff", padding: "16px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                  🚀 استكشف الأقسام
                </button>
                <button onClick={() => setShowAI({ id: "general", title: "اسأل مهندساً كيميائياً", icon: "🤖", sources: ["Holman", "McCabe", "Coulson & Richardson", "Heppler & Staudt"] })}
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid #334155", borderRadius: 14, color: "#E2E8F0", padding: "16px 32px", fontSize: 16, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>
                  💬 اسأل مهندساً
                </button>
              </div>
            </div>
          </div>

          {/* STATS */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 20 }}>
              {[
                { icon: "👥", value: "1,500+", label: "مهندس مسجّل" },
                { icon: "📚", value: "6", label: "قسم هندسي" },
                { icon: "🤖", value: "AI", label: "ذكاء اصطناعي مجاني" },
                { icon: "📖", value: "15+", label: "مصدر علمي متخصص" },
                { icon: "🎓", value: "2+", label: "دورة تدريبية" },
                { icon: "💼", value: "5+", label: "فرصة وظيفية" },
              ].map((s, i) => (
                <div key={i} style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 16, padding: 24, textAlign: "center", animation: `fadeInUp 0.6s ${i*0.1}s both` }}>
                  <div style={{ fontSize: 32, marginBottom: 8 }}>{s.icon}</div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "#3B82F6" }}>{s.value}</div>
                  <div style={{ color: "#64748B", fontSize: 13, marginTop: 4 }}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* QUICK SECTIONS */}
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
            <h2 style={{ color: "#fff", fontSize: 28, fontWeight: 800, textAlign: "center", marginBottom: 40 }}>الأقسام الهندسية المتخصصة</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 20 }}>
              {ENGINEERING_SECTIONS.map((sec, i) => (
                <div key={sec.id} className="section-card" onClick={() => { setActiveSection("sections"); setTimeout(() => setShowAI(sec), 100); }}
                  style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 20, padding: 28, cursor: "pointer", transition: "all 0.3s", animation: `fadeInUp 0.6s ${i*0.1}s both` }}>
                  <div style={{ fontSize: 44, marginBottom: 16, animation: "float 3s infinite" }}>{sec.icon}</div>
                  <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 8 }}>{sec.title}</h3>
                  <p style={{ color: "#64748B", fontSize: 13, lineHeight: 1.6, marginBottom: 16 }}>{sec.topics.slice(0,3).join(" • ")}</p>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {sec.sources.slice(0,2).map((src, j) => (
                      <span key={j} style={{ background: `${sec.color}15`, border: `1px solid ${sec.color}30`, color: sec.color, padding: "3px 10px", borderRadius: 20, fontSize: 11 }}>{src.split(" - ")[0]}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ENGINEERING SECTIONS PAGE */}
      {activeSection === "sections" && (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 900 }}>📚 الأقسام الهندسية</h1>
            <p style={{ color: "#64748B", fontSize: 16, marginTop: 12 }}>استكشف كل قسم واطرح أسئلتك مع الذكاء الاصطناعي المتخصص بالمصادر الهندسية</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(340px,1fr))", gap: 24 }}>
            {ENGINEERING_SECTIONS.map((sec, i) => (
              <div key={sec.id} className="section-card" style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 24, padding: 32, transition: "all 0.3s", animation: `fadeInUp 0.5s ${i*0.1}s both` }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>{sec.icon}</div>
                <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 6 }}>{sec.title}</h2>
                <p style={{ color: "#64748B", fontSize: 13, marginBottom: 20 }}>{sec.titleEn}</p>
                <div style={{ marginBottom: 20 }}>
                  <h4 style={{ color: "#60A5FA", fontSize: 13, marginBottom: 10 }}>📖 المصادر العلمية:</h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {sec.sources.map((src, j) => (
                      <div key={j} style={{ background: "#1E293B", borderRadius: 8, padding: "8px 12px", color: "#94A3B8", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ color: sec.color }}>●</span> {src}
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ marginBottom: 24 }}>
                  <h4 style={{ color: "#60A5FA", fontSize: 13, marginBottom: 10 }}>🔬 المواضيع:</h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {sec.topics.map((t, j) => (
                      <span key={j} style={{ background: `${sec.color}15`, border: `1px solid ${sec.color}25`, color: sec.color, padding: "4px 10px", borderRadius: 20, fontSize: 12 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <button onClick={() => setShowAI(sec)} className="btn-hover"
                  style={{ width: "100%", background: sec.gradient, border: "none", borderRadius: 12, color: "#fff", padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                  🤖 اسأل الذكاء الاصطناعي عن {sec.title}
                </button>
              </div>
            ))}
          </div>

          {/* Videos for sections */}
          {videos.length > 0 && (
            <div style={{ marginTop: 60 }}>
              <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 24 }}>🎬 الفيديوات التعليمية</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
                {videos.map((v, i) => (
                  <div key={i} style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 16, overflow: "hidden" }}>
                    <div style={{ height: 10, background: ENGINEERING_SECTIONS.find(s => s.id === v.section)?.gradient || "#1E3A5F" }} />
                    <div style={{ padding: 20 }}>
                      <div style={{ color: "#fff", fontWeight: 700, marginBottom: 8 }}>🎬 {v.title}</div>
                      <div style={{ color: "#64748B", fontSize: 13, marginBottom: 16 }}>{v.description}</div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ background: v.isFree ? "#10B98120" : "#F59E0B20", color: v.isFree ? "#10B981" : "#F59E0B", padding: "4px 12px", borderRadius: 20, fontSize: 13, fontWeight: 700 }}>
                          {v.isFree ? "مجاني" : `$${v.price}`}
                        </span>
                        <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ color: "#60A5FA", fontSize: 13 }}>مشاهدة ↗</a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ASK AN ENGINEER */}
      {activeSection === "ask" && (
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>💬</div>
            <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 12 }}>اسأل مهندساً كيميائياً</h1>
            <p style={{ color: "#64748B", fontSize: 16, lineHeight: 1.7 }}>خدمة مجانية تماماً • مدعومة بالذكاء الاصطناعي والمصادر الهندسية المتخصصة<br />يمكنك إرسال صور للتحليل الهندسي</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))", gap: 20, marginBottom: 40 }}>
            {ENGINEERING_SECTIONS.map(sec => (
              <button key={sec.id} onClick={() => setShowAI(sec)}
                style={{ background: "#0F172A", border: `1px solid ${sec.color}30`, borderRadius: 16, padding: 20, cursor: "pointer", textAlign: "right", transition: "all 0.2s", fontFamily: "inherit" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = sec.color}
                onMouseLeave={e => e.currentTarget.style.borderColor = `${sec.color}30`}>
                <div style={{ fontSize: 28, marginBottom: 8 }}>{sec.icon}</div>
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 4 }}>{sec.title}</div>
                <div style={{ color: "#64748B", fontSize: 12 }}>اسأل متخصصاً</div>
              </button>
            ))}
          </div>
          <div style={{ textAlign: "center" }}>
            <button onClick={() => setShowAI({ id: "general", title: "اسأل مهندساً كيميائياً", icon: "🤖", sources: ["جميع المصادر المتخصصة"] })} className="btn-hover"
              style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 14, color: "#fff", padding: "18px 48px", fontSize: 18, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
              🚀 ابدأ المحادثة الآن - مجاناً
            </button>
          </div>
        </div>
      )}

      {/* COMMUNITY */}
      {activeSection === "community" && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
          <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 8 }}>👥 مجتمع المهندسين الكيميائيين</h1>
          <p style={{ color: "#64748B", marginBottom: 40 }}>تعرّف على زملائك المهندسين وتواصل معهم بخصوصية تامة ومشفرة</p>

          {/* Post */}
          {currentUser ? (
            <div style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 16, padding: 20, marginBottom: 32 }}>
              <div style={{ display: "flex", gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0 }}>
                  {currentUser.name[0]}
                </div>
                <div style={{ flex: 1 }}>
                  <textarea value={newPost} onChange={e => setNewPost(e.target.value)} placeholder="شارك تجربتك مع زملائك المهندسين..."
                    style={{ width: "100%", background: "#1E293B", border: "1px solid #334155", borderRadius: 12, padding: 14, color: "#fff", resize: "none", fontSize: 14, outline: "none", direction: "rtl", fontFamily: "inherit", minHeight: 80 }} />
                  <button onClick={handlePost} style={{ marginTop: 10, background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 10, color: "#fff", padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" }}>📤 نشر</button>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 16, padding: 24, marginBottom: 32, textAlign: "center" }}>
              <p style={{ color: "#64748B", marginBottom: 16 }}>يجب تسجيل الدخول للمشاركة في المجتمع</p>
              <button onClick={() => setShowAuth("login")} style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 10, color: "#fff", padding: "10px 24px", cursor: "pointer", fontWeight: 700, fontFamily: "inherit" }}>تسجيل الدخول</button>
            </div>
          )}

          {/* Posts */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[...posts, ...COMMUNITY_MEMBERS.map(m => ({ id: m.id, text: `مرحباً بالجميع! أنا ${m.name}، ${m.title}. أقيم في ${m.location}. اهتماماتي: ${m.hobby}. يسعدني التواصل مع زملائي المهندسين!`, author: m.name, date: new Date(Date.now() - m.id * 86400000).toISOString(), avatar: m.avatar, color: m.color }))].map((p, i) => (
              <div key={p.id || i} style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 16, padding: 20 }}>
                <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 44, height: 44, borderRadius: "50%", background: p.color || "linear-gradient(135deg,#3B82F6,#1D4ED8)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, flexShrink: 0, fontSize: 16 }}>
                    {p.avatar || p.author?.[0] || "م"}
                  </div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700 }}>{p.author}</div>
                    <div style={{ color: "#64748B", fontSize: 12 }}>{new Date(p.date).toLocaleDateString("ar-IQ", { year: "numeric", month: "long", day: "numeric" })}</div>
                  </div>
                </div>
                <p style={{ color: "#CBD5E1", lineHeight: 1.7, margin: 0 }}>{p.text}</p>
                <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                  <button style={{ background: "none", border: "1px solid #1E3A5F", borderRadius: 8, color: "#64748B", padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>👍 إعجاب</button>
                  <button style={{ background: "none", border: "1px solid #1E3A5F", borderRadius: 8, color: "#64748B", padding: "6px 14px", cursor: "pointer", fontSize: 13, fontFamily: "inherit" }}>💬 تعليق</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* JOBS */}
      {activeSection === "jobs" && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
            <div>
              <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 8 }}>💼 لوحة الوظائف</h1>
              <p style={{ color: "#64748B" }}>وظائف مخصصة للمهندسين الكيميائيين في العراق والبصرة</p>
            </div>
            <div style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 16, padding: 20, minWidth: 240 }}>
              <h4 style={{ color: "#60A5FA", marginTop: 0, marginBottom: 12 }}>📎 السيرة الذاتية</h4>
              <input type="file" accept=".pdf,.doc,.docx" onChange={e => setCvFile(e.target.files[0]?.name)} style={{ display: "none" }} id="cv-upload" />
              <label htmlFor="cv-upload" style={{ display: "block", background: "#1E293B", border: "2px dashed #334155", borderRadius: 10, padding: "12px", textAlign: "center", cursor: "pointer", color: "#64748B", fontSize: 13 }}>
                {cvFile ? `📄 ${cvFile}` : "📁 رفع CV"}
              </label>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {SAMPLE_JOBS.map((job, i) => (
              <div key={job.id} className="job-card" style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 16, padding: 24, transition: "all 0.2s", animation: `fadeInUp 0.5s ${i*0.1}s both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
                  <div>
                    <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{job.title}</h3>
                    <div style={{ color: "#60A5FA", fontWeight: 600, marginBottom: 8 }}>🏢 {job.company}</div>
                    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                      <span style={{ color: "#94A3B8", fontSize: 13 }}>📍 {job.location}</span>
                      <span style={{ color: "#94A3B8", fontSize: 13 }}>⏰ {job.posted}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ color: "#10B981", fontWeight: 700, fontSize: 15, marginBottom: 8 }}>{job.salary}</div>
                    <div style={{ background: "#1E3A5F", color: "#60A5FA", padding: "4px 12px", borderRadius: 20, fontSize: 12, textAlign: "center", marginBottom: 8 }}>{job.type}</div>
                    <button style={{ background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 10, color: "#fff", padding: "10px 20px", cursor: "pointer", fontWeight: 700, fontSize: 13, fontFamily: "inherit", width: "100%" }}>
                      تقدّم الآن
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 32, background: "#0F172A", border: "1px dashed #1E3A5F", borderRadius: 16, padding: 24, textAlign: "center" }}>
            <p style={{ color: "#64748B", marginBottom: 0 }}>🔄 يتم تحديث الوظائف تلقائياً من مصادر عراقية وبصرية متخصصة. للمزيد من الوظائف في قطاع النفط والغاز في العراق تابع قنواتنا على تيليغرام.</p>
          </div>
        </div>
      )}

      {/* COURSES */}
      {activeSection === "courses" && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h1 style={{ color: "#fff", fontSize: 32, fontWeight: 900, marginBottom: 12 }}>🎓 الدورات التدريبية</h1>
            <p style={{ color: "#64748B", fontSize: 16 }}>دورات احترافية معتمدة من الهيئة العامة للمهندسين الكيميائيين في البصرة</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: 28 }}>
            {COURSES.map((course, i) => (
              <div key={course.id} className="course-card" style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 24, overflow: "hidden", transition: "all 0.3s", animation: `fadeInUp 0.5s ${i*0.15}s both` }}>
                <div style={{ height: 4, background: "linear-gradient(90deg,#3B82F6,#10B981)" }} />
                <div style={{ padding: 32 }}>
                  <div style={{ fontSize: 52, marginBottom: 20, textAlign: "center" }}>{course.icon}</div>
                  <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, marginBottom: 12, lineHeight: 1.4 }}>{course.title}</h2>
                  <p style={{ color: "#64748B", fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>{course.description}</p>
                  <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
                    <div style={{ background: "#1E293B", borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" }}>
                      <div style={{ color: "#60A5FA", fontSize: 11, marginBottom: 2 }}>المدة</div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{course.duration}</div>
                    </div>
                    <div style={{ background: "#1E293B", borderRadius: 10, padding: "8px 14px", flex: 1, textAlign: "center" }}>
                      <div style={{ color: "#60A5FA", fontSize: 11, marginBottom: 2 }}>المستوى</div>
                      <div style={{ color: "#fff", fontWeight: 700, fontSize: 13 }}>{course.level}</div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                    <span style={{ color: "#EF4444", fontSize: 14, textDecoration: "line-through", opacity: 0.7 }}>${course.originalPrice}</span>
                    <span style={{ color: "#10B981", fontSize: 28, fontWeight: 900 }}>${course.currentPrice}</span>
                    <span style={{ background: "#10B98120", color: "#10B981", padding: "4px 10px", borderRadius: 20, fontSize: 12, fontWeight: 700 }}>
                      خصم {Math.round((1-course.currentPrice/course.originalPrice)*100)}%
                    </span>
                  </div>
                  <button className="btn-hover" style={{ width: "100%", background: "linear-gradient(135deg,#3B82F6,#1D4ED8)", border: "none", borderRadius: 12, color: "#fff", padding: "14px", fontSize: 15, fontWeight: 700, cursor: "pointer", transition: "all 0.2s", fontFamily: "inherit" }}>
                    🛒 اشترك الآن
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Videos in courses */}
          {videos.filter(v => v.isFree).length > 0 && (
            <div style={{ marginTop: 60 }}>
              <h2 style={{ color: "#fff", fontSize: 24, fontWeight: 800, marginBottom: 24 }}>🎬 محتوى مجاني</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 20 }}>
                {videos.filter(v => v.isFree).map((v, i) => (
                  <div key={i} style={{ background: "#0F172A", border: "1px solid #10B98130", borderRadius: 16, padding: 20 }}>
                    <div style={{ color: "#10B981", fontWeight: 700, marginBottom: 8 }}>🎬 {v.title}</div>
                    <p style={{ color: "#64748B", fontSize: 13, marginBottom: 12 }}>{v.description}</p>
                    <a href={v.url} target="_blank" rel="noopener noreferrer" style={{ color: "#60A5FA", fontSize: 13 }}>مشاهدة مجاناً ↗</a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ABOUT */}
      {activeSection === "about" && (
        <div style={{ maxWidth: 1000, margin: "0 auto", padding: "40px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 60 }}>
            <h1 style={{ color: "#fff", fontSize: 36, fontWeight: 900, marginBottom: 16 }}>ℹ️ من نحن؟</h1>
          </div>

          {/* Founder */}
          <div style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 24, padding: 40, marginBottom: 32, display: "flex", gap: 32, flexWrap: "wrap", alignItems: "center" }}>
            <div style={{ width: 160, height: 160, borderRadius: 24, background: "linear-gradient(135deg,#1E3A5F,#3B82F6)", border: "3px solid #3B82F6", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 64 }}>👨‍🔬</div>
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{ color: "#60A5FA", fontSize: 13, fontWeight: 600, marginBottom: 8 }}>🏅 المؤسس والمطور</div>
              <h2 style={{ color: "#fff", fontSize: 26, fontWeight: 900, marginBottom: 12 }}>المهندس علي سيف الدين حيدر محمد سعيد النوفل</h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ color: "#94A3B8", fontSize: 14, display: "flex", gap: 8 }}>🏛️ <span>مؤسس الهيئة العامة للمهندسين الكيميائيين في البصرة</span></div>
                <div style={{ color: "#94A3B8", fontSize: 14, display: "flex", gap: 8 }}>👥 <span>قيادة أكثر من 1,500 مهندس كيميائي</span></div>
                <div style={{ color: "#94A3B8", fontSize: 14, display: "flex", gap: 8 }}>🗳️ <span>مرشح لرئاسة شعبة الكيمياوي في نقابة المهندسين</span></div>
                <div style={{ color: "#94A3B8", fontSize: 14, display: "flex", gap: 8 }}>🎓 <span>يعمل بإخلاص لرفع مستوى الهندسة الكيميائية في البصرة والعراق</span></div>
              </div>
            </div>
          </div>

          {/* About Platform */}
          <div style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 24, padding: 40, marginBottom: 32 }}>
            <h3 style={{ color: "#3B82F6", fontSize: 20, fontWeight: 800, marginBottom: 20 }}>🏛️ الهيئة العامة للمهندسين الكيميائيين في البصرة</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              {[
                { icon: "📍", text: "البصرة، العراق" },
                { icon: "👥", text: "أكثر من 1,500 مهندس كيميائي" },
                { icon: "🎓", text: "دورات تدريبية متخصصة بوتيرة متصاعدة" },
                { icon: "🤖", text: "منصة تعليمية مدعومة بالذكاء الاصطناعي" },
                { icon: "📚", text: "مصادر هندسية عالمية متخصصة" },
                { icon: "🔒", text: "خصوصية وأمان كامل للمستخدمين" },
              ].map((item, i) => (
                <div key={i} style={{ background: "#1E293B", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 12, alignItems: "center" }}>
                  <span style={{ fontSize: 24 }}>{item.icon}</span>
                  <span style={{ color: "#94A3B8", fontSize: 14 }}>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Social Links */}
          <div style={{ background: "#0F172A", border: "1px solid #1E3A5F", borderRadius: 24, padding: 40 }}>
            <h3 style={{ color: "#3B82F6", fontSize: 20, fontWeight: 800, marginBottom: 24 }}>🌐 تواصل معنا</h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 16 }}>
              {SOCIAL_LINKS.map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer"
                  style={{ background: "#1E293B", border: `1px solid ${link.color}30`, borderRadius: 14, padding: "16px 20px", textDecoration: "none", display: "flex", gap: 12, alignItems: "center", transition: "all 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = link.color}
                  onMouseLeave={e => e.currentTarget.style.borderColor = `${link.color}30`}>
                  <span style={{ fontSize: 24 }}>{link.icon}</span>
                  <span style={{ color: "#CBD5E1", fontSize: 13, fontWeight: 600 }}>{link.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer style={{ background: "#060D1A", borderTop: "1px solid #1E3A5F", padding: "40px 24px", marginTop: 80 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: 32, marginBottom: 32 }}>
            <div>
              <div style={{ fontWeight: 800, fontSize: 18, color: "#fff", marginBottom: 8 }}>G&OT Engineering</div>
              <p style={{ color: "#64748B", fontSize: 13, lineHeight: 1.7 }}>الهيئة العامة للمهندسين الكيميائيين في البصرة • بناء مستقبل الهندسة الكيميائية العراقية</p>
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#60A5FA", marginBottom: 12 }}>الأقسام</div>
              {ENGINEERING_SECTIONS.map(s => (
                <div key={s.id} onClick={() => setActiveSection("sections")} style={{ color: "#64748B", fontSize: 13, marginBottom: 6, cursor: "pointer" }}>{s.title}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#60A5FA", marginBottom: 12 }}>روابط سريعة</div>
              {navItems.map(n => (
                <div key={n.id} onClick={() => setActiveSection(n.id)} style={{ color: "#64748B", fontSize: 13, marginBottom: 6, cursor: "pointer" }}>{n.label}</div>
              ))}
            </div>
            <div>
              <div style={{ fontWeight: 700, color: "#60A5FA", marginBottom: 12 }}>تواصل معنا</div>
              {SOCIAL_LINKS.slice(0,4).map((link, i) => (
                <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" style={{ color: "#64748B", fontSize: 13, marginBottom: 6, display: "block", textDecoration: "none" }}>{link.name}</a>
              ))}
            </div>
          </div>
          <div style={{ borderTop: "1px solid #1E3A5F", paddingTop: 24, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ color: "#374151", fontSize: 13 }}>© 2025 G&OT Engineering - الهيئة العامة للمهندسين الكيميائيين في البصرة</span>
            <span style={{ color: "#374151", fontSize: 13 }}>طُوِّر بإخلاص بواسطة م. علي سيف الدين حيدر محمد سعيد النوفل</span>
          </div>
        </div>
      </footer>

      {/* MODALS */}
      {showAI && <AIChat section={showAI} onClose={() => setShowAI(null)} />}
      {showAuth && <AuthModal mode={showAuth} onClose={() => setShowAuth(null)} onLogin={handleLogin} />}
      {showAdmin && <AdminDashboard users={users} videos={videos} onAddVideo={handleAddVideo} onClose={() => setShowAdmin(false)} />}
    </div>
  );
}
