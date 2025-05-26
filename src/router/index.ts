import { createRouter, createWebHistory } from 'vue-router'
import EmployeePage from '../pages/EmployeePage.vue'
import ProjectPage from '../pages/ProjectPage.vue'
import AssignManagerPage from '../pages/AssignManagerPage.vue'
import ManagerMappingPage from '../pages/ManagerMappingPage.vue'

const routes = [
  { path: '/', redirect: '/employees' },
  { path: '/employees', component: EmployeePage },
  { path: '/projects', component: ProjectPage },
  { path: '/assign-manager', component: AssignManagerPage },
  { path: '/manager-mappings', component: ManagerMappingPage },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

