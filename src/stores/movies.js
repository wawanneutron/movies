import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useMoviesStore = defineStore('movies', () => {
  const movies = ref([])
  const isLoading = ref(false)
  const search = ref('')

  const fetchMovies = async (query) => {
    isLoading.value = true

    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_KEY}&s=${query}`
      )

      const data = await res.json()
      movies.value = data?.Search
    } catch (error) {
      console.error(error)
    } finally {
      isLoading.value = false
    }
  }

  return { movies, fetchMovies, isLoading, search }
})
