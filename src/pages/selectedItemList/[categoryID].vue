<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
import type Item from '~/types/Item'
const props = defineProps<{ categoryID: number }>()

const items: Ref<Item[]> = ref([])

function retrieveItems() {
  ItemDataService.getByCategory(props.categoryID)
    .then((response) => {
      items.value = response.data
      // console.log(items.value)
    })
    .catch((e) => {
      // console.log(e)
    })
}

retrieveItems()
</script>

<template>
  <div class="wrapper">
    <div class="photos">
      <image_palette
        v-for="item in items"
        :key="item.id"
        :item="item"
      />
    </div>
  </div>
</template>

<style scoped>
  .wrapper {
    height: 600 px;
    overflow-y: auto;
  }

  .photos {
    column-count: 3;
  }

@media screen and (min-width: 576px) {
  .photos {
    column-count: 4;
  }
}
</style>

