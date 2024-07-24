<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth';

const authStore = useAuthStore();
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <header class="bg-gray-800 text-white p-4 shadow-md">
      <div class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <img alt="Vue logo" class="h-8 w-8 mr-2" src="@/assets/logo.svg" />
          <span class="text-lg font-bold">Chirper</span>
        </div>
        <nav class="space-x-4">
          <template v-if="!authStore.token">
            <div class="flex justify-between gap-x-2">
              <RouterLink to="/login" class="hover:text-gray-400">Login</RouterLink>
              <RouterLink to="/register" class="hover:text-gray-400">Register</RouterLink>
            </div>
          </template>
          <template v-else>
            <div class="flex justify-between gap-x-2">
              <RouterLink to="/chirps" class="hover:text-gray-400">Chirps</RouterLink>
              <RouterLink to="/logout" class="hover:text-gray-400">Logout</RouterLink>
            </div>
          </template>
        </nav>
      </div>
    </header>

    <main class="flex-grow container mx-auto p-4">
      <RouterView />
    </main>

    <footer class="bg-gray-800 text-white text-center p-4">
      &copy; 2024 Chirper. All rights reserved.
    </footer>
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

nav a.router-link-exact-active {
  color: white;
}
</style>
