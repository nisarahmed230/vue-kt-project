<template>
  <div v-if="visible" class="modal fade show d-block" style="background: rgba(0, 0, 0, 0.5)">
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-danger fw-bold">Employee Details</h5>
          <button type="button" class="btn-close" @click="close"></button>
        </div>
        <div class="modal-body">
          <div v-if="store.loading">Loading...</div>
          <div v-else-if="store.error">{{ store.error }}</div>
          <div v-else-if="store.employee">
            <h5 class="mb-3 text-primary">Basic Information</h5>
            <p><strong>Employee Id:</strong> {{ store.employee.employeeId }}</p>
            <p><strong>Name:</strong> {{ store.employee.firstName }} {{ store.employee.lastName }}</p>
            <p><strong>Email:</strong> {{ store.employee.email }}</p>
            <p><strong>Phone:</strong> {{ store.employee.phoneNumber }}</p>
            <p><strong>Hire Date:</strong> {{ store.employee.hireDate }}</p>
            <p><strong>Job Id:</strong> {{ store.employee.jobId }}</p>
            <p><strong>Designation:</strong> {{ formatTitleCase(store.employee.designation) }}</p>
            <p><strong>Department:</strong> {{ formatTitleCase(store.employee.department) }}</p>
            <p><strong>Salary:</strong> ₹{{ store.employee.salary }}</p>

            <hr />

            <h5 class="mb-3 text-primary">Personal Information</h5>
            <p><strong>Date of Birth:</strong> {{ store.employee.employeeDetails?.dateOfBirth }}</p>
            <p><strong>Marital Status:</strong> {{ store.employee.employeeDetails?.maritalStatus }}</p>
            
            <hr />

            <h5 class="mb-3 text-primary">Address</h5>
                <p><strong>Street:</strong> {{ store.employee.employeeDetails?.address?.street }}</p>
                <p><strong>City:</strong> {{ store.employee.employeeDetails?.address?.city }}</p>
                <p><strong>State:</strong> {{ store.employee.employeeDetails?.address?.state }}</p>
                <p><strong>Pincode:</strong> {{ store.employee.employeeDetails?.address?.zipCode }}</p>

            <hr />

            <h5 class="mb-3 text-primary">Project Info</h5>
                <p><strong>Project Name:</strong> {{ store.employee.project?.projectName }}</p>
                <p><strong>Start Date:</strong> {{ store.employee.project?.startDate }}</p>
                <p><strong>Start Date:</strong> {{ store.employee.project?.endDate }}</p>
            </div>

        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="close">Close</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { capitalize } from 'vue';
import { useEmployeeDetailsStore } from '../stores/employeeDetailsStore'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['close'])

const store = useEmployeeDetailsStore()

function close() {
  emit('close')
  store.clearEmployee()
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

</script>

<style scoped>
.modal {
  display: block;
}

.modal-body p, .modal-body li {
    font-size: 0.95rem;
}
</style>

