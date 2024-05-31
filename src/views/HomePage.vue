<template>
  <section class="flex justify-center gap-6 py-6">
    <BoxMovieList>
      <MovieList @on:select-movie="selectMovie" />
    </BoxMovieList>

    <BoxMovieList>
      <template v-if="!selectedId">
        <WatchedSummary />
        <WatchedMovieList />
        <GuessAge title="Guess User Age App" />
      </template>

      <MovieDetails v-else @on:closeMovie="onCloseMovie" :selectedId />
    </BoxMovieList>
  </section>
</template>

<script setup>
import { ref } from 'vue'

import GuessAge from '../components/GuessAge.vue'

import BoxMovieList from '@/components/BoxMovieList.vue'
import WatchedSummary from '@/components/WatchedSummary.vue'
import MovieList from '@/components/MovieList.vue'
import MovieDetails from '@/components/MovieDetails.vue'
import WatchedMovieList from '@/components/WatchedMovieList.vue'
import { useMovieDetails } from '@/stores/movieDetails'

const store = useMovieDetails()

const selectedId = ref(null)

const selectMovie = (id) => (selectedId.value = id)

const onCloseMovie = () => {
  selectedId.value = null
  store.movie = {}
}
</script>
