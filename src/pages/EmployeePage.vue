<template>
  <div>
    <h2 class="mb-4">Employee Management</h2>
    <EmployeeForm @employeeCreated="addEmployee" />
    <EmployeeTable :employees="employees" @deleteEmployee="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllEmployees, deleteEmployee } from '../api/employeeApi'
import type { EmployeeDto } from '../types/EmployeeDto'
import EmployeeForm from './EmployeeForm.vue'
import EmployeeTable from './EmployeeTable.vue'

const employees = ref<EmployeeDto[]>([])

const loadEmployees = async () => {
  const res = await getAllEmployees()
  employees.value = res.data
}

const addEmployee = (newEmp: EmployeeDto) => {
  employees.value.push(newEmp)
}

const handleDelete = async (id: number) => {
  const confirmed = confirm('Are you sure you want to delete this employee?')
  if (!confirmed) return

  try {
    await deleteEmployee(id)
    employees.value = employees.value.filter((emp) => emp.employeeId !== id)
    alert('Employee deleted successfully!')
  } catch (error) {
    console.error(error)
    alert('Failed to delete employee.')
  }
}

onMounted(() => {
  loadEmployees()
})
</script>
