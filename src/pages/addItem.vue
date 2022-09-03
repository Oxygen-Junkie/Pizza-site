<script setup lang="ts">
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'

const submitted = ref(false)
let item: Item = {
  id: null,
  title: '',
  description: '',
  price: 0.00,
  availability: 0,
}

function saveItem() {
  const data = {
    title: item.title,
    description: item.description,
    price: item.price,
    availability: item.availability,
  }

  ItemDataService.create(data)
    .then((response) => {
      item.id = response.data.id
      // console.log(response.data)
      submitted.value = true
    })
    .catch((e) => {
      // console.log(e)
    })
}

function newItem() {
  submitted.value = false
  item = {} as Item
}
</script>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Наименование</label>
        <input
          id="title"
          v-model="item.title"
          type="text"
          class="form-control"
          required
          name="title"
        >
      </div>

      <div class="form-group">
        <label for="description">Описание</label>
        <input
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
          v-model="item.price"
          type="number"
          class="form-control"
          min="0"
          required
          name="price"
        >
      </div>

      <div class="form-group">
        <label for="description">Количество</label>
        <input
          id="availability"
          v-model="item.availability"
          type="number"
          class="form-control"
          min="0"
          required
          name="availability"
        >
      </div>

      <button class="btn btn-success" @click="saveItem">
        Добавить
      </button>
    </div>

    <div v-else>
      <h4>Товар успешно добавлен</h4>
      <button class="btn btn-success" @click="newItem">
        Добавить ещё
      </button>
    </div>
  </div>
</template>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
