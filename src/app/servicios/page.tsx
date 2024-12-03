import { fetchAPI } from '@/lib/api';
import Image from 'next/image';

interface Service {
  id: number;
  attributes: {
    Nombre: string;
    Descripcion: string;
    Icono: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}

async function getServices() {
  try {
    const data = await fetchAPI('/api/servicios?populate=*');
    return data.data as Service[];
  } catch (error) {
    console.error('Error fetching services:', error);
    return [];
  }
}

export default async function Servicios() {
  const services = await getServices();

  if (services.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Nuestros Servicios</h1>
        <p>No se encontraron servicios. Por favor, intenta más tarde.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Nuestros Servicios</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {services.map((service) => (
          <div key={service.id} className="bg-white shadow-lg rounded-lg p-6">
            {service.attributes.Icono.data && (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_API_URL}${service.attributes.Icono.data.attributes.url}`}
                alt={service.attributes.Nombre}
                width={64}
                height={64}
                className="mb-4"
              />
            )}
            <h2 className="text-2xl font-semibold mb-2">{service.attributes.Nombre}</h2>
            <p>{service.attributes.Descripcion}</p>
          </div>
        ))}
      </div>
    </div>
  );
}