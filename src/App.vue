<template>
  <Navbar />

  <main class="bg-slate-900 text-stone-200">
    <router-view />
  </main>

  <Footer />
</template>

<script setup>
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>
