<script setup lang="ts">
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'
import type Category from '~/types/Category'

const categories = ref([])
const selectedCategory = ref({
  id: null,
  name: '',
})
const submitted = ref(false)
const submittedCat = ref(false)
let item: Item = {
  id: null,
  title: '',
  description: '',
  price: 0.00,
  availability: 0,
  categoryId: null,
}

const categoryz: Category = {
  id: null,
  name: '',
}

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
  const data = {
    title: item.title,
    description: item.description,
    price: item.price,
    availability: item.availability,
    categoryId: selectedCategory.value.id,
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

function saveCategory() {
  const data = {
    name: category.name,
  }

  ItemDataService.createCategory(data)
    .then((response) => {
      category.id = response.data.id
      // console.log(response.data)
      submittedCat.value = true
    })
    .catch((e) => {
      // console.log(e)
    })
}

function newCategory() {
  submittedCat.value = false
  category = {} as Category
}

retrieveCategories()
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

      <div class="form-group">
        <label for="description">Категория</label>
        <select v-model="selectedCategory" class="form-select">
          <option v-for="(category, index) in categories" :key="index" :value="category.name">
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
          v-model="categoryz.name"
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
