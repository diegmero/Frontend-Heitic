import Link from 'next/link'

const Navigation = () => {
  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Logo Heitic
        </Link>
        <ul className="flex space-x-4">
          <li><Link href="/servicios" className="hover:text-gray-300">Servicios</Link></li>
          <li><Link href="/proyectos" className="hover:text-gray-300">Proyectos</Link></li>
          <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
          <li><Link href="/contacto" className="hover:text-gray-300">Contacto</Link></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation