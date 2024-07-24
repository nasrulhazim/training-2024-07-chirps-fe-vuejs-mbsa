<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Chirps</h1>

    <div class="max-w-2xl mx-auto p-4 sm:p-6 lg:p-8">
      <form @submit.prevent="submit">
        <div>
          <textarea
            v-model="message"
            placeholder="What's on your mind?"
            class="p-4 block w-full border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm"
          ></textarea>
          <p v-if="errors.message" class="text-red-500 mt-2">{{ errors.message }}</p>
        </div>
        <div class="flex justify-end">
        <button
          type="submit"
          class="mt-4 px-2 py-1 bg-green-500 text-white rounded-md hover:bg-green-600"
          :disabled="processing"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>
      </div>
      </form>
      <div class="space-y-4 mt-4">
        <div v-for="chirp in chirps" :key="chirp.id" class="p-4 bg-white shadow-md rounded-md">
          <div class="flex justify-between">
            <div>
              <p class="text-gray-700">{{ chirp.message }}</p>
              <p class="text-sm text-gray-500">- {{ chirp.user.name }}</p>
            </div>
            <div
              @click="deleteChirp(chirp.id)"
              class="mt-2 px-4 py-2 text-red rounded-md hover:text-red-600 cursor-pointer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
              </svg>
            </div>

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
