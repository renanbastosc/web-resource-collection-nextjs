import { getAuthorsByResourceId } from '@Helpers/authors'
import axios from 'axios'
import { TConfig } from 'types/config'

const { apiUrl } = process.env.config as unknown as TConfig

export const getResourcesByEventId = async (eventId) => {
  const response = await axios.get(`${apiUrl}/events/${eventId}/resources`)

  return response.data._embedded.resources;
}

export const getResources = async (sort = '') => {
  const response = await axios.get(`${apiUrl}/resources${sort}`)

  const data = response.data

  return data._embedded.resources
}

export const showResource = async (id) => {
  const response = await axios.get(`${apiUrl}/resources/${id}`)
  
  const resource = response.data;
  resource.authors = await getAuthorsByResourceId(resource.id);

  return resource
}

export const saveResource = async (resourceObject) => {
  const object = { ...resourceObject, keywords: resourceObject.keywords.split(',').map(k=>k.trim()).filter(k=>k != "") }
  
  const response = await axios.post(`${apiUrl}/resources`, object)

  return response.data
}

export const updateResource = async (id, resourceObject) => {
  const object = { ...resourceObject, keywords: resourceObject.keywords.split(',').map(k=>k.trim()).filter(k=>k != "") }
  
  const response = await axios.patch(`${apiUrl}/resources/${id}`, object)

  return response.data
}

export const deleteResource = async (id) => {
  const response = await axios.delete(`${apiUrl}/resources/${id}`)

  return response.data
}
