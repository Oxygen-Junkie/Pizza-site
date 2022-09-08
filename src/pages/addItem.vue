<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'
import type Category from '~/types/Category'

const categories: Ref<any> = ref([])
const category: Ref<Category> = ref() as Ref<Category>
const submitted = ref(false)
const submittedCat = ref(false)
const item: Ref<Item> = ref() as Ref<Item>
let image: any

function retrieveCategories() {
  ItemDataService.getAllCategories()
    .then((response) => {
      categories.value = response.data
      // console.log(items.value)
    })
    .catch((e) => {
      // console.log(e)
    })
}

function saveItem() {
  ItemDataService.create(item, image)
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
  item.value = ref().value
}

function saveCategory() {
  ItemDataService.createCategory(category)
    .then((response) => {
      category.value.id = response.data.id
      // console.log(response.data)
      submittedCat.value = true
    })
    .catch((e) => {
      // console.log(e)
    })
}

function newCategory() {
  submittedCat.value = false
  category.value = ref().value
}

function receiveImage(imagez: any) {
  image = imagez
}

retrieveCategories()
</script>

<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="image">Изображение</label>
        <input
          :ref="(image) => { receiveImage(image) }"
          type="file"
          class="form-control"
          accept="image/*"
          required
          name="image"
        >
        <span v-if="image">Название файла должно быть тут !</span>
      </div>
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

      <div class="form-group">
        <label for="description">Категория</label>
        <select v-model="item.categoryId" class="form-select">
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>

      <button class="btn bg-blue" @click="saveItem">
        Добавить товар
      </button>
    </div>

    <div v-else>
      <h4>Товар успешно добавлен</h4>
      <button class="btn bg-blue" @click="newItem">
        Добавить ещё один товар
      </button>
    </div>

    <br>

    <div v-if="!submittedCat">
      <div class="form-group">
        <label for="name">Наименование новой категории</label>
        <input
          id="name"
          v-model="category.name"
          type="text"
          class="form-control"
          required
          name="title"
        >
      </div>
      <button class="btn bg-blue" @click="saveCategory">
        Добавить категорию
      </button>
    </div>

    <div v-else>
      <h4>Категория успешно создана</h4>
      <button class="btn bg-blue bg-blue" @click="newCategory">
        Добавить ещё одну категорию
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
