import api from './axios'
import type { EmployeeDto } from '../types/EmployeeDto'
import { fetchWrapper } from '../services/fetchWrapper'

export const createEmployee = (employee: EmployeeDto) =>
  api.post<EmployeeDto>('/employees/create', employee)

export const getEmployeeById = (id: number) =>
  api.get<EmployeeDto>(`/employees/read/${id}`)

export const getAllEmployees = () =>
  api.get<EmployeeDto[]>('/employees/read')

export const deleteEmployee = (id: number) =>
  api.delete(`/employees/remove/${id}`)

// Just to Test the commit

export async function getEmployeesByDepartment(deptName:string): Promise<EmployeeDto[]> {
  return await fetchWrapper<EmployeeDto[]>(`http://localhost:8080/api/employees/read/department/${deptName}`);
}
export async function getEmployeesByProjectId(projectId:number): Promise<EmployeeDto[]> {
  return await fetchWrapper<EmployeeDto[]>(`http://localhost:8080/api/employees/read/by-project-id/${projectId}`);
}
export async function getHighestSalaryEmployees(): Promise<EmployeeDto[]> {
  return await fetchWrapper<EmployeeDto[]>(`http://localhost:8080/api/employees/read/highest-salary`);
}
export async function getAboveAvgSalaryEmployees(): Promise<EmployeeDto[]> {
  return await fetchWrapper<EmployeeDto[]>(`http://localhost:8080/api/employees/read/above-avg-salary`);
}
