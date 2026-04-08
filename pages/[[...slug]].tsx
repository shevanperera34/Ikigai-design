import dynamic from 'next/dynamic'

const ClientRouterApp = dynamic(() => import('../src/next/ClientRouterApp'), {
  ssr: false,
  loading: () => (
    <main className="seo-fallback" aria-live="polite">
      <h1>Ikigai Project | Brand, Web & Growth</h1>
      <p>
        The Ikigai Project is a human-first digital studio that helps modern businesses build clarity and momentum.
      </p>
      <p>
        We design brand systems, build high-performance websites, and create growth architecture that turns strategy
        into execution.
      </p>
      <nav aria-label="Internal links">
        <ul>
          <li><a href="/services">Services</a></li>
          <li><a href="/work">Work</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/privacy">Privacy Policy</a></li>
          <li><a href="/terms">Terms of Service</a></li>
          <li><a href="/data-use">Data Use</a></li>
        </ul>
      </nav>
    </main>
  ),
})

export default function CatchAllPage() {
  return <ClientRouterApp />
}
