<script setup lang="ts">
import type { Ref } from 'vue'
import type Item from '~/types/Item'
import { useFlagStore } from '~/store/flags.module'

const props = defineProps<{ item: Item }>()
const flags = useFlagStore()

const currentItem: Ref<Item> = ref(props.item)
const imageURL = ref('')
const message = ref('')

function retrieveItem() {
  imageURL.value = `${import.meta.env.VITE_base_api.toString()}/${import.meta.env.VITE_url_images.toString()}${currentItem.value.fileName}`
}

function buy() {
}

retrieveItem()
</script>

<template>
  <div class="card card-container">
    <div class="text-right">
      <button type="button" class="btn-close" @click.prevent="flags.closePopUps" />
    </div>
    <img
      :src="imageURL"
      class="product-img"
    >
    <div>
      <label><strong>Наименование:</strong></label>
      {{ currentItem.title }}
    </div>
    <div>
      <label><strong>Описание:</strong></label><br>
      {{ currentItem.description }}
    </div>
    <div>
      <label><strong>Цена:</strong></label>
      {{ currentItem.price }}
    </div>

    <button class="badge bg-yellow" @click="buy">
      <span i-carbon-shopping-cart-plus />
      Купить
    </button>

    <div v-if="message" class="alert alert-danger" role="alert">
      {{ message }}
    </div>
  </div>
</template>

<style scoped>
.card-container.card {
  max-width: 350px !important;
  padding: 40px 40px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  position:fixed;  z-index: 2;
  top: 35%;
  left: 50%;
  margin-left:-100px;
  margin-top:-130px;
}

.badge {
    margin: 5px;
    font-size: 20px;
  }
</style>
