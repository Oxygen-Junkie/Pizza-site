<script setup lang="ts">
import { useFlagStore } from '~/store/flags.module'

const flags = useFlagStore()
</script>

<template>
  <main>
    <signin v-if="flags.popUpSignIn" />
    <signup v-if="flags.popUpSignUp" />
    <item_view v-if="flags.popUpItem" :item="flags.getItem()" />
    <div :class="{ 'b blur': flags.shade }">
      <navigation :key="flags.render" />
      <div
        style="
          display:flex;
        "
      >
        <div
          style="
          flex: 1;
        "
        >
          <categories />
        </div>
        <div
          style="
          flex: 5;
        "
        >
          <RouterView />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
  .b.blur{
    filter:blur(5px);
  };
</style>
