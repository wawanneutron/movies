import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useMovieDetails = defineStore('detailsMovie', () => {
  const movie = ref({})
  const isLoading = ref(false)

  const fetchDetailMovie = async (selectedId) => {
    isLoading.value = true

    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${import.meta.env.VITE_KEY}&i=${selectedId}`
      )

      const data = await res.json()

      movie.value = data
    } catch (err) {
      console.error(err)
    } finally {
      isLoading.value = false
    }
  }

  return { movie, fetchDetailMovie, isLoading }
})
