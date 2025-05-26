<template>
  <form @submit.prevent="onSubmit" class="mb-4">
    <div class="row">
      <div class="col-md-4 mb-3">
        <label for="projectName" class="form-label fw-bold">Project Name</label>
        <input
          id="projectName"
          v-model="form.projectName"
          class="form-control"
          placeholder="Project Name"
          required
        />
      </div>
      <div class="col-md-4 mb-3">
        <label for="startDate" class="form-label fw-bold">Start Date</label>
        <input
          id="startDate"
          v-model="form.startDate"
          class="form-control"
          type="date"
          required
        />
      </div>
      <div class="col-md-4 mb-3">
        <label for="endDate" class="form-label fw-bold">End Date</label>
        <input
          id="endDate"
          v-model="form.endDate"
          class="form-control"
          type="date"
          required
        />
      </div>
    </div>
    <button type="submit" class="btn btn-primary">Create Project</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { ProjectDto } from '../types/ProjectDto'
import { createProject } from '../api/projectApi'

const emit = defineEmits(['projectCreated'])

const form = ref<ProjectDto>({
  projectName: '',
  startDate: '',
  endDate: '',
})

const onSubmit = async () => {
  try {
    const res = await createProject(form.value)
    emit('projectCreated', res.data)
    alert('Project created successfully!')
    form.value = { projectName: '', startDate: '', endDate: '' }
  } catch (error) {
    console.error(error)
    alert('Error creating project.')
  }
}
</script>
