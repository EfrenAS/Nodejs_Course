// const httpClientPlugin = {
//   get: async (url) => {
//     const response = await fetch(url)
//     return await response.json()
//   },

//   post: async (url, body) => {},
//   put: async (url, body) => {},
//   delete: async (url) => {}
// }

import axios from 'axios'

export const httpClientPlugin = {
  get: async (url: string) => {
    const response = await axios.get(url)
    return response.data
  },

  post: async (url: string, body: any) => {
    throw new Error('Method not implemented yet')
  },

  put: async (url: string, body: any) => {
    throw new Error('Method not implemented yet')
  },

  delete: async (url: string) => {
    throw new Error('Method not implemented yet')
  }
}
