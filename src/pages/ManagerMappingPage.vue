<template>
  <div class="container mt-5">
    <h3 class="mb-4">Manager-Employee Mappings</h3>

    <table class="table table-bordered table-hover">
      <thead class="table-light">
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Designation</th>
          <th>Manager ID</th>
          <th>Manager Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="mapping in mappings" :key="mapping.employeeId">
          <td>{{ mapping.employeeId }}</td>
          <td>{{ mapping.employeeName }}</td>
          <td>{{ mapping.designation }}</td>
          <td>{{ mapping.managerId ?? '—' }}</td>
          <td>{{ mapping.managerName ?? '—' }}</td>
          <td>
            <button
              v-if="mapping.managerId"
              class="btn btn-sm btn-warning"
              @click="handleRemoveManager(mapping.employeeId)"
            >
              Remove Manager
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getAllHierarchies, removeManager } from '../api/employeeHierarchyApi'
import type { EmployeeHierarchyDto } from '../types/EmployeeHierarchyDto'

const mappings = ref<EmployeeHierarchyDto[]>([])

const loadMappings = async () => {
  try {
    const res = await getAllHierarchies()
    mappings.value = res.data.filter((m) => m.managerId !== null)
  } catch (err) {
    console.error('Error fetching manager mappings:', err)
  }
}

const handleRemoveManager = async (employeeId: number) => {
  const confirmed = confirm('Are you sure you want to remove this employee\'s manager?')
  if (!confirmed) return

  try {
    await removeManager(employeeId)
    const mapping = mappings.value.find((m) => m.employeeId === employeeId)
    if (mapping) {
      mapping.managerId = null
      mapping.managerName = null
    }
    alert('Manager removed successfully!')
  } catch (err) {
    console.error('Error removing manager:', err)
    alert('Failed to remove manager.')
  }
}

onMounted(loadMappings)
</script>
