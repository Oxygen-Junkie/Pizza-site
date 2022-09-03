import { acceptHMRUpdate, defineStore } from 'pinia'

export const useFlagStore = defineStore('flag', () => {
  /**
   * Current name of the user.
   */
  const popUpSignIn = ref(false)
  const popUpSignUp = ref(false)
  const shade = ref(false)
  const render = ref(-1)

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
    shade.value = false
  }

  function rerender() {
    render.value++
  }

  return {
    changePopUpSignIn,
    changePopUpSignUp,
    closePopUps,
    rerender,
    popUpSignIn,
    popUpSignUp,
    shade,
    render,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useFlagStore, import.meta.hot))
