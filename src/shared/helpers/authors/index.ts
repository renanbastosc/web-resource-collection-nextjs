import axios from 'axios'
import { TConfig } from 'types/config'

const { apiUrl } = process.env.config as unknown as TConfig

export const getAuthorsByResourceId = async (resourceId) => {
  const response = await axios.get(`${apiUrl}/resources/${resourceId}/authors`)

  return response.data._embedded.authors;
}

export const getResourcesByAuthorId = async (eventId) => {
  const response = await axios.get(`${apiUrl}/authors/${eventId}/resources`)

  return response.data._embedded.resources;
}

export const getAuthors = async (sort = '') => {
  const response = await axios.get(`${apiUrl}/authors${sort}`)

  const data = response.data

  return data._embedded.authors
}

// export const showAuthor = async (id) => {
//   const response = await axios.get(`${apiUrl}/authors/${id}`)

//   return response.data
// }

export const showAuthor = async (id) => {
  const response = await axios.get(`${apiUrl}/authors/${id}`)

  const event = response.data;
  event.resources = await getResourcesByAuthorId(event.id);

  return event
}

export const saveAuthor = async (authorObject) => {
  const response = await axios.post(`${apiUrl}/authors`, authorObject)

  return response.data
}

export const updateAuthor = async (id, authorObject) => {
  const response = await axios.patch(`${apiUrl}/authors/${id}`, authorObject)

  return response.data
}

export const deleteAuthor = async (id) => {
  const response = await axios.delete(`${apiUrl}/authors/${id}`)

  return response.data
}
