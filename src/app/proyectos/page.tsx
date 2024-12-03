import { fetchAPI } from '@/lib/api';
import Image from 'next/image';
import Link from 'next/link';

interface Project {
  id: number;
  attributes: {
    Titulo: string;
    Descripcion: string;
    URL: string;
    Tecnologias: string[];
    Imagen: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

async function getProjects() {
  try {
    const data = await fetchAPI('/api/proyectos?populate=*');
    return data.data as Project[];
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export default async function Proyectos() {
  const projects = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Nuestros Proyectos</h1>
        <p>No se encontraron proyectos. Por favor, intenta más tarde.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nuestros Proyectos</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            {project.attributes.Imagen.data && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${project.attributes.Imagen.data.attributes.url}`}
                alt={project.attributes.Titulo}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
            )}
            <div className="p-6">
              <h2 className="text-2xl font-semibold mb-2">{project.attributes.Titulo}</h2>
              <p className="text-gray-600 mb-4">{project.attributes.Descripcion}</p>
              <div className="mb-4">
                <h3 className="font-semibold mb-2">Tecnologías:</h3>
                <div className="flex flex-wrap gap-2">
                  {project.attributes.Tecnologias.map((tech, index) => (
                    <span key={index} className="bg-gray-200 px-2 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <Link
                href={project.attributes.URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
              >
                Ver Proyecto
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}