<template>
  <!-- Success Alert Banner -->
  <div v-if="successMessage" class="alert alert-success alert-dismissible fade show" role="alert">
    {{ successMessage }}
    <button type="button" class="btn-close" @click="successMessage = ''" aria-label="Close"></button>
  </div>

  <form @submit.prevent="onSubmit" class="mb-5">
    <div class="row">
      <!-- Basic Fields with Labels -->
      <div class="col-md-4 mb-3" v-for="field in basicFields" :key="field.model">
        <label :for="field.model" class="form-label fw-bold">{{ field.placeholder }}</label>
        <input
          :id="field.model"
          v-model="form[field.model]"
          class="form-control"
          :placeholder="field.placeholder"
          :type="field.type || 'text'"
          required
        />
      </div>

      <!-- Department Dropdown -->
      <div class="col-md-4 mb-3">
        <label for="department" class="form-label fw-bold">Department</label>
        <select id="department" v-model="form.department" class="form-control" required>
          <option disabled value="">Select Department</option>
          <option v-for="option in departments" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <!-- Designation Dropdown -->
      <div class="col-md-4 mb-3">
        <label for="designation" class="form-label fw-bold">Designation</label>
        <select id="designation" v-model="form.designation" class="form-control" required>
          <option disabled value="">Select Designation</option>
          <option v-for="option in designations" :key="option" :value="option">{{ option }}</option>
        </select>
      </div>

      <!-- Hire Date -->
      <div class="col-md-4 mb-3">
        <label for="hireDate" class="form-label fw-bold">Hire Date</label>
        <input
          id="hireDate"
          v-model="form.hireDate"
          class="form-control"
          type="date"
          placeholder="Hire Date"
          required
        />
      </div>

      <!-- Project Dropdown -->
      <div class="col-md-4 mb-3">
        <label for="project" class="form-label fw-bold">Project</label>
        <select id="project" v-model="form.projectId" class="form-control" required>
          <option disabled value="">Select Project</option>
          <option v-for="project in projects" :key="project.projectId" :value="project.projectId">
            {{ project.projectName }}
          </option>
        </select>
      </div>

      <!-- Employee Details -->
      <div class="col-md-4 mb-3">
        <label for="dateOfBirth" class="form-label fw-bold">Date of Birth</label>
        <input
          id="dateOfBirth"
          v-model="form.employeeDetails.dateOfBirth"
          class="form-control"
          type="date"
        />
      </div>
      <div class="col-md-4 mb-3">
        <label for="maritalStatus" class="form-label fw-bold">Marital Status</label>
        <select
          id="maritalStatus"
          v-model="form.employeeDetails.maritalStatus"
          class="form-control"
          required
        >
          <option disabled value="">Select Marital Status</option>
          <option v-for="status in maritalStatuses" :key="status" :value="status">
            {{ status }}
          </option>
        </select>
      </div>

      <!-- Address -->
      <div class="col-md-4 mb-3" v-for="field in addressFields" :key="field.model">
        <label :for="field.model" class="form-label fw-bold">{{ field.placeholder }}</label>
        <input
          :id="field.model"
          v-model="form.employeeDetails.address[field.model]"
          class="form-control"
          :placeholder="field.placeholder"
        />
      </div>
    </div>

    <button type="submit" class="btn btn-primary">Create Employee</button>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { EmployeeDto } from '../types/EmployeeDto'
import { createEmployee } from '../api/employeeApi'
import { getAllProjects } from '../api/projectApi'
import type { ProjectDto } from '../types/ProjectDto'

const emit = defineEmits(['employeeCreated'])
const departments = ['HR', 'FINANCE', 'ENGINEERING', 'SALES', 'MARKETING']
const designations = ['INTERN', 'ASSOCIATE', 'SENIOR_ENGINEER', 'MANAGER', 'DIRECTOR']
const maritalStatuses = ['Single', 'Married', 'Divorced', 'Widowed']

const projects = ref<ProjectDto[]>([])
const successMessage = ref('')

onMounted(async () => {
  try {
    const res = await getAllProjects()
    projects.value = res.data
  } catch (err) {
    console.error('Failed to load projects', err)
  }
})

const form = ref<EmployeeDto & { projectId: number | null }>({
  firstName: '',
  lastName: '',
  email: '',
  phoneNumber: '',
  hireDate: '',
  salary: 0,
  jobId: '',
  department: '',
  designation: '',
  employeeDetails: {
    dateOfBirth: '',
    maritalStatus: '',
    address: {
      street: '',
      city: '',
      state: '',
      zipCode: '',
    },
  },
  projectId: null,
})

const basicFields = [
  { model: 'firstName', placeholder: 'First Name' },
  { model: 'lastName', placeholder: 'Last Name' },
  { model: 'email', placeholder: 'Email', type: 'email' },
  { model: 'phoneNumber', placeholder: 'Phone Number' },
  { model: 'salary', placeholder: 'Salary', type: 'number' },
  { model: 'jobId', placeholder: 'Job ID' },
]

const addressFields = [
  { model: 'street', placeholder: 'Street' },
  { model: 'city', placeholder: 'City' },
  { model: 'state', placeholder: 'State' },
  { model: 'zipCode', placeholder: 'Zip Code' },
]

const onSubmit = async () => {
  try {
    const res = await createEmployee(form.value)
    emit('employeeCreated', res.data)

    successMessage.value = 'Employee created successfully!'
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)

    Object.assign(form.value, {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      hireDate: '',
      salary: 0,
      jobId: '',
      department: '',
      designation: '',
      employeeDetails: {
        dateOfBirth: '',
        maritalStatus: '',
        address: {
          street: '',
          city: '',
          state: '',
          zipCode: '',
        },
      },
      projectId: null,
    })
  } catch (error) {
    console.error(error)
    alert('Error creating employee.')
  }
}
</script>
