<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import type Category from '~/types/Category'
import { useFlagStore } from '~/store/flags.module'
const flags = useFlagStore()
const router = useRouter()

const categories: Ref<Category[]> = ref([])
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
  <div class="list bg-blue">
    <p>Категории</p>
    <ul class="list-group">
      <li
        v-for="(category, index) in categories"
        :key="index"
        class="list-group-item bg-lavender"
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
  .list-group-item {
    padding: 2px;
  }
</style>

