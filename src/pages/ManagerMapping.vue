<!-- components/ManagerMapping.vue -->
<template>
  <div class="container mt-4">
    <h3 class="mb-3">Manager-Employee Mappings</h3>
    <table class="table table-bordered">
      <thead>
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
        <tr v-for="mapping in mappingsToShow" :key="mapping.employeeId">
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
import { ref, onMounted, watch } from 'vue'
import { getAllHierarchies, removeManager } from '../api/employeeHierarchyApi'
import type { EmployeeHierarchyDto } from '../types/EmployeeHierarchyDto'

const props = defineProps<{
  filteredMappings?: EmployeeHierarchyDto[] | null
}>()

const mappings = ref<EmployeeHierarchyDto[]>([])
const mappingsToShow = ref<EmployeeHierarchyDto[]>([])

const loadMappings = async () => {
  try {
    const res = await getAllHierarchies()
    mappings.value = res.data.filter((m) => m.managerId !== null)
    updateVisibleMappings()
  } catch (err) {
    console.error('Error fetching mappings:', err)
  }
}

const updateVisibleMappings = () => {
  mappingsToShow.value = props.filteredMappings ?? mappings.value
}

watch(() => props.filteredMappings, updateVisibleMappings)

const handleRemoveManager = async (employeeId: number) => {
  const confirmed = confirm('Are you sure you want to remove this employee\'s manager?')
  if (!confirmed) return

  try {
    await removeManager(employeeId)
    await loadMappings()
    alert('Manager removed successfully!')
  } catch (err) {
    console.error('Error removing manager:', err)
    alert('Failed to remove manager.')
  }
}

onMounted(loadMappings)

defineExpose({ loadMappings })
</script>
