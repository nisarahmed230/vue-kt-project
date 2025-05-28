import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { EmployeeDto } from '../types/EmployeeDto'
import { getAllEmployees } from '../api/employeeApi'

export const useEmployeeStore = defineStore('employee', () => {
  const employees = ref<EmployeeDto[]>([])

  const getEmployees = async () => {
    try {
      const res = await getAllEmployees()
      employees.value = res.data
    } catch (error) {
      console.error('Failed to load employees', error)
    }
  }

  return {
    employees,
    getEmployees
  }
})
