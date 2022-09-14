<script setup lang="ts">
import type Item from '~/types/Item'
import { useFlagStore } from '~/store/flags.module'
const props = defineProps<{ item: Item }>()
const flags = useFlagStore()

const imageURL = ref('')

function retrieveItems() {
  imageURL.value = `${import.meta.env.VITE_base_api.toString()}/${import.meta.env.VITE_url_images.toString()}${props.item.fileName}`
}

function setActiveItem() {
  flags.setItem(props.item)
  flags.changePopUpItem()
}

retrieveItems()
</script>

<template>
  <div class="photo">
    <button :disabled="flags.shade" @click.prevent="setActiveItem">
      <img :src="imageURL" loading="lazy">
    </button>
    <p class="name">
      {{ props.item.title }}
    </p>
    <p class="price">
      {{ props.item.price }}
    </p>
  </div>
</template>

<style scoped>
  .photo {
    margin-bottom: 10px;
    border: solid;
    border-color: aqua;
    position: relative;
    text-align: center;
  }
  .name {
    position: absolute;
    bottom: 1px;
    left: 1px;
    background-color: white;
  }

  .price {
    position: absolute;
    bottom: 1px;
    right: 1px;
    background-color: white;
  }
</style>
