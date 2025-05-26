import type { AddressDto } from './AddressDto'

export interface EmployeeDetailsDto {
  dateOfBirth: string // ISO string
  maritalStatus: string
  address?: AddressDto
}