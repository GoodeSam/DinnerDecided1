"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  t as translate,
  setLocale as setGlobalLocale,
  getLocale,
  type Locale,
} from "./i18n";

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(getLocale);

  const setLocale = useCallback((l: Locale) => {
    setGlobalLocale(l);
    setLocaleState(l);
  }, []);

  const t = useCallback(
    (key: string, params?: Record<string, string | number>) => translate(key, params),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}

export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1 rounded-full bg-stone-100 p-0.5">
      <button
        onClick={() => setLocale("en")}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
          locale === "en"
            ? "bg-amber-500 text-white shadow-sm"
            : "text-stone-500 hover:text-stone-700"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("zh")}
        className={`rounded-full px-3 py-1 text-xs font-semibold transition cursor-pointer ${
          locale === "zh"
            ? "bg-amber-500 text-white shadow-sm"
            : "text-stone-500 hover:text-stone-700"
        }`}
      >
        中文
      </button>
    </div>
  );
}
