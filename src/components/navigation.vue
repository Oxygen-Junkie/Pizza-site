<script setup lang="ts">
import { useFlagStore } from '~/store/flags.module'

const auth = useAuthStore()
const flags = useFlagStore()
const router = useRouter()
const showHeadbar = ref(true)
const lastScrollPosition = ref(0)
const title = ref('')

const currentUser = $ref(auth.getUser())

const showManagerBoard = () => {
  if (currentUser && currentUser.roles)
    return currentUser.roles.includes('ROLE_MANAGER')

  return false
}

function logOut() {
  auth.signOut()
  flags.rerender()
  router.push('/')
}

const handleScroll = () => {
  const OFFSET = 60
  const currentScrollPostion = window.scrollY || document.documentElement.scrollTop
  if (currentScrollPostion < 0)

    return

  if (Math.abs(currentScrollPostion - lastScrollPosition.value) > OFFSET)

    return
  showHeadbar.value = currentScrollPostion < lastScrollPosition.value
  lastScrollPosition.value = currentScrollPostion
}

function searchTitle() {
  router.push(`/searchResult/${title.value}`)
}

window.addEventListener('scroll', handleScroll)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class=" navbar navbar-expand navbar-blue bg-blue" :class="{ 'h--hidden': !showHeadbar }">
    <a href="/" class="navbar-brand">Apteka</a>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link v-if="!flags.shade" to="/home" class="nav-link">
          <p i-carbon-home /> Главная страница
        </router-link>
      </li>
      <li v-if="showManagerBoard()" class="nav-item">
        <router-link v-if="!flags.shade" to="/addItem" class="nav-link">
          <p i-carbon-pills-add /> Добавить предмет
        </router-link>
      </li>
    </div>

    <div class="input-group mb-3">
      <input v-model="title" type="text" class="form-control form-control-sm" placeholder="Введите название товара или категории">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary bg-blue" type="button" @click="searchTitle">
          Найти
        </button>
      </div>
    </div>

    <div v-if="!currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <button class="nav-link" :disabled="flags.shade" @click.prevent="flags.changePopUpSignIn">
          <p i-carbon-user /> Войти
        </button>
      </li>
    </div>

    <div v-if="currentUser" class="navbar-nav ml-auto">
      <li class="nav-item">
        <router-link v-if="!flags.shade" to="/profile" class="nav-link">
          <p i-carbon-user-profile-alt /> Профиль
          {{ currentUser.phone }}
        </router-link>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click.prevent="logOut">
          <p i-carbon-logout /> Выйти
        </a>
      </li>
    </div>
  </nav>
</template>

<style scoped>
  .navbar {
    position: sticky;
    top:0;
  }

  .h--hidden{
  box-shadow: none;
  transform: translate3d(0,-115px,0);
}
</style>
