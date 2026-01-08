import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "fr" | "ar";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Common
    "app.name": "CareWatch",
    "app.tagline": "AI Health Platform",
    "nav.dashboard": "Dashboard",
    "nav.patients": "Patients",
    "nav.addPatient": "Add Patient",
    "nav.alerts": "Alerts",
    "nav.reports": "Reports",
    "nav.settings": "Settings",
    "nav.logout": "Logout",
    // Auth
    "auth.login": "Login",
    "auth.signup": "Sign Up",
    "auth.email": "Email",
    "auth.password": "Password",
    "auth.confirmPassword": "Confirm Password",
    "auth.fullName": "Full Name",
    "auth.role": "Role",
    "auth.welcomeBack": "Welcome back",
    "auth.signInToContinue": "Sign in to continue to your dashboard",
    "auth.noAccount": "Don't have an account?",
    "auth.hasAccount": "Already have an account?",
    "auth.createAccount": "Create Account",
    // Dashboard
    "dashboard.title": "Dashboard",
    "dashboard.subtitle": "Monitor patient health and behavioral patterns",
    "dashboard.searchPatients": "Search patients...",
    // Index
    "index.hero.title": "AI-Powered Patient Monitoring",
    "index.hero.subtitle": "Advanced behavioral analysis and real-time alerts for addiction recovery monitoring",
    "index.getStarted": "Get Started",
    "index.learnMore": "Learn More",
  },
  fr: {
    // Common
    "app.name": "CareWatch",
    "app.tagline": "Plateforme de Santé IA",
    "nav.dashboard": "Tableau de bord",
    "nav.patients": "Patients",
    "nav.addPatient": "Ajouter Patient",
    "nav.alerts": "Alertes",
    "nav.reports": "Rapports",
    "nav.settings": "Paramètres",
    "nav.logout": "Déconnexion",
    // Auth
    "auth.login": "Connexion",
    "auth.signup": "S'inscrire",
    "auth.email": "Email",
    "auth.password": "Mot de passe",
    "auth.confirmPassword": "Confirmer le mot de passe",
    "auth.fullName": "Nom complet",
    "auth.role": "Rôle",
    "auth.welcomeBack": "Bon retour",
    "auth.signInToContinue": "Connectez-vous pour accéder à votre tableau de bord",
    "auth.noAccount": "Vous n'avez pas de compte?",
    "auth.hasAccount": "Vous avez déjà un compte?",
    "auth.createAccount": "Créer un compte",
    // Dashboard
    "dashboard.title": "Tableau de bord",
    "dashboard.subtitle": "Surveillez la santé et les comportements des patients",
    "dashboard.searchPatients": "Rechercher des patients...",
    // Index
    "index.hero.title": "Surveillance des Patients par IA",
    "index.hero.subtitle": "Analyse comportementale avancée et alertes en temps réel pour le suivi de la récupération",
    "index.getStarted": "Commencer",
    "index.learnMore": "En savoir plus",
  },
  ar: {
    // Common
    "app.name": "CareWatch",
    "app.tagline": "منصة الصحة بالذكاء الاصطناعي",
    "nav.dashboard": "لوحة التحكم",
    "nav.patients": "المرضى",
    "nav.addPatient": "إضافة مريض",
    "nav.alerts": "التنبيهات",
    "nav.reports": "التقارير",
    "nav.settings": "الإعدادات",
    "nav.logout": "تسجيل الخروج",
    // Auth
    "auth.login": "تسجيل الدخول",
    "auth.signup": "إنشاء حساب",
    "auth.email": "البريد الإلكتروني",
    "auth.password": "كلمة المرور",
    "auth.confirmPassword": "تأكيد كلمة المرور",
    "auth.fullName": "الاسم الكامل",
    "auth.role": "الدور",
    "auth.welcomeBack": "مرحباً بعودتك",
    "auth.signInToContinue": "قم بتسجيل الدخول للوصول إلى لوحة التحكم",
    "auth.noAccount": "ليس لديك حساب؟",
    "auth.hasAccount": "لديك حساب بالفعل؟",
    "auth.createAccount": "إنشاء حساب",
    // Dashboard
    "dashboard.title": "لوحة التحكم",
    "dashboard.subtitle": "مراقبة صحة المرضى وأنماط السلوك",
    "dashboard.searchPatients": "البحث عن المرضى...",
    // Index
    "index.hero.title": "مراقبة المرضى بالذكاء الاصطناعي",
    "index.hero.subtitle": "تحليل سلوكي متقدم وتنبيهات فورية لمتابعة التعافي",
    "index.getStarted": "ابدأ الآن",
    "index.learnMore": "اعرف المزيد",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem("language") as Language;
    return saved || "en";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  const dir = language === "ar" ? "rtl" : "ltr";

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
