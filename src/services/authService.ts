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

  register(phone: string, email: string, password: string) {
    return axios.post(`${API_URL}signup`, {
      phone,
      email,
      password,
    })
  }
}

export default new AuthService()
