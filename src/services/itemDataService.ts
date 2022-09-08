import authHeader from './auth-header'
import fileHeader from './file-header'
import http from './http-common'
import axios from 'redaxios'

const API_URL = import.meta.env.VITE_url_tutorial

class ItemDataService {
  getAll() {
    return http.get(`${API_URL}`)
  }

  create(data: any, file: any) {
    const formData = new FormData()
	formData.append('file', file)
	formData.append('body', data)
    return axios.post(`${API_URL}`, formData, { headers: fileHeader() })
  }

  get(id: any) {
    return http.get(`${API_URL}${id}`)
  }

  update(id: any, data: any, file: any) {
    const formData = new FormData()
	formData.append('file', file)
	formData.append('body', data)
    return axios.post(`${API_URL}${id}`, formData, { headers: fileHeader() })
  }

  delete(id: any) {
    return http.delete(`${API_URL}${id}`, { headers: authHeader() })
  }

  findByTitle(title: string) {
    return http.get(`${API_URL}?title=${title}`)
  }

  createCategory(data: any) {
    return http.post(`${API_URL}category`, data, { headers: authHeader() })
  }

  getAllCategories() {
    return http.get(`${API_URL}category`)
  }

  getByCategory(id: any) {
    return http.get(`${API_URL}category/${id}`)
  }
}

export default new ItemDataService()

