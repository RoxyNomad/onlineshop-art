"use client";

import { ReactNode, useEffect } from "react";
import { I18nextProvider } from "react-i18next";
import i18n from "@/infrastructure/providers/i18nProvider";

type Props = { children: ReactNode };

export default function I18nProvider({ children }: Props) {
  useEffect(() => {
    if (!i18n.isInitialized) i18n.init();
  }, []);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
