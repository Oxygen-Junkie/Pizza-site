<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'
const props = defineProps<{ title: string }>()

const items: Ref<Item[]> = ref([])

function retrieveItems() {
  ItemDataService.findByTitle(props.title)
    .then((response) => {
      items.value = response.data
      // console.log(response.data)
    })
    .catch((e) => {
      // console.log(e)
    })
}

retrieveItems()
</script>

<template>
  <div class="photos">
    <item_palette
      v-for="item in items"
      :key="item.id"
      :item="item"
    />
  </div>
</template>

    <style scoped>
      .photos {
        column-count: auto;
        column-width: 14rem;
      }
    </style>

