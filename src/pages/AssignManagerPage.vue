<template>
  <div class="container mt-5">
    <h3 class="mb-4">Assign Manager</h3>

    <div class="mb-3">
      <label class="form-label">Select Employee</label>
      <select v-model="selectedEmployeeId" class="form-select">
        <option :value="null">-- Select Employee --</option>
        <option v-for="e in employees" :key="e.employeeId" :value="e.employeeId">
          {{ e.firstName }} {{ e.lastName }} (ID: {{ e.employeeId }})
        </option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Select Manager</label>
      <select v-model="selectedManagerId" class="form-select">
        <option :value="null">-- Select Manager --</option>
        <option
          v-for="e in filteredManagers"
          :key="e.employeeId"
          :value="e.employeeId"
        >
          {{ e.firstName }} {{ e.lastName }} (ID: {{ e.employeeId }})
        </option>
      </select>
    </div>

    <button class="btn btn-primary" @click="assign">Assign Manager</button>

    <div class="mt-3" v-if="successMessage">
      <div class="alert alert-success">{{ successMessage }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { getAllEmployees } from '../api/employeeApi'
import { assignManager } from '../api/employeeHierarchyApi'
import type { EmployeeDto } from '../types/EmployeeDto'
import type { AssignManagerRequestDto } from '../types/AssignManagerRequestDto'

const employees = ref<EmployeeDto[]>([])
const selectedEmployeeId = ref<number | null>(null)
const selectedManagerId = ref<number | null>(null)
const successMessage = ref<string>('')

const filteredManagers = computed(() => 
employees.value.filter((e) => e.employeeId !== selectedEmployeeId.value))

onMounted(async () => {
  try {
    const response = await getAllEmployees()
    employees.value = response.data
  } catch (error) {
    console.error('Error loading employees:', error)
  }
})

const assign = async () => {
  if (!selectedEmployeeId.value || !selectedManagerId.value) {
    alert('Please select both employee and manager.')
    return
  }

  const payload: AssignManagerRequestDto = {
    employeeId: selectedEmployeeId.value,
    managerId: selectedManagerId.value,
  }

  try {
    await assignManager(payload)
    successMessage.value = 'Manager assigned successfully!'
  } catch (error) {
    console.error('Error assigning manager:', error)
    alert('Failed to assign manager.')
  }
}
</script>
