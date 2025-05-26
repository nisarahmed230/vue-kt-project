export interface EmployeeHierarchyDto {
  employeeId: number
  employeeName: string
  designation: string
  managerId: number | null
  managerName: string | null
}