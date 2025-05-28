import api from './axios'
import type { ProjectDto } from '../types/ProjectDto'
import { fetchWrapper } from '../services/fetchWrapper'

export const createProject = (project: ProjectDto) =>
  api.post<ProjectDto>('/projects/create', project)

export const getProjectById = (id: number) =>
  api.get<ProjectDto>(`/projects/read/${id}`)

export const getAllProjects = () =>
  api.get<ProjectDto[]>('/projects/read')

export async function deleteProject(id: number): Promise<void> {
  await fetchWrapper<void>(`http://localhost:8080/api/projects/delete/${id}`,{
    method: 'DELETE',
  });
}

export async function getProjectsWithNoEmployees(): Promise<ProjectDto[]> {
  return await fetchWrapper<ProjectDto[]>(`http://localhost:8080/api/projects/read/no-employees`); 
}

