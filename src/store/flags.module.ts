import { acceptHMRUpdate, defineStore } from 'pinia'
import type Item from '~/types/Item'

export const useFlagStore = defineStore('flag', () => {
  /**
   * Current name of the user.
   */
  const popUpSignIn = ref(false)
  const popUpSignUp = ref(false)
  const popUpItem = ref(false)
  const shade = ref(false)
  const render = ref(-1)
  let item: Item | undefined

  function changePopUpSignIn() {
    popUpSignIn.value = !popUpSignIn.value
    shade.value = true
  }

  function changePopUpSignUp() {
    popUpSignIn.value = !popUpSignIn.value
    popUpSignUp.value = !popUpSignUp.value
  }

  function closePopUps() {
    popUpSignIn.value = false
    popUpSignUp.value = false
    popUpItem.value = false
    shade.value = false
    item = undefined
  }

  function changePopUpItem() {
    popUpItem.value = true
    shade.value = true
  }

  function rerender() {
    render.value++
  }

  function setItem(itemz: Item) {
    item = itemz
  }

  function getItem() {
    return item
  }

  return {
    changePopUpSignIn,
    changePopUpSignUp,
    closePopUps,
    rerender,
    changePopUpItem,
    setItem,
    getItem,
    popUpSignIn,
    popUpSignUp,
    shade,
    render,
    popUpItem,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFlagStore, import.meta.hot))
