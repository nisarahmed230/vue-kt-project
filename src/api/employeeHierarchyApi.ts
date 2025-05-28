import api from './axios'
import type { EmployeeHierarchyDto } from '../types/EmployeeHierarchyDto'
import type { AssignManagerRequestDto } from '../types/AssignManagerRequestDto'
import { fetchWrapper } from '../services/fetchWrapper'

export const assignManager = (request: AssignManagerRequestDto) =>
  api.post<EmployeeHierarchyDto>('/employee-hierarchy/assign', request)

export async function getManagerByEmployeeId(employeeId:number): Promise<EmployeeHierarchyDto> {
  return await fetchWrapper<EmployeeHierarchyDto>(`http://localhost:8080/api/employee-hierarchy/manager/${employeeId}`)  
}

export async function getEmployeesByManagerId(managerId:number): Promise<EmployeeHierarchyDto[]> {
  return await fetchWrapper<EmployeeHierarchyDto[]>(`http://localhost:8080/api/employee-hierarchy/employees/${managerId}`)  
}

export const getAllHierarchies = () =>
  api.get<EmployeeHierarchyDto[]>('/employee-hierarchy/all')

export const removeManager = (employeeId: number) =>
  api.put<String>(`/employee-hierarchy/${employeeId}/remove-manager`)
