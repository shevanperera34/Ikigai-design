import dynamic from 'next/dynamic'

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || ""

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
          <li><a href={`${BASE_PATH}/services`}>Services</a></li>
          <li><a href={`${BASE_PATH}/work`}>Work</a></li>
          <li><a href={`${BASE_PATH}/about`}>About</a></li>
          <li><a href={`${BASE_PATH}/contact`}>Contact</a></li>
          <li><a href={`${BASE_PATH}/privacy`}>Privacy Policy</a></li>
          <li><a href={`${BASE_PATH}/terms`}>Terms of Service</a></li>
          <li><a href={`${BASE_PATH}/data-use`}>Data Use</a></li>
        </ul>
      </nav>
    </main>
  ),
})

const STATIC_ROUTES = [
  "/",
  "/work",
  "/services",
  "/services/get-quote",
  "/contact",
  "/about",
  "/services/custom-alignment",
  "/services/custom-alignment/builder",
  "/services/alignment",
  "/services/alignment/builder",
  "/terms",
  "/privacy",
  "/data-use",
  "/security",
  "/pay",
  "/pay/success",
  "/services/caresafe",
  "/services/act",
  "/services/act/fit",
  "/services/act/intake",
  "/services/act/report-demo",
  "/services/act/thank-you",
]

export function getStaticPaths() {
  return {
    paths: STATIC_ROUTES.map((route) => {
      if (route === "/") return { params: { slug: [] } }
      const slug = route.replace(/^\/+|\/+$/g, "").split("/")
      return { params: { slug } }
    }),
    fallback: false,
  }
}

export function getStaticProps() {
  return { props: {} }
}

export default function CatchAllPage() {
  return <ClientRouterApp />
}
