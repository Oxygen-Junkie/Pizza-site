<script setup lang="ts">
import UserService from '~/services/UserService'

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
      NOSEp
    </header>
  </div>
</template>
