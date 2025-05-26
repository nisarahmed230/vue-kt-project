import type { EmployeeDetailsDto } from './EmployeeDetailsDto'
import type { ProjectDto } from './ProjectDto'

export interface EmployeeDto {
  employeeId?: number
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  hireDate: string // use ISO string for LocalDate
  salary: number
  jobId: string
  department: string
  designation: string
  employeeDetails?: EmployeeDetailsDto
  project?: ProjectDto | null
}

