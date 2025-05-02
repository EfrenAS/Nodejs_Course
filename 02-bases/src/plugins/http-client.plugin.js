// const httpClientPlugin = {
//   get: async (url) => {
//     const response = await fetch(url)
//     return await response.json()
//   },

//   post: async (url, body) => {},
//   put: async (url, body) => {},
//   delete: async (url) => {}
// }

const axios = require('axios')

const httpClientPlugin = {
  get: async (url) => {
    const response = await axios.get(url)
    return response.data
  },
  post: async (url, body) => {
    const response = await axios.post(url, body)
    return response.data
  },
  put: async (url, body) => {
    const response = await axios.put(url, body)
    return response.data
  },
  delete: async (url) => {
    const response = await axios.delete(url)
    return response.data
  },
}

module.exports = {
  httpClientPlugin,
}