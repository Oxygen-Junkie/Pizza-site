<script setup lang="ts">
import * as yup from 'yup'
import { useAuthStore } from '~/store/auth.module'
import { useFlagStore } from '~/store/flags.module'
import 'yup-phone'

const auth = useAuthStore()
const flags = useFlagStore()
const router = useRouter()

const loading = ref(false)
const message = ref('')
const successful = ref(false)
const currentUser = $ref(auth.getUser())

const schema = yup.object().shape({
  phone: yup.string().phone('RU', true, 'Номер телефона недействителен!'),
  email: yup.string().email('Электронная почта недействительна').max(50, 'Допустимо не больше 50 символов'),
  oldPassword: yup.string().required('Требуется пароль!'),
  password: yup.string(),
})

function updateReq(user: any) {
  loading.value = true

  auth.update(user).then(
    () => {
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

onMounted(() => {
  if (!currentUser) {
    router.push('/')
    flags.changePopUpSignIn()
  }
})
</script>

<template>
  <div class="container">
    <header class="jumbotron">
      <h3>
        <strong>{{ `${currentUser.phone.substring(0, 7)}....` }}</strong> Профиль
      </h3>
      <h4>
        Чтобы изменить данные введите текущий пароль
      </h4>
    </header>
    <Form :validation-schema="schema" @submit="updateReq">
      <div>
        <div class="form-group">
          <label for="phone">Новый номер телефона</label>
          <Field
            type="tel"
            class="form-control"
            name="phone"
          />
          <ErrorMessage name="phone" class="error-feedback" />
        </div>
        <div class="form-group">
          <p>Электронная почта</p>
          {{ currentUser.email }}
          <label for="email">Новая электронная почта</label>
          <Field
            type="email"
            class="form-control"
            name="email"
          />
          <ErrorMessage name="email" class="error-feedback" />
        </div>
        <div class="form-group">
          <label for="password">Новый пароль</label>
          <Field
            type="password"
            class="form-control"
            name="password"
          />
          <ErrorMessage name="password" class="error-feedback" />
        </div>
        <br>
        <br>
        <div class="form-group">
          <label for="oldPassword">Текущий пароль</label>
          <Field
            type="password"
            class="form-control"
            name="oldPassword"
          />
          <ErrorMessage name="oldPassword" class="error-feedback" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            />Обновить данные профиля
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
