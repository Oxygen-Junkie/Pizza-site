<script setup lang="ts">
import ItemDataService from '~/services/itemDataService'
import type Category from '~/types/Category'
import { useFlagStore } from '~/store/flags.module'
const flags = useFlagStore()
const router = useRouter()

const categories = ref([])
const currentIndex = ref(-1)

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

function setActiveCategory(category: Category, index: number) {
  currentIndex.value = index
  router.push(`/selectedItemList/${category.id}`)
}

retrieveCategories()
</script>

<template>
  <div class="list row bg-blue">
    <h4>Товары в наличии</h4>
    <ul class="list-group">
      <li
        v-for="(category, index) in categories"
        :key="index"
        class="list-group-item"
        :class="{ active: index === currentIndex }"
        :disabled="flags.shade"
        @click="setActiveCategory(category, index)"
      >
        {{ category.name }}
      </li>
    </ul>
  </div>
</template>

    <style scoped>
    .list {
    }
    </style>

