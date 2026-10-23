import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 text-center">
      {/* Hero Badge */}
      <span className="inline-block px-4 py-1.5 mb-6 text-xs font-medium tracking-widest uppercase border border-[var(--border-color)] rounded-full text-[var(--accent-gold)] bg-[var(--bg-secondary)]">
        Curated Fine Art Collection
      </span>

      {/* Main Headline */}
      <h1 className="max-w-4xl text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
        Raum für <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--text-primary)] via-[var(--accent-gold)] to-[var(--text-muted)]">Ausnahmekunst</span>.
      </h1>

      {/* Subtitle */}
      <p className="max-w-xl text-lg text-[var(--text-muted)] mb-10">
        Entdecke handverlesene Originale, moderne Gemälde und exklusive Drucke für dein Zuhause.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
        <Link
          href="/gallery"
          className="px-8 py-3.5 rounded-md font-medium bg-[var(--text-primary)] text-[var(--bg-primary)] hover:bg-[var(--accent-gold)] transition-colors duration-200"
        >
          Galerie entdecken
        </Link>
        <Link
          href="/about"
          className="px-8 py-3.5 rounded-md font-medium border border-[var(--border-color)] hover:bg-[var(--bg-secondary)] transition-colors duration-200 text-[var(--text-primary)]"
        >
          Über den Künstler
        </Link>
      </div>

      {/* Footer Meta Note */}
      <footer className="mt-20 text-xs text-[var(--text-muted)] tracking-wider uppercase">
        Secured via Stripe &bull; Powered by Modular Monolith &amp; NeonDB
      </footer>
    </div>
  );
}