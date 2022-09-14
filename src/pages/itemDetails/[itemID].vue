<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import Item from '~/types/Item'
const props = defineProps<{ itemID: string }>()
const router = useRouter()
const auth = useAuthStore()
const flags = useFlagStore()

const currentUser = $ref(auth.getUser())

const currentItem: Ref<Item> = ref(new Item())
const message = ref('')
const imageURL = ref('')
const categories: Ref<any> = ref([])
const image = ref()

function getItem(id: any) {
  flags.closePopUps()
  ItemDataService.get(id)
    .then((response) => {
      currentItem.value = response.data
      imageURL.value = `${import.meta.env.VITE_base_api.toString()}/${import.meta.env.VITE_url_images.toString()}${response.data.fileName}`
      // console.log(response.data)
    })
    .catch((e: Error) => {
      // console.log(e)
    })
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

function updateItem() {
  const formData = new FormData()
  formData.append('file', image.value.files[0])
  Object.entries(currentItem).forEach(([key, value]) => {
    formData.append(key, value)
  })
  ItemDataService.update(currentItem.value.id, currentItem)
    .then((response) => {
      // console.log(response.data)
      message.value = 'Предмет был изменен!'
    })
    .catch((e: Error) => {
      // console.log(e)
    })
}

function deleteItem() {
  ItemDataService.delete(currentItem.value.id)
    .then((response) => {
      // console.log(response.data)
      router.push('/')
    })
    .catch((e: Error) => {
      // console.log(e)
    })
}

const showBadButtons = () => {
  if (currentUser && currentUser.roles)
    return currentUser.roles.includes('ROLE_MANAGER')
  return false
}

message.value = ''
getItem(props.itemID)
retrieveCategories()
</script>

<template>
  <div v-if="currentItem.id" class="edit-form">
    <h4>Товар</h4>
    <form>
      <div class="form-group">
        <div class="photo">
          <img :src="imageURL" loading="lazy">
        </div>
        <label>Новое изображение</label>
        <input
          :ref="(e) => { image = e }"
          type="file"
          class="form-control"
          accept="image/*"
          required
        >
        <span v-if="!imageURL">Тут должно быть изображение !</span>
      </div> <br>
      <div class="form-group">
        <strong>{{ currentItem.title }}</strong> <br>
        <label for="title">Новое название</label>
        <input
          id="title"
          v-model="currentItem.title"
          type="text"
          class="form-control"
        >
      </div> <br>
      <div class="form-group">
        <p>{{ currentItem.description }}</p>
        <label for="title">Новое описание</label>
        <input
          id="description"
          v-model="currentItem.description"
          type="text"
          class="form-control"
        >
      </div> <br>
      <div class="form-group">
        <strong>{{ currentItem.price }}</strong> <br>
        <label for="description">Новая цена</label>
        <input
          id="price"
          v-model="currentItem.price"
          type="number"
          class="form-control"
          min="0"
        >
      </div> <br>
      <div class="form-group">
        <strong>{{ currentItem.price }}</strong> <br>
        <label for="description">Новая цена</label>
        <input
          id="price"
          v-model="currentItem.price"
          type="number"
          class="form-control"
          min="0"
        >
      </div> <br>
      <div class="form-group">
        <label for="description">Категория</label>
        <select v-model="currentItem.categoryId" class="form-select">
          <option v-for="category in categories" :key="category.id" :value="category.name">
            {{ category.name }}
          </option>
        </select>
      </div>
    </form>

    <button v-if="showBadButtons()" class="badge bg-red" @click="deleteItem">
      Удалить предмет
    </button>

    <button v-if="showBadButtons()" class="badge bg-green" @click="updateItem">
      Обновить предмет
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br>
    <p>Выберите предмет</p>
  </div>
</template>

<style scoped>
  .badge {
    margin: 5px;
    font-size: 12px;
  }
</style>
