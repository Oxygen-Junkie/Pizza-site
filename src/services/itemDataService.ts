import axios from 'redaxios'
import authHeader from './auth-header'
import fileHeader from './file-header'
import http from './http-common'

const API_URL = import.meta.env.VITE_url_item
const BASE_URL = import.meta.env.VITE_base_api
const CATEG_API_URL = import.meta.env.VITE_url_category

class ItemDataService {
  getAll() {
    return http.get(`${API_URL}`)
  }

  create(data: any) {
    return axios.post(`${BASE_URL}/${API_URL}`, data, { headers: fileHeader() })
  }

  get(id: any) {
    return http.get(`${API_URL}${id}`)
  }

  update(id: any, data: any) {
    return axios.post(`${BASE_URL}/${CATEG_API_URL}${id}`, data, { headers: fileHeader() })
  }

  delete(id: any) {
    return http.delete(`${API_URL}${id}`, { headers: authHeader() })
  }

  findByTitle(title: string) {
    return http.get(`${API_URL}?title=${title}`)
  }

  createCategory(data: any) {
    return http.post(`${CATEG_API_URL}`, data, { headers: authHeader() })
  }

  getAllCategories() {
    return http.get(`${CATEG_API_URL}`)
  }

  getByCategory(id: any) {
    return http.get(`${CATEG_API_URL}${id}`)
  }
}

export default new ItemDataService()

