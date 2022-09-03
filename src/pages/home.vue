<script setup lang="ts">
import UserService from '~/services/userService'

const content = ref('')

onMounted(() => {
  UserService.getPublicContent().then(
    (response) => {
      content.value = response.data
    },
    (error) => {
      content.value
          = (error.response && error.response.data)
          || error.message
          || error.toString()
    },
  )
})
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>{{ content }}</h3>
    </header>
  </div>
</template>
