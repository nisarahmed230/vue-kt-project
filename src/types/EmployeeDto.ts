import type { EmployeeDetailsDto } from './EmployeeDetailsDto'
import type { ProjectDto } from './ProjectDto'

export interface EmployeeDto {
  employeeId?: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  hireDate: string 
  salary: number
  jobId: string
  department: string
  designation: string
  employeeDetails?: EmployeeDetailsDto
  project?: ProjectDto | null
}

