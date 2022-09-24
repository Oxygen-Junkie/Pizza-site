<script setup lang="ts">
import { useFlagStore } from '~/store/flags.module'

const flags = useFlagStore()
const showHeadbar = ref(true)
const lastScrollPosition = ref(0)

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

window.addEventListener('scroll', handleScroll)
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <nav class=" navbar navbar-expand navbar-blue bg-yellow" :class="{ 'h--hidden': !showHeadbar }">
    <a href="/" class="navbar-brand">Пиццерия</a>
    <div class="navbar-nav mr-auto">
      <li class="nav-item">
        <router-link v-if="!flags.shade" to="/addItem" class="nav-link">
          <p i-carbon-pills-add /> Добавить предмет
        </router-link>
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
