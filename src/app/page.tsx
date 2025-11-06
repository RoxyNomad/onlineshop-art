import styles from "@/src/styles/index.module.scss";
import Link from "next/link";

export default function HomePage() {
    return (
        <div>
            {/* Hero section with a headline and call-to-action button */}
            <section className={styles.heroSection}>
                <div className={styles.headline}>The Art of Elegance</div>

                {/* Call-to-action button linking to 'Neuheiten' page */}
                <button className={styles.ctaButton}>
                    <Link href="/neuheiten" className={styles.ctaLink}>
                        Jetzt Entdecken
                    </Link>
                </button>
            </section>

            {/* Footer section */}
            <footer className={styles.footer}></footer>
        </div>
    );
}