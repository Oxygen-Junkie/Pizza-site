import axios from 'redaxios'
import authHeader from './auth-header'

const API_URL = import.meta.env.VITE_url_tutorial

class ItemDataService {
  getAll() {
    return axios.get(`${API_URL}`)
  }

  create(data: any) {
    return axios.post(`${API_URL}`, data, { headers: authHeader() })
  }

  get(id: string) {
    return axios.get(`${API_URL}${id}`)
  }

  update(id: any, data: any) {
    return axios.put(`${API_URL}${id}`, data)
  }

  delete(id: any) {
    return axios.delete(`${API_URL}${id}`)
  }

  findByTitle(title: string) {
    return axios.get(`${API_URL}?title=${title}`)
  }
}

export default new ItemDataService()

