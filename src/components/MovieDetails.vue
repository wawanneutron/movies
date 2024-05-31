<template>
  <div>
    <button
      @click="$emit('on:closeMovie')"
      class="absolute left-3 mt-2 flex h-8 w-8 items-center justify-center rounded-full bg-slate-500"
    >
      <span class="-mt-2 text-2xl">&larr;</span>
    </button>

    <div v-if="store.isLoading">
      <h2 class="my-10 text-center text-xl font-bold">Loading...</h2>
    </div>

    <template v-else>
      <div class="flex gap-4 bg-slate-700">
        <img @error="onErrorImage" :src="store.movie.Poster" class="w-[50%]" />
        <div class="flex flex-col justify-center gap-4">
          <p class="text-2xl">{{ store.movie.Title }}</p>
          <p class="text-sm">{{ store.movie.Released }} &bull; {{ store.movie.Runtime }}</p>
          <p class="text-sm">{{ store.movie.Genre }}</p>
          <p class="text-sm">
            <span> ⭐️ </span>
            {{ store.movie.imdbRating }} IMDb rating
          </p>
        </div>
      </div>

      <div class="mx-12 mt-12 rounded-md bg-slate-700 p-6">
        <StarRating @on:rate="(val) => (userRating = val)" />
        <button
          v-if="userRating && !checkMovie"
          @click="addRating()"
          class="mt-4 block w-full rounded-full bg-slate-900 px-8 py-4 capitalize hover:bg-slate-950"
        >
          add to list +
        </button>
      </div>

      <div class="mt-6 p-6">
        <p class="mb-3">
          <em>{{ store.movie.Plot }}</em>
        </p>
        <p class="mb-2 text-sm">Starring: {{ store.movie.Actors }}</p>
        <p class="text-sm">Directed by: {{ store.movie.Director }}</p>
      </div>
    </template>
  </div>
</template>

<script setup>
import { onBeforeMount, computed, ref, watch } from 'vue'
import { useMovieDetails } from '@/stores/movieDetails'
import { onErrorImage } from '@/utils/helpers'
import StarRating from '@/components/StarRating.vue'

const props = defineProps({ selectedId: String })
const emit = defineEmits(['on:closeMovie'])

const store = useMovieDetails()

const userRating = ref(0)

onBeforeMount(() => {
  store.fetchDetailMovie(props.selectedId)
})

const addRating = () => {
  const newWatchedMovie = {
    imdbID: props.selectedId,
    title: store.movie.Title,
    poster: store.movie.Poster,
    year: store.movie.Year,
    imdbRating: Number(store.movie.imdbRating),
    runtime: Number(store.movie.Runtime.split(' ').at(0)),
    userRating: userRating.value
  }

  // save local storage
  let myArray
  const storedValue = localStorage.getItem('watched')

  storedValue ? (myArray = JSON.parse(storedValue)) : (myArray = [])

  myArray.push(newWatchedMovie)

  localStorage.setItem('watched', JSON.stringify(myArray))

  emit('on:closeMovie')
}

const checkMovie = computed(() => {
  const storedValue = localStorage.getItem('watched')
  const myMovies = JSON.parse(storedValue)

  return !!myMovies.find((movie) => movie.imdbID === store.movie.imdbID)
})

watch(
  () => props.selectedId,
  () => store.fetchDetailMovie(props.selectedId)
)

watch(
  () => props.selectedId,
  () => (userRating.value = 0)
)
</script>
