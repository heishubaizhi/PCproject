import axios from 'axios'

export const request = (config) => {
  const https = axios.create({
    baseURL:'http://127.0.0.1:8888/api/private/v1/',
    timeout:9999
  })

  https.interceptors.request.use(config => {
    return config
  })

  https.interceptors.response.use(response => {
    return response.data
  })

  return https(config)




}