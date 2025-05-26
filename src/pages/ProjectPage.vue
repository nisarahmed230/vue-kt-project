<template>
  <div class="container mt-4">
    <h2 class="mb-4">Project Management</h2>
    <ProjectForm @projectCreated="fetchProjects" />
    <ProjectTable :projects="projects" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectForm from './ProjectForm.vue'
import ProjectTable from './ProjectTable.vue'
import { getAllProjects } from '../api/projectApi'
import type { ProjectDto } from '../types/ProjectDto'

const projects = ref<ProjectDto[]>([])

const fetchProjects = async () => {
  try {
    const res = await getAllProjects()
    projects.value = res.data
  } catch (error) {
    console.error('Failed to fetch projects:', error)
  }
}

onMounted(fetchProjects)
</script>
