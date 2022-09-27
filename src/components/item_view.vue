<script setup lang="ts">
import type { Ref } from 'vue'
import type Item from '~/types/Item'
import { useFlagStore } from '~/store/flags.module'

const props = defineProps<{ item: Item }>()
const flags = useFlagStore()

const currentItem: Ref<Item> = ref(props.item)
const imageURL = ref('')

function retrieveItem() {
  imageURL.value = `${import.meta.env.VITE_base_api.toString()}/${import.meta.env.VITE_url_images.toString()}${currentItem.value.fileName}`
}

retrieveItem()
</script>

<template>
  <div class="card">
    <div class="bg-yellow">
      <div class="text-right">
        <button type="button" class="btn-close" @click.prevent="flags.closePopUps" />
      </div>
    </div>
    <div class="card-container text-center">
      <img
        :src="imageURL"
        class="rounded mx-auto product-img"
      >
      <div>
        <label><strong>Наименование:</strong></label> <br>
        <span class="text-warning">
          {{ currentItem.title }}
        </span>
      </div>
      <span class="text-warning">
        {{ currentItem.description }}
      </span>
	    <div>
        <label>Цена</label>
        <span class="text-warning">
          {{`: ${currentItem.price}руб`}}
        </span>
      </div>

      <button class="badge bg-yellow">
        <span i-carbon-shopping-cart-plus />
        Купить
      </button>

    </div>
  </div>
</template>

<style scoped>
.card-container {
  max-width: 350px !important;
  padding: 20px 25px 30px;
}
.card {
  background-color: whitesmoke;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  position:fixed;  z-index: 3;
  top: 30%;
  left: 50%;
  margin-left:-100px;
  margin-top:-130px;
}

.badge {
    margin: 5px;
    font-size: 20px;
  }

  .product-img {
    max-height: 250px;
  }
</style>
