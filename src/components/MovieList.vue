<template>
  <section>
    <h2 v-if="store.search" class="my-6 p-4 text-xl font-bold">
      You search - "{{ store.search }}"
    </h2>

    <div v-if="store.isLoading">
      <h2 class="my-10 text-center text-xl font-bold">Loading...</h2>
    </div>

    <ul v-else>
      <template v-for="(movie, i) of store.movies" :key="i">
        <li
          @click="$emit('on:selectMovie', movie.imdbID)"
          class="border-1 flex cursor-pointer items-center gap-4 overflow-auto border-b border-slate-700 px-6 py-4 hover:bg-slate-700"
        >
          <img
            class="rounded-sm"
            :src="movie.Poster"
            :alt="movie.Title"
            width="60"
            @error="onErrorImage"
          />
          <div>
            <p class="pb-2 text-lg">
              {{ movie.Title }}
            </p>

            <p class="text-md flex gap-2">
              <span>🗓</span>
              <span>{{ movie.Year }}</span>
            </p>
          </div>
        </li>
      </template>
    </ul>
  </section>
</template>

<script setup>
import { useMoviesStore } from '@/stores/movies'
import { onErrorImage } from '@/utils/helpers'
const store = useMoviesStore()
</script>
