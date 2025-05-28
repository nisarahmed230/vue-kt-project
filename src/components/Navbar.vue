<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-4">
    <a class="navbar-brand" href="#">Employee Portal</a>
    <div class="collapse navbar-collapse">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link" to="/employees">Employees</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/projects">Projects</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/employee-hierarchy">Employee Hierarchy</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup lang="ts">
</script>

<style scoped>
.nav-link.router-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>