<template>
  <div class="mt-4">
    <ul>
      <template v-for="(movie, i) of movies" :key="i">
        <li
          class="border-1 flex cursor-pointer gap-4 border-b border-slate-700 px-6 py-4 hover:bg-slate-700"
        >
          <img
            class="rounded-sm"
            :src="movie.poster"
            :alt="movie.title"
            width="60"
            @error="onErrorImage"
          />
          <div class="flex flex-grow flex-col justify-center gap-4">
            <h3>{{ movie.title }}</h3>
            <div class="flex items-center justify-between">
              <p class="flex gap-2">
                <span>⭐️</span>
                <span>{{ movie.imdbRating }}</span>
              </p>
              <p class="flex gap-2">
                <span>🌟</span>
                <span>{{ movie.userRating }}</span>
              </p>
              <p class="flex gap-2">
                <span>⏳</span>
                <span>{{ movie.runtime }} min</span>
              </p>
              <button
                class="h-6 w-6 rounded-full bg-red-950 text-sm text-stone-500 hover:bg-red-600 hover:text-stone-200"
                @click="onDeleteWathced(movie.imdbID)"
              >
                X
              </button>
            </div>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { onErrorImage } from '@/utils/helpers'

const movies = ref({})

onBeforeMount(() => {
  const storedValue = localStorage.getItem('watched')
  movies.value = JSON.parse(storedValue)
})

const onDeleteWathced = (id) => {
  movies.value = movies.value.filter((movie) => movie.imdbID !== id)

  localStorage.setItem('watched', JSON.stringify(movies.value))
}
</script>
