import api from './axios'
import type { EmployeeDto } from '../types/EmployeeDto'

export const createEmployee = (employee: EmployeeDto) =>
  api.post<EmployeeDto>('/employees/create', employee)

export const getEmployeeById = (id: number) =>
  api.get<EmployeeDto>(`/employees/read/${id}`)

export const getAllEmployees = () =>
  api.get<EmployeeDto[]>('/employees/read')

export const deleteEmployee = (id: number) =>
  api.delete(`/employees/remove/${id}`)

export const getEmployeesByDepartment = (deptName: string) =>
  api.get<EmployeeDto[]>(`/employees/read/department/${deptName}`)

export const getEmployeesByProjectId = (projectId: number) =>
  api.get<EmployeeDto[]>(`/employees/read/by-project-id/${projectId}`)

export const getHighestSalaryEmployees = () =>
  api.get<EmployeeDto[]>('/employees/read/highest-salary')

export const getAboveAvgSalaryEmployees = () =>
  api.get<EmployeeDto[]>('/employees/read/above-avg-salary')