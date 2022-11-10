<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import Item from '~/types/Item'

const submitted = ref(false)
const item: Ref<Item> = ref(new Item())
const image = ref()

function saveItem() {
  const formData = new FormData()
  formData.append('file', image.value.files[0])
  Object.entries(item.value).forEach(([key, value]) => {
    formData.append(key, value)
  })
  ItemDataService.create(formData)
    .then((response) => {
      item.value.id = response.data.id
      // console.log(response.data)
      submitted.value = true
    })
    .catch((e) => {
      // console.log(e)
    })
}

function newItem() {
  submitted.value = false
  item.value = new Item()
}
</script>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="image">Изображение</label>
        <input
          :ref="(e) => { image = e }"
          type="file"
          class="form-control"
          accept="image/*"
          required
          name="image"
        >
      </div>
      <div class="form-group">
        <label for="title">Наименование</label>
        <input
          id="title"
          v-model.trim="item.title"
          type="text"
          class="form-control"
          required
          name="title"
        >
      </div>

      <div class="form-group">
        <label for="description">Описание</label>
        <textarea
          id="description"
          v-model="item.description"
          class="form-control"
          required
          name="description"
        >
      </div>

      <div class="form-group">
        <label for="description">Цена</label>
        <input
          id="price"
          v-model.trim="item.price"
          type="number"
          class="form-control"
          min="200"
max="5000"
          required
          name="price"
        >
      </div>
      <button class="btn bg-yellow" @click="saveItem">
        Добавить предмет
      </button>
    </div>
    <div v-else>
      <h4>Товар успешно добавлен</h4>
      <button class="btn bg-yellow" @click="newItem">
        Добавить ещё один предмет
      </button>
    </div>
  </div>
</template>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}

.btn {
      margin-top: 10px;
    }
</style>
