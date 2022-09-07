<script setup lang="ts">
import type { Ref } from 'vue'
import ItemDataService from '~/services/itemDataService'
const props = defineProps<{ categoryID: number }>()

const items: Ref<any> = ref([])

function retrieveItems() {
  items.value = ItemDataService.getByCategory(props.categoryID)
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

