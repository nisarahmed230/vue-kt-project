<!-- pages/EmployeeHierarchyPage.vue -->
<template>
  <div class="container mt-4">
    <h2 class="mb-4">Employee Hierarchy Management</h2>

    <AssignManager @assigned="refreshMappings" />

    <div class="mt-5 mb-4 p-3 border rounded bg-light">
      <h5 class="mb-3">Filter Mappings</h5>
      <div class="row g-3">
        <div class="col-md-4">
          <input v-model="filterEmployeeId" type="number" class="form-control" placeholder="Filter by Employee ID" />
        </div>
        <div class="col-md-4">
          <input v-model="filterManagerId" type="number" class="form-control" placeholder="Filter by Manager ID" />
        </div>
        <div class="col-md-4">
          <button @click="applyFilters" class="btn btn-primary me-2">Apply Filter</button>
          <button @click="clearFilters" class="btn btn-secondary">Clear</button>
        </div>
      </div>
    </div>

    <ManagerMapping ref="mappingRef" :filteredMappings="filteredMappings" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import AssignManager from './AssignManager.vue'
import ManagerMapping from './ManagerMapping.vue'
import { getEmployeesByManagerId, getManagerByEmployeeId } from '../api/employeeHierarchyApi'
import type { EmployeeHierarchyDto } from '../types/EmployeeHierarchyDto'

const mappingRef = ref<InstanceType<typeof ManagerMapping> | null>(null)
const filterEmployeeId = ref<number | null>(null)
const filterManagerId = ref<number | null>(null)
const filteredMappings = ref<EmployeeHierarchyDto[] | null>(null)

const refreshMappings = () => {
  mappingRef.value?.loadMappings()
  filteredMappings.value = null
}

const applyFilters = async () => {
  try {
    if (filterEmployeeId.value) {
      const res = await getManagerByEmployeeId(filterEmployeeId.value)
      filteredMappings.value = [res]
    } else if (filterManagerId.value) {
      const res = await getEmployeesByManagerId(filterManagerId.value)
      filteredMappings.value = res
    }
  } catch (err) {
    alert('No results found or invalid input.')
    console.error(err)
  }
}

const clearFilters = () => {
  filterEmployeeId.value = null
  filterManagerId.value = null
  filteredMappings.value = null
}
</script>
