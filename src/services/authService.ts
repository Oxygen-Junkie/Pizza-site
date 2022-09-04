import axios from 'redaxios'
const API_URL = import.meta.env.VITE_url_authentication

class AuthService {
  login(phone: string, password: string) {
    return axios
      .post(`${API_URL}signin`, {
        phone,
        password,
      })
      .then((response) => {
        if (response.data.accessToken)
          localStorage.setItem('user', JSON.stringify(response.data))

        return response.data
      })
  }

  logout() {
    localStorage.removeItem('user')
  }

  register(phone: string, password: string) {
    return axios.post(`${API_URL}signup`, {
      phone,
      password,
    }).then((response) => {
      if (response.data.accessToken)
        localStorage.setItem('user', JSON.stringify(response.data))

      return response.data
    })
  }

  update(oldPhone: string, phone: string, email: string, oldPassword: string, password: string) {
    return axios.put(`${API_URL}update`, {
      oldPhone,
      phone,
      email,
      password,
      oldPassword,
    }).then((response) => {
      if (response.data.accessToken)
        localStorage.setItem('user', JSON.stringify(response.data))

      return response.data
    })
  }
}

export default new AuthService()
