<script setup lang="ts">
import { useAuthStore } from '~/store/auth.module'
import { useFlagStore } from '~/store/flags.module'
const Auth = useAuthStore()
const flags = useFlagStore()
const router = useRouter()

const currentUser = $ref(Auth.getUser())

onMounted(() => {
  if (!currentUser) {
    router.push('/')
    flags.changePopUpSignIn()
  }
})
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ currentUser.phone.substring(0, 7) }}</strong> Профиль
      </h3>
    </header>
    <p>
      <strong>Токен:</strong>
      {{ currentUser.accessToken.substring(0, 20) }} ...
      {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
    </p>
    <p>
      <strong>Идентификатор пользователя:</strong>
      {{ currentUser.id }}
    </p>
    <p>
      <strong>Электронная почта:</strong>
      {{ currentUser.email }}
    </p>
    <strong>Права:</strong>
    <ul>
      <li v-for="(role, index) in currentUser.roles" :key="index">
        {{ role }}
      </li>
    </ul>
  </div>
</template>
