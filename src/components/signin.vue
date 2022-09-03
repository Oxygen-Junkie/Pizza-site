<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth.module'
import 'yup-phone'
import { useFlagStore } from '~/store/flags.module'

const auth = useAuthStore()
const flags = useFlagStore()
const router = useRouter()

const loading = ref(false)
const message = ref('')
const schema = yup.object().shape({
  phone: yup.string().required('Требуется номер телефона!').phone('RU', true, 'Номер телефона недействителен!'),
  password: yup.string().required('Требуется пароль!'),
})
const isLoggedIn = $ref(auth.isLoggedIn())

onMounted(() => {
  if (isLoggedIn) {
    router.push('/profile')
    flags.closePopUps()
  }
})

function handleLogin(user: any) {
  loading.value = true

  if (user.phone && user.password) {
    auth.login(user).then(
      () => {
        router.push('/profile')
        flags.closePopUps()
        flags.rerender()
      },
      (error: { response: { data: { message: any } }; message: any; toString: () => any }) => {
        loading.value = false
        message.value
                = (error.response
                  && error.response.data
                  && error.response.data.message)
                || error.message || error.toString()
      },
    )
  }
}

function registerInstead() {
  flags.changePopUpSignUp()
}
</script>

<template>
  <div class="card card-container">
    <img
      id="profile-img"
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      class="profile-img-card"
    >
    <Form :validation-schema="schema" @submit="handleLogin">
      <div class="form-group">
        <label for="phone">Номер телефона</label>
        <Field
          name="phone"
          type="tel"
          class="form-control"
        />
        <ErrorMessage name="phone" class="error-feedback" />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <Field
          name="password"
          type="password"
          class="form-control"
        />
        <ErrorMessage name="password" class="error-feedback" />
      </div>

      <div class="form-group">
        <button class="btn" @click.prevent="registerInstead">
          <span>Зарегистрироваться</span>
        </button>
      </div>

      <div class="form-group">
        <button class="btn btn-primary btn-block" :disabled="loading">
          <span
            v-show="loading"
            class="spinner-border spinner-border-sm"
          />
          <span>Войти</span>
        </button>
      </div>

      <div class="form-group">
        <div v-if="message" class="alert alert-danger" role="alert">
          {{ message }}
        </div>
      </div>
    </Form>
  </div>
</template>

    <style scoped>
    label {
      display: block;
      margin-top: 10px;
    }

    .card-container.card {
      max-width: 350px !important;
      padding: 40px 40px;
    }

    .card {
      background-color: #f7f7f7;
      padding: 20px 25px 30px;
      -moz-border-radius: 2px;
      -webkit-border-radius: 2px;
      border-radius: 2px;
      -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
      position:fixed;
      top: 50%;
      left: 50%;
      margin-left:-250px;
      margin-top:-200px;
    }

    .profile-img-card {
      width: 96px;
      height: 96px;
      margin: 0 auto 10px;
      display: block;
      -moz-border-radius: 50%;
      -webkit-border-radius: 50%;
      border-radius: 50%;
    }
    </style>

