import api from './axios'
import type { ProjectDto } from '../types/ProjectDto'

export const createProject = (project: ProjectDto) =>
  api.post<ProjectDto>('/projects/create', project)

export const getProjectById = (id: number) =>
  api.get<ProjectDto>(`/projects/read/${id}`)

export const getAllProjects = () =>
  api.get<ProjectDto[]>('/projects/read')

export const deleteProject = (id: number) =>
  api.delete(`/projects/delete/${id}`)

export const getProjectsWithNoEmployees = () =>
  api.get<ProjectDto[]>('/projects/read/no-employees')

