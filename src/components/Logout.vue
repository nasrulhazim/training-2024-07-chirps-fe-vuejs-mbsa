<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 class="text-2xl font-bold text-center">Logout</h2>
        <p class="text-center">Are you sure you want to log out?</p>
        <div class="space-y-4">
          <button @click="handleLogout" class="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600">
            Logout
          </button>
          <RouterLink to="/chirps" class="block text-center text-blue-500">Cancel</RouterLink>
        </div>
      </div>
    </div>
  </template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '../stores/auth';

  export default defineComponent({
    setup() {
      const router = useRouter();
      const authStore = useAuthStore();

      const handleLogout = () => {
        authStore.logout();
        router.push('/login');
      };

      return { handleLogout };
    }
  });
  </script>
