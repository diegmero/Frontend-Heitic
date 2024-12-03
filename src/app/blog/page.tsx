import { fetchAPI } from '@/lib/api';
import Link from 'next/link';

interface Post {
  id: number;
  attributes: {
    Titulo: string;
    Contenido: string;
    FechaPublicacion: string;
  };
}

async function getPosts(page = 1, pageSize = 10) {
  try {
    const data = await fetchAPI(`/api/posts-blogs?pagination[page]=${page}&pagination[pageSize]=${pageSize}`);
    return {
      posts: data.data as Post[],
      pagination: data.meta.pagination,
    };
  } catch (error) {
    console.error('Error fetching posts:', error);
    return {
      posts: [],
      pagination: { page: 1, pageSize: 10, pageCount: 1, total: 0 },
    };
  }
}

export default async function Blog({ searchParams }: { searchParams: { page?: string } }) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { posts, pagination } = await getPosts(page);

  if (posts.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p>No se encontraron posts. Por favor, intenta más tarde.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Blog</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.id} className="bg-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-2">{post.attributes.Titulo}</h2>
            <p className="text-gray-600 mb-4">
              Publicado el {new Date(post.attributes.FechaPublicacion).toLocaleDateString()}
            </p>
            <p className="mb-4">{post.attributes.Contenido.substring(0, 200)}...</p>
            <Link href={`/blog/${post.id}`} className="text-blue-600 hover:underline">
              Leer más
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        {pagination.page > 1 && (
          <Link href={`/blog?page=${pagination.page - 1}`} className="bg-blue-500 text-white px-4 py-2 rounded">
            Anterior
          </Link>
        )}
        {pagination.page < pagination.pageCount && (
          <Link href={`/blog?page=${pagination.page + 1}`} className="bg-blue-500 text-white px-4 py-2 rounded">
            Siguiente
          </Link>
        )}
      </div>
    </div>
  );
}