<template>
  <table class="table table-bordered">
    <thead class="table-light">
      <tr>
        <th>Project ID</th>
        <th>Project Name</th>
        <th>Start Date</th>
        <th>End Date</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="project in projects" :key="project.projectId">
        <td>{{ project.projectId }}</td>
        <td>{{ project.projectName }}</td>
        <td>{{ formatDate(project.startDate) }}</td>
        <td>{{ formatDate(project.endDate) }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { ProjectDto } from '../types/ProjectDto'
import { defineProps } from 'vue'

const props = defineProps<{ projects: ProjectDto[] }>()

const formatDate = (dateStr: string) => new Date(dateStr).toLocaleDateString()
</script>
