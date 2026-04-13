import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

export default function ClientRouterApp() {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || ""

  return (
    <HelmetProvider>
      <BrowserRouter basename={basePath}>
        <App />
      </BrowserRouter>
    </HelmetProvider>
  )
}
