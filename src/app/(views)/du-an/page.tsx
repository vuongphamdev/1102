'use client';

import { useRouter } from 'next/navigation';

export default function ProjectsPage() {
  const router = useRouter();

  const projects = [
    { id: 1, title: 'Dự Án 1', description: 'Mô tả ngắn gọn về dự án 1.' },
    { id: 2, title: 'Dự Án 2', description: 'Mô tả ngắn gọn về dự án 2.' },
    { id: 3, title: 'Dự Án 3', description: 'Mô tả ngắn gọn về dự án 3.' },
    { id: 4, title: 'Dự Án 4', description: 'Mô tả ngắn gọn về dự án 4.' },
    { id: 5, title: 'Dự Án 5', description: 'Mô tả ngắn gọn về dự án 5.' },
    { id: 6, title: 'Dự Án 6', description: 'Mô tả ngắn gọn về dự án 6.' },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/du-an/${id}`);
  };

  return (
    <div className="container mx-auto py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-6">Dự Án</h1>
      <p className="text-gray-700 text-lg leading-relaxed text-center mb-8">
        Chào mừng bạn đến với danh sách các dự án của chúng tôi. Chúng tôi tự
        hào mang đến những giải pháp thiết kế và xây dựng sáng tạo.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-4 border rounded shadow hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            onClick={() => handleCardClick(project.id)}
          >
            <h2 className="text-xl font-semibold mb-2">{project.title}</h2>
            <p className="text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
