import axios from 'redaxios'
import authHeader from './auth-header'

const API_URL = import.meta.env.VITE_url_content

class UserService {
  getPublicContent() {
    return axios.get(`${API_URL}all`)
  }

  getUserBoard() {
    return axios.get(`${API_URL}user`, { headers: authHeader() })
  }

  getModeratorBoard() {
    return axios.get(`${API_URL}mod`, { headers: authHeader() })
  }

  getAdminBoard() {
    return axios.get(`${API_URL}admin`, { headers: authHeader() })
  }
}

export default new UserService()
