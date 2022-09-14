import { acceptHMRUpdate, defineStore } from 'pinia'
import type Item from '~/types/Item'
import itemDataService from '~/services/itemDataService'

export const useItemsStore = defineStore('items', () => {
  /**
   * Current name of the user.
   */
  const categories = new Set()
  let title = ''
  let items: Item[] = []

  function addCategory(id: any) {
    categories.add(id)
  }

  function removeCategory(id: any) {
    categories.delete(id)
  }

  function titleIndex(titlez: string) {
    title = titlez
  }

  function refreshItems() {
    itemDataService.getAll(categories, title)
      .then((response) => {
        items = response.data
      })
  }

  function unattachConditions() {
    itemDataService.getAll(null, null)
      .then((response) => {
        items = response.data
      })
  }

  return {
    addCategory,
    removeCategory,
    titleIndex,
    items,
    refreshItems,
    unattachConditions,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useItemsStore, import.meta.hot))
