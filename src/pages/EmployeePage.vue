<template>
  <div>
    <h2 class="mb-4">Employee Management</h2>

    <!-- Form & Table -->
    <EmployeeForm @employeeCreated="addEmployee" />
    <!-- Filters Section -->
    <div class="mb-4 d-flex flex-wrap gap-2">
      <input v-model="deptFilter" type="text" class="form-control w-auto" placeholder="Department Name" />
      <button class="btn btn-primary" @click="fetchByDepartment">Filter by Department</button>

      <input v-model.number="projectFilter" type="number" class="form-control w-auto" placeholder="Project ID" />
      <button class="btn btn-secondary" @click="fetchByProjectId">Filter by Project</button>

      <button class="btn btn-success" @click="fetchHighestSalary">Highest Salary</button>
      <button class="btn btn-warning" @click="fetchAboveAvgSalary">Above Avg Salary</button>

      <button class="btn btn-dark" @click="loadEmployees">Reset</button>
    </div>
    <EmployeeTable :employees="employees" @deleteEmployee="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import EmployeeForm from './EmployeeForm.vue'
import EmployeeTable from './EmployeeTable.vue'
import { getAllEmployees, 
    deleteEmployee, 
    getEmployeesByDepartment, 
    getEmployeesByProjectId,
    getHighestSalaryEmployees,
    getAboveAvgSalaryEmployees } from '../api/employeeApi'
import type { EmployeeDto } from '../types/EmployeeDto'
import { useToast } from 'vue-toastification'

const employees = ref<EmployeeDto[]>([])
const deptFilter = ref('')
const projectFilter = ref<number | null>(null)

const toast = useToast()

const loadEmployees = async () => {
  const res = await getAllEmployees()
  employees.value = res.data
}

const addEmployee = (newEmp: EmployeeDto) => {
  employees.value.push(newEmp)
}

const handleDelete = async (id: number) => {
  try {
    await deleteEmployee(id)
    employees.value = employees.value.filter((emp) => emp.employeeId !== id)
    toast.success('Employee deleted successfully!')
  } catch (error) {
    toast.error('Failed to delete employee.')
    console.error(error)
  }
}

// Newly integrated fetch-based APIs
const fetchByDepartment = async () => {
  if (!deptFilter.value.trim()) return alert('Enter a department name.')
  employees.value = await getEmployeesByDepartment(deptFilter.value.trim())
}

const fetchByProjectId = async () => {
  if (projectFilter.value == null) return alert('Enter a project ID.')
  employees.value = await getEmployeesByProjectId(projectFilter.value)
}

const fetchHighestSalary = async () => {
  employees.value = await getHighestSalaryEmployees()
}

const fetchAboveAvgSalary = async () => {
  employees.value = await getAboveAvgSalaryEmployees()
}

onMounted(() => {
  loadEmployees()
})
</script>
