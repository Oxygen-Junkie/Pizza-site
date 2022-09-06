<script setup lang="ts">
import { ErrorMessage, Field, Form } from 'vee-validate'
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth.module'
import { useFlagStore } from '~/store/flags.module'

const Auth = useAuthStore()
const flags = useFlagStore()
const router = useRouter()

const loading = ref(false)
const successful = ref(false)
const message = ref('')
const isLoggedIn = $ref(Auth.isLoggedIn())

const schema = yup.object().shape({
  phone: yup.string().required('Требуется номер телефона!').phone('RU', true, 'Номер телефона недействителен!'),
  password: yup.string().required('Требуется пароль!').min(6, 'Пароль должен быть минимум в 6 символов').max(40, 'Пароль должен быть максимум в 40 символов'),
})

onMounted(() => {
  if (isLoggedIn) {
    router.push('/profile')
    alert('Как ты сюда попал?')
    flags.closePopUps()
  }
})

function handleRegister(user: any) {
  loading.value = true
  successful.value = true
  message.value = ''

  if (user.phone && user.password && user.email) {
    Auth.register(user).then(
      (data: { message: string }) => {
        message.value = data.message
        successful.value = true
        loading.value = false
        flags.closePopUps()
      },
      (error: { response: { data: { message: any } }; message: any; toString: () => any }) => {
        loading.value = false
        message.value
                = (error.response
                  && error.response.data
                  && error.response.data.message)
                || error.message || error.toString()
        successful.value = false
      },
    )
  }
}
</script>

<template>
  <div class="card card-container">
    <div class="text-right">
      <button type="button" class="btn-close text-right" @click.prevent="flags.closePopUps" />
    </div>
    <img
      id="profile-img"
      src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      class="profile-img-card"
    >
    <Form :validation-schema="schema" @submit="handleRegister">
      <div v-if="!successful">
        <div class="form-group">
          <label for="phone">Номер телефона</label>
          <Field
            type="tel"
            class="form-control"
            name="phone"
          />
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Пароль</label>
          <Field
            type="password"
            class="form-control"
            name="password"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>

        <div class="form-group">
          <button class="btn btn-primary btn-block bg-blue" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            />Зарегестрироваться
          </button>
        </div>
      </div>
    </Form>

    <div
      v-if="message"
      class="alert"
      :class="successful ? 'alert-success' : 'alert-danger'"
    >
      {{ message }}
    </div>
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
    .btn-close {
      right: 0;
    }
    </style>

