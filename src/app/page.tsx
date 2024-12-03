import Image from 'next/image'

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mt-8 mb-4">Bienvenido a Heitic</h1>
      <p className="text-xl mb-8">Somos una empresa dedicada en crear soluciones digitales innovadoras.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Mis Servicios</h2>
          <ul className="list-disc list-inside">
            <li>Desarrollo web frontend</li>
            <li>Desarrollo Backend</li>
            <li>Desarrollo de aplicaciones React - NextJS</li>
            <li>Diseño de interfaces de usuario</li>
            <li>Optimización de rendimiento web</li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Proyectos Destacados</h2>
          {/* Aquí puedes agregar una lista o grid de proyectos destacados */}
          <p>Próximamente: Galería de proyectos</p>
        </div>
      </div>
    </div>
  )
}