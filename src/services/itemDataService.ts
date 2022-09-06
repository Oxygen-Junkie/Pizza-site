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

  get(id: any) {
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

  createCategory(data: any) {
    return axios.post(`${API_URL}category`, data, { headers: authHeader() })
  }

  getAllCategories() {
    return axios.get(`${API_URL}category`)
  }

  getByCategory(id: any) {
    return axios.get(`${API_URL}category/${id}`)
  }
}

export default new ItemDataService()

