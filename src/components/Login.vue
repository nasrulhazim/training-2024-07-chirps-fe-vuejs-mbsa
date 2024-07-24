<template>
    <div class="min-h-screen flex items-center justify-center bg-gray-100">
      <div class="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-md">
        <h2 class="text-2xl font-bold text-center">Login</h2>
        <p v-if="error" class="text-red-500 text-center">{{ error }}</p>
        <form @submit.prevent="handleSubmit" class="space-y-4">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <input
              v-model="form.password"
              type="password"
              id="password"
              required
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-700"
          >
            Login
          </button>
          <p class="text-center">
            Don't have an account? <router-link to="/register" class="text-blue-500">Register</router-link>
          </p>
        </form>
      </div>
    </div>
</template>

  <script lang="ts">
  import { defineComponent } from 'vue';
  import { useRouter } from 'vue-router';
  import ApiService from '../services/api';

  export default defineComponent({
    data() {
      return {
        form: {
          email: '',
          password: ''
        },
        error: null as string | null
      };
    },
    setup() {
      const router = useRouter();
      return { router };
    },
    methods: {
      async handleSubmit() {
        try {
          const response = await ApiService.login(this.form);
          const token = `${response.data.token_type} ${response.data.access_token}`;
          localStorage.setItem('token', token);
          this.router.push('/chirps');
        } catch (error) {
          this.error = 'Invalid email or password';
        }
      }
    }
  });
  </script>
