<script setup lang="ts">
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'
import { useAuthStore } from '~/store/auth.module'
import { useFlagStore } from '~/store/flags.module'
const auth = useAuthStore()
const flags = useFlagStore()

const currentUser = $ref(auth.getUser())

const items = ref([])
const currentItem = ref({
  id: null,
  title: '',
  description: '',
  price: 0.00,
  availability: 0,
})
// const itemID = ref(NaN)
const currentIndex = ref(-1)
const title = ref('')

function retrieveItems() {
  ItemDataService.getAll()
    .then((response) => {
      items.value = response.data
      // console.log(items.value)
    })
    .catch((e) => {
      // console.log(e)
    })
}

function refreshList() {
  retrieveItems()
  currentItem.value = {} as Item
  currentIndex.value = -1
}

function setActiveItem(item: Item, index: number) {
  currentItem.value = item
  currentIndex.value = index
}

function searchTitle() {
  ItemDataService.findByTitle(title.value)
    .then((response) => {
      items.value = response.data
      // console.log(response.data)
    })
    .catch((e) => {
      // console.log(e)
    })
}

const showEditButton = () => {
  if (currentUser && currentUser.roles)
    return currentUser.roles.includes('ROLE_MANAGER')

  return false
}

onBeforeMount(() => {
  retrieveItems()
})
</script>

<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Товары в наличии</h4>
      <ul class="list-group">
        <li
          v-for="(item, index) in items"
          :key="index"
          class="list-group-item"
          :class="{ active: index === currentIndex }"
          :disabled="flags.shade"
          @click="setActiveItem(item, index)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="col-md-6">
      <div v-if="currentItem.id">
        <h4>Item</h4>
        <div>
          <label><strong>Наименование:</strong></label>
          {{ currentItem.title }}
        </div>
        <div>
          <label><strong>Описание:</strong></label>
          {{ currentItem.description }}
        </div>
        <div>
          <label><strong>Цена:</strong></label>
          {{ currentItem.price }}
        </div>
        <div>
          <label><strong>Количество:</strong></label>
          {{ currentItem.availability }}
        </div>

        <router-link
          v-if="showEditButton()"
          class="badge bg-blue"
          :to="`/itemDetails/${currentItem.id}`"
        >
          Изменить
        </router-link>
      </div>
      <div v-else>
        <br>
        <p>Выберите интересующий вас товар</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
