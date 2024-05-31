<template>
  <div class="main mt-10 p-4">
    <h1>{{ props.title }}</h1>
    <div class="creds">
      <div style="width: 400px; height: 130px; margin-top: 20px; font-size: larger">
        <span>Name: {{ user.name }}</span> <br />
        <span>Age: {{ user.age }}</span>
      </div>
      <div class="form flex items-center gap-2">
        <label> Enter Firstname </label>
        <input
          class="w-[250px] bg-slate-300 px-4 py-1 text-slate-900"
          type="text"
          v-model="user.search"
          style="font-size: 20px"
          placeholder="Enter name"
          @change="getAge"
        />
      </div>
      <button type="button" class="mt-4 rounded-md bg-orange-500 px-6 py-3" @click="getAge">
        Guess the age
      </button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
const props = defineProps({
  title: {
    type: String,
    default: 'Test Component'
  }
})

const user = reactive({ name: '', age: '', search: null })

const getAge = () => {
  fetch('https://api.agify.io/?name=' + user.search)
    .then((response) => response.json())
    .then((data) => {
      user.age = data.age
      user.name = data.name
      user.search = null
    })
}
</script>
