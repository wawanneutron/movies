<template>
  <nav class="flex items-center justify-between bg-sky-900 px-4 py-6 text-slate-100">
    <h2 class="text-[24px] font-bold text-orange-400">Watch Movie</h2>

    <input
      v-model="query"
      class="w-64 rounded-lg px-4 py-2 text-stone-800 transition-all duration-300 placeholder:text-stone-400 focus:outline-none focus:ring focus:ring-orange-400 sm:focus:w-72"
      type="text"
      placeholder="Search movie..."
    />

    <div class="flex items-center gap-6">
      <router-link to="/" activeClass="text-orange-400" class="text-xl">Home</router-link>
      <router-link to="about" activeClass="text-orange-400" class="text-xl">About</router-link>
    </div>
  </nav>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useMoviesStore } from '@/stores/movies'
import debounce from 'lodash.debounce'
const store = useMoviesStore()

const query = ref('')

const onSearchMovie = debounce(() => {
  store.fetchMovies(query.value)
  store.search = query.value
}, 700)

watch(
  () => query.value,
  () => onSearchMovie()
)
</script>
