'use client';

import { usePathname } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/lib/constants';

interface Project {
  id: string;
  name: string;
  description: string;
  createdAt: string;
}

const fetchProject = async (id: string): Promise<Project> => {
  const response = await fetch(`/api/projects/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch project details');
  }
  return response.json();
};

const ProjectDetails = () => {
  const pathname = usePathname();
  const id = pathname.split('/').pop() || '';

  const {
    data: project,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [QUERY_KEYS.PROJECTS, id],
    queryFn: () => fetchProject(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError || !project) {
    return <div>Project not found</div>;
  }

  return (
    <div>
      <h1>{project.name}</h1>
      <p>{project.description}</p>
      <p>Created At: {new Date(project.createdAt).toLocaleDateString()}</p>
    </div>
  );
};

export default ProjectDetails;
