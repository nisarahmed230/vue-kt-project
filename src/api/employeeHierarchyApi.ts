import api from './axios'
import type { EmployeeHierarchyDto } from '../types/EmployeeHierarchyDto'
import type { AssignManagerRequestDto } from '../types/AssignManagerRequestDto'

export const assignManager = (request: AssignManagerRequestDto) =>
  api.post<EmployeeHierarchyDto>('/employee-hierarchy/assign', request)

export const getManagerByEmployeeId = (employeeId: number) =>
  api.get<EmployeeHierarchyDto>(`/employee-hierarchy/manager/${employeeId}`)

export const getEmployeesByManagerId = (managerId: number) =>
  api.get<EmployeeHierarchyDto[]>(`/employee-hierarchy/employees/${managerId}`)

export const getAllHierarchies = () =>
  api.get<EmployeeHierarchyDto[]>('/employee-hierarchy/all')

export const removeManager = (employeeId: number) =>
  api.put<String>(`/employee-hierarchy/${employeeId}/remove-manager`)
