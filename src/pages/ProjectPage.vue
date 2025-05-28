<template>
  <div class="container mt-4">
    <h2 class="mb-4">Project Management</h2>

    <div class="mb-3 d-flex gap-2">
      <button class="btn btn-primary" @click="fetchProjects">All Projects</button>
      <button class="btn btn-warning" @click="fetchProjectsNoEmployees">No-Employee Projects</button>
    </div>

    <ProjectForm @projectCreated="fetchProjects" />
    <ProjectTable :projects="projects" @deleteProject="handleDelete" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import ProjectForm from './ProjectForm.vue'
import ProjectTable from './ProjectTable.vue'
import { getAllProjects, deleteProject, getProjectsWithNoEmployees } from '../api/projectApi'
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

const fetchProjectsNoEmployees = async () => {
  try {
    projects.value = await getProjectsWithNoEmployees()
  } catch (error) {
    console.error('Failed to fetch projects with no employees:', error)
  }
}

const handleDelete = async (id: number) => {
  const confirmed = confirm('Are you sure you want to delete this project?')
  if (!confirmed) return

  try {
    await deleteProject(id)
    projects.value = projects.value.filter(p => p.projectId !== id)
    alert('Project deleted successfully!')
  } catch (error) {
    console.error('Failed to delete project:', error)
    alert('Error deleting project.')
  }
}

onMounted(fetchProjects)
</script>
