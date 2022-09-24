import { acceptHMRUpdate, defineStore } from 'pinia'
import Item from '~/types/Item'

export const useFlagStore = defineStore('flag', () => {
  /**
   * Current name of the user.
   */
  const popUpItem = ref(false)
  const shade = ref(false)
  const render = ref(-1)
  let item: Item
  
  function closePopUps() {
    popUpItem.value = false
    shade.value = false
  }

  function changePopUpItem() {
    popUpItem.value = true
    shade.value = true
  }

  function setItem(itemz: Item) {
    item = itemz
  }

  function getItem() {
    return item
  }

  return {
    closePopUps,
    changePopUpItem,
    shade,
    render,
    popUpItem,
    setItem,
    getItem,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFlagStore, import.meta.hot))
