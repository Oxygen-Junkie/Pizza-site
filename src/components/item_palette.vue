<script setup lang="ts">
import type Item from '~/types/Item'
import { useFlagStore } from '~/store/flags.module'
const props = defineProps<{ item: Item }>()
const flags = useFlagStore()

const imageURL = ref('')

function retrieveItems() {
  imageURL.value = import.meta.env.VITE_base_api.toString() + import.meta.env.VITE_url_images.toString() + props.item.fileName
}

function setActiveItem() {
  flags.setItem(props.item)
  flags.changePopUpItem()
}

retrieveItems()
</script>

<template>
  <div class="photo">
    <button class="temp" :disabled="flags.shade" @click.prevent="setActiveItem">
      <img :src="imageURL" loading="lazy">
    </button>
  </div>
</template>

<style scoped>
  .photo {
    margin-bottom: 5px;
  }

  img {
    width: 100%;
    border-radius: 5px;
  }
</style>
