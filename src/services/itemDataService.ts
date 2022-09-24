import axios from 'redaxios'
import http from './http-common'

const API_URL = import.meta.env.VITE_url_item
const BASE_URL = import.meta.env.VITE_base_api

class ItemDataService {
  getAll() {
    return http.get(`${API_URL}`)
  }

  create(data: any) {
    return axios.post(`${BASE_URL}/${API_URL}`, data)
  }

  get(id: any) {
    return http.get(`${API_URL}${id}`)
  }
}
export default new ItemDataService()

