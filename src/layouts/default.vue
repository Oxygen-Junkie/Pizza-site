<script setup lang="ts">
import { useFlagStore } from '~/store/flags.module'

const flags = useFlagStore()
</script>

<template>
  <main>
    <div class="container">
      <signin v-if="flags.popUpSignIn" />
      <signup v-if="flags.popUpSignUp" />
      <div :class="{ 'b blur': flags.shade }">
        <navigation :key="flags.render" />
        <RouterView />
      </div>
    </div>
  </main>
</template>

<style>
  .b.blur{
    filter:blur(5px);
  };
</style>
