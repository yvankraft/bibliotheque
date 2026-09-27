"use client";

import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

export const LOCALES = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
  { code: "es", label: "Español" },
  { code: "de", label: "Deutsch" },
  { code: "pt", label: "Português" },
  { code: "it", label: "Italiano" },
  { code: "nl", label: "Nederlands" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "ar", label: "العربية" },
] as const;

export type Locale = (typeof LOCALES)[number]["code"];

type Dict = Record<string, string>;

const DICTS: Record<Locale, Dict> = {
  en: {
    components: "Components",
    documentation: "Documentation",
    demo: "Demo",
    signIn: "Sign in",
    dashboard: "Dashboard",
    menu: "Menu",
    home: "Home",
  },
  fr: {
    components: "Composants",
    documentation: "Documentation",
    demo: "Démo",
    signIn: "Se connecter",
    dashboard: "Tableau de bord",
    menu: "Menu",
    home: "Accueil",
  },
  es: {
    components: "Componentes",
    documentation: "Documentación",
    demo: "Demo",
    signIn: "Iniciar sesión",
    dashboard: "Panel",
    menu: "Menú",
    home: "Inicio",
  },
  de: {
    components: "Komponenten",
    documentation: "Dokumentation",
    demo: "Demo",
    signIn: "Anmelden",
    dashboard: "Dashboard",
    menu: "Menü",
    home: "Startseite",
  },
  pt: {
    components: "Componentes",
    documentation: "Documentação",
    demo: "Demo",
    signIn: "Entrar",
    dashboard: "Painel",
    menu: "Menu",
    home: "Início",
  },
  it: {
    components: "Componenti",
    documentation: "Documentazione",
    demo: "Demo",
    signIn: "Accedi",
    dashboard: "Dashboard",
    menu: "Menu",
    home: "Home",
  },
  nl: {
    components: "Componenten",
    documentation: "Documentatie",
    demo: "Demo",
    signIn: "Inloggen",
    dashboard: "Dashboard",
    menu: "Menu",
    home: "Home",
  },
  ja: {
    components: "コンポーネント",
    documentation: "ドキュメント",
    demo: "デモ",
    signIn: "ログイン",
    dashboard: "ダッシュボード",
    menu: "メニュー",
    home: "ホーム",
  },
  zh: {
    components: "组件",
    documentation: "文档",
    demo: "演示",
    signIn: "登录",
    dashboard: "控制台",
    menu: "菜单",
    home: "首页",
  },
  ar: {
    components: "المكونات",
    documentation: "التوثيق",
    demo: "عرض توضيحي",
    signIn: "تسجيل الدخول",
    dashboard: "لوحة التحكم",
    menu: "القائمة",
    home: "الرئيسية",
  },
};

interface LanguageContextValue {
  locale: Locale;
  setLocale: (l: Locale) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: "en",
  setLocale: () => { },
  t: (key) => key,
});

// ---------------------------------------------------------
// Store externe (localStorage + préférence navigateur) —
// useSyncExternalStore évite le mismatch d'hydratation :
// "en" côté serveur, vraie locale lue après hydratation.
// ---------------------------------------------------------

const listeners = new Set<() => void>();

function subscribeLocale(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

function getClientLocale(): Locale {
  try {
    const saved = localStorage.getItem("locale");
    if (saved && LOCALES.some((l) => l.code === saved)) {
      return saved as Locale;
    }
    const nav = navigator.language.slice(0, 2);
    return (LOCALES.some((l) => l.code === nav) ? nav : "en") as Locale;
  } catch {
    return "en";
  }
}

const getServerLocale = (): Locale => "en";

function persistLocale(l: Locale) {
  try {
    localStorage.setItem("locale", l);
  } catch {
    // localStorage indisponible
  }
  document.documentElement.lang = l;
  document.documentElement.dir = l === "ar" ? "rtl" : "ltr";
  listeners.forEach((cb) => cb());
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(
    subscribeLocale,
    getClientLocale,
    getServerLocale
  );

  const t = (key: string) => DICTS[locale][key] ?? DICTS.en[key] ?? key;

  return (
    <LanguageContext.Provider
      value={{ locale, setLocale: persistLocale, t }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
