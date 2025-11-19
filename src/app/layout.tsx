import localFont from "next/font/local";
import Header from "@/ui/shop/Header";
import "@/ui/styles/global.module.scss";
import I18nProvider from "@/ui/common/I18nProvider";

export const metadata = {
    title: "Galleryshop",
    description: "galleryshop",
    authors: [{ name: "Roxana Zwicky" }],
    icons: {
        icon: "/favicon.ico",
    },
};

export const cinzel = localFont({
    src: "../public/fonts/Cinzel.ttf",
    display: "swap",
    weight: "400",
    style: "normal",
    variable: "--font-cinzel",
});

export const playfairdisplay = localFont({
    src: "../public/fonts/PlayfairDisplay.ttf",
    display: "swap",
    weight: "400",
    style: "normal",
    variable: "--font-playfairdisplay",
});

interface RootLayoutProps {
    children: React.ReactNode;
    disableHeader?: boolean;
}

export default function RootLayout({ children, disableHeader }: RootLayoutProps) {
    return (
        <html lang="de">
        <body className={`${cinzel.variable} ${playfairdisplay.variable}`} style={{ margin: 0 }}>
        <I18nProvider>
            {!disableHeader && <Header />}
            {children}
        </I18nProvider>
        </body>
        </html>
    );
}
