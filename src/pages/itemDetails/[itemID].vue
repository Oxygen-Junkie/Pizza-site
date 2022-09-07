<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'
const props = defineProps<{ itemID: number }>()
const router = useRouter()
const auth = useAuthStore()

const currentUser = $ref(auth.getUser())

const currentItem: Ref<Item | undefined> = ref()
const message = ref('')
const imageURL = ref('')
let image: any

function getItem(id: any) {
  currentItem.value = ItemDataService.get(id)
    .then((response) => {
      currentItem.value = response.data
      // console.log(response.data)
    })
    .catch((e: Error) => {
      // console.log(e)
    })
  imageURL.value = import.meta.env.VITE_base_api.toString() + import.meta.env.VITE_url_images.toString() + currentItem.value.fileName
}
function updateItem() {
  ItemDataService.update(currentItem.value.id, currentItem, image)
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

function retrieveImage() {
  imageURL.value = import.meta.env.VITE_base_api.toString() + import.meta.env.VITE_url_images.toString() + currentImage.value.fileName
}

function receiveImage(imagez: any) {
  image = imagez
}

message.value = ''
getItem(props.itemID)
retrieveImage()
</script>

<template>
  <div v-if="currentItem.id" class="edit-form">
    <h4>Товар</h4>
    <form>
      <div class="form-group">
        <div class="photo">
          <img :src="imageURL" loading="lazy">
        </div>
        <label for="image">Новое изображение</label>
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
        <strong>{{ currentItem.title }}</strong>
        <label for="title">Новое название</label>
        <input
          id="title"
          v-model="currentItem.title"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <p>{{ currentItem.description }}</p>
        <label for="title">Новое описание</label>
        <input
          id="description"
          v-model="currentItem.description"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <strong>{{ currentItem.price }}</strong>
        <label for="description">Новая цена</label>
        <input
          id="price"
          v-model="currentItem.price"
          type="number"
          class="form-control"
          min="0"
        >
      </div>
      <div class="form-group">
        <strong>{{ currentItem.availability }}</strong>
        <label for="description">Новое количество</label>
        <input
          id="availability"
          v-model="currentItem.availability"
          type="number"
          class="form-control"
          min="0"
        >
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
