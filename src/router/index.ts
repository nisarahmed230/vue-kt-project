import { createRouter, createWebHistory } from 'vue-router'
import EmployeePage from '../pages/EmployeePage.vue'
import ProjectPage from '../pages/ProjectPage.vue'
import EmployeeHierarchyPage from '../pages/EmployeeHierarchyPage.vue'

const routes = [
  { path: '/', redirect: '/employees' },
  { path: '/employees', component: EmployeePage },
  { path: '/projects', component: ProjectPage },
  { path: '/employee-hierarchy', component: EmployeeHierarchyPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router