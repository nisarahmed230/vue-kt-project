import { defineStore } from 'pinia'
import { getEmployeeById } from '../api/employeeApi'
import type { EmployeeDto } from '../types/EmployeeDto'

export const useEmployeeDetailsStore = defineStore('employeeDetails', {
  state: () => ({
    employee: null as EmployeeDto | null,
    loading: false,
    error: null as string | null
  }),
  actions: {
    async fetchEmployeeById(id: number) {
      this.loading = true
      this.error = null
      try {
        const response = await getEmployeeById(id)
        this.employee = response.data
      } catch (err: any) {
        this.error = 'Failed to load employee'
      } finally {
        this.loading = false
      }
    },
    clearEmployee() {
      this.employee = null
      this.error = null
    }
  }
})

