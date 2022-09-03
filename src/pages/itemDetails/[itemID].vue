<script setup lang="ts">
import ItemDataService from '~/services/itemDataService'
// import type Item from '~/types/Item'
const props = defineProps<{ itemID: number }>()
const router = useRouter()

const currentItem = ref({
  id: null,
  title: '',
  description: '',
  price: 0.00,
  availability: 0,
})
const message = ref('')

function getItem(id: any) {
  ItemDataService.get(id)
    .then((response) => {
      currentItem.value = response.data
      // console.log(response.data)
    })
    .catch((e: Error) => {
      // console.log(e)
    })
}
function updateItem() {
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
      router.push({ name: 'itemsList' })
    })
    .catch((e: Error) => {
      // console.log(e)
    })
}
onMounted(() => {
  message.value = ''
  getItem(props.itemID)
})
</script>

<template>
  <div v-if="currentItem.id" class="edit-form">
    <h4>Товар</h4>
    <form>
      <div class="form-group">
        <label for="title">Название</label>
        <input
          id="title"
          v-model="currentItem.title"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="title">Описание</label>
        <input
          id="description"
          v-model="currentItem.description"
          type="text"
          class="form-control"
        >
      </div>
      <div class="form-group">
        <label for="description">Цена</label>
        <input
          id="price"
          v-model="currentItem.price"
          type="number"
          class="form-control"
          min="0"
        >
      </div>
      <div class="form-group">
        <label for="description">Количество</label>
        <input
          id="availability"
          v-model="currentItem.availability"
          type="number"
          class="form-control"
          min="0"
        >
      </div>
    </form>

    <button class="badge bg-red" @click="deleteItem">
      Удалить предмет
    </button>

    <button type="submit" class="badge bg-blue" @click="updateItem">
      Обновить предмет
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br>
    <p>Please click on a Item...</p>
  </div>
</template>
