<template>
  <div v-if="employees.length">
    <div class="table-responsive">
      <table class="table table-hover table-bordered rounded shadow-sm overflow-hidden">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Designation</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.employeeId">
          <td>{{ emp.employeeId }}</td>
          <td>{{ capitalize(emp.firstName) }} {{ capitalize(emp.lastName) }}</td>
          <td>{{ emp.email }}</td>
          <td>{{ emp.phoneNumber }}</td>
          <td>{{ formatTitleCase(emp.department) }}</td>
          <td>{{ formatTitleCase(emp.designation) }}</td>
          <td>
           <div class="d-flex gap-2">
            <button class="btn btn-info btn-sm" @click="openModal(emp.employeeId!)">Show</button>            
            <button @click="$emit('deleteEmployee', emp.employeeId)" class="btn btn-danger btn-sm">Delete</button>
           </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
  <div v-else>
    <p>No employees found.</p>
  </div>
  <EmployeeDetailsModal :visible="modalVisible" @close="modalVisible = false" />
</template>

<script setup lang="ts">
import { capitalize, ref } from 'vue';
import type { EmployeeDto } from '../types/EmployeeDto'
import { useEmployeeDetailsStore } from '../stores/employeeDetailsStore';
import EmployeeDetailsModal from './EmployeeDetailsModal.vue';

const modalVisible = ref(false)
const store = useEmployeeDetailsStore()

function openModal(id: number) {
  modalVisible.value = true
  store.fetchEmployeeById(id)
}

function formatTitleCase(text: string | undefined): string {
    if (!text) return ''
    else if (text==="HR") return 'HR'
    return text
    .toLowerCase()
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}


defineProps<{
  employees: EmployeeDto[]
}>()

defineEmits(['deleteEmployee'])
</script>
