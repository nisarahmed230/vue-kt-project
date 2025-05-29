<template>
  <div v-if="employees.length">
    <table class="table table-bordered">
      <thead class="table-dark">
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Department</th>
          <th>Designation</th>
          <th>City</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="emp in employees" :key="emp.employeeId">
          <td>{{ emp.employeeId }}</td>
          <td>{{ capitalize(emp.firstName) }} {{ capitalize(emp.lastName) }}</td>
          <td>{{ emp.email }}</td>
          <td>{{ emp.phoneNumber }}</td>
          <td>{{ emp.department }}</td>
          <td>{{ emp.designation }}</td>
          <td>{{ emp.employeeDetails?.address?.city }}</td>
          <td>
            <button @click="$emit('deleteEmployee', emp.employeeId)" class="btn btn-danger btn-sm">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <p>No employees found.</p>
  </div>
</template>

<script setup lang="ts">
import { capitalize } from 'vue';
import type { EmployeeDto } from '../types/EmployeeDto'

defineProps<{
  employees: EmployeeDto[]
}>()

defineEmits(['deleteEmployee'])
</script>
