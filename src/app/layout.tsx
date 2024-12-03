import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '../../components/Navigation'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Heitic - Innvación en tecnología',
  description: 'Servicios de desarrollo web profesional, SEO, Aplicaciones, CLoud y Servidores',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <header>
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>
        <div className="container mx-auto text-center">
            © {new Date().getFullYear()} Heitic. Todos los derechos reservados.
          </div>
        </footer>
      </body>
    </html>
  )
}