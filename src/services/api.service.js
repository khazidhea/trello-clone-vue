import axios from 'axios'
import { API_URL } from '@/config'

const axiosHelper = async (method, resource, params) => {
  try {
    return await axios[method](`${resource}/`, params)
  } catch (error) {
    // Add ApiService signature, but keep response object from axios
    error.name = 'ApiService ' + error.name
    throw error
  }
}

const ApiService = {
  init () {
    axios.defaults.baseURL = API_URL
  },

  setAuthHeader (token) {
    axios.defaults.headers.common.Authorization = `Token ${token}`
  },

  async get (resource, params) {
    return axiosHelper('get', resource, params)
  },

  async post (resource, params) {
    return axiosHelper('post', resource, params)
  },

  async patch (resource, params) {
    return axiosHelper('patch', resource, params)
  },

  async delete (resource) {
    return axiosHelper('delete', resource)
  }
}

export default ApiService
