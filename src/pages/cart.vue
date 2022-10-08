<script setup lang="ts">
const flags = useFlagStore()
const mode = ref(3)
</script>

<template>
  <item_display :key="flags.render" :mode="mode" request="all" />
</template>

