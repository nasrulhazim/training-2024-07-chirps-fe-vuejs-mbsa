<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Chirps</h1>

    <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <form @submit.prevent="submit">
        <textarea
          v-model="message"
          placeholder="What's on your mind?"
          class="p-4 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
        ></textarea>
        <p v-if="errors.message" class="text-red-500 mt-2">{{ errors.message }}</p>
        <button
          type="submit"
          class="mt-4 px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600"
          :disabled="processing"
        >
          Chirp
        </button>
      </form>
      <div class="space-y-4 mt-4">
        <div v-for="chirp in chirps" :key="chirp.id" class="p-4 bg-white shadow-md rounded-md">
          <div class="flex justify-between">
            <div>
              <p class="text-gray-700">{{ chirp.message }}</p>
              <p class="text-sm text-gray-500">- {{ chirp.user.name }}</p>
            </div>
            <button
              @click="deleteChirp(chirp.id)"
              class="mt-2 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ApiService from '../services/api'

export default defineComponent({
  data() {
    return {
      chirps: [] as Array<any>,
      message: '',
      errors: {} as Record<string, any>,
      processing: false
    }
  },
  async created() {
    await this.fetchChirps()
  },
  methods: {
    async fetchChirps() {
      try {
        const response = await ApiService.getChirps()
        this.chirps = response.data
      } catch (error) {
        console.error('Failed to fetch chirps', error)
      }
    },
    async submit() {
      this.processing = true
      this.errors = {}

      try {
        await ApiService.postChirp({ message: this.message })
        this.message = ''
        await this.fetchChirps()
      } catch (error) {
        this.errors.message = 'Failed to submit chirp'
      } finally {
        this.processing = false
      }
    },
    async deleteChirp(id: number) {
      try {
        if (window.confirm('Are you sure want to delete this chirp?')) {
          await ApiService.deleteChirp(id)
          this.chirps = this.chirps.filter((chirp) => chirp.id !== id)
        }
      } catch (error) {
        console.error('Failed to delete chirp', error)
      }
    }
  }
})
</script>
