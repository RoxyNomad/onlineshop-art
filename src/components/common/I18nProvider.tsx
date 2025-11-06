'use client';

import { ReactNode, useEffect } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/src/utils/i18n';

type Props = {
    children: ReactNode;
};

export default function I18nProvider({ children }: Props) {
    useEffect(() => {
        // i18n initialisieren (falls noch nicht)
        if (!i18n.isInitialized) {
            i18n.init();
        }
    }, []);

    return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
