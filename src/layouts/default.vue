<script setup lang="ts">
import { useFlagStore } from '~/store/flags.module'

const flags = useFlagStore()
</script>

<template>
  <main>
    <div class="container h-100">
      <signin v-if="flags.popUpSignIn" />
      <signup v-if="flags.popUpSignUp" />
      <div :class="{ 'b blur': flags.shade }">
        <navigation :key="flags.render" />
        <div class="siteContent">
          <div class="categTab">
            <categories />
          </div>
          <div class="pageTab">
            <RouterView />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style>
  .b.blur{
    filter:blur(5px);
  };
  .siteContent{
  display:flex;
  width:100%;
};
  .categTab{
  flex: 2;
    flex-flow:column;
};
.pageTab{
  flex: 5;
};
</style>
