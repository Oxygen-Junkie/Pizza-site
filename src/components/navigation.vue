<script setup lang="ts">
import type { Ref } from 'vue'
import { useFlagStore } from '~/store/flags.module'
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'

const auth = useAuthStore()
const flags = useFlagStore()
const router = useRouter()
const showHeadbar = ref(true)
const lastScrollPosition = ref(0)
const title = ref('')
const items: Ref<Item[]> = ref([])

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
  ItemDataService.findByTitle(title.value)
    .then((response) => {
      items.value = response.data
      // console.log(response.data)
    })
    .catch((e) => {
      // console.log(e)
    })
}

window.addEventListener('scroll', handleScroll)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class=" navbar navbar-expand navbar-blue bg-blue" :class="{ 'n--hidden': !showHeadbar }">
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
  transform: translate3d(0,-100px,0);
}
</style>
