import axios from 'axios'
import { TConfig } from 'types/config'

const { apiUrl } = process.env.config as unknown as TConfig

export const getCourses = async (sort = '') => {
  const response = await axios.get(`${apiUrl}/courses${sort}`)

  const data = response.data

  return data._embedded.courses
}

export const getResourcesByCourseId = async (eventId) => {
  const response = await axios.get(`${apiUrl}/courses/${eventId}/resources`)

  return response.data._embedded.resources;
}

export const showCourse = async (id) => {
  const response = await axios.get(`${apiUrl}/courses/${id}`)

  const event = response.data;
  event.resources = await getResourcesByCourseId(event.id);

  return event
}

export const saveCourse = async (courseObject) => {
  const response = await axios.post(`${apiUrl}/courses`, courseObject)

  return response.data
}

export const updateCourse = async (id, courseObject) => {
  const response = await axios.patch(`${apiUrl}/courses/${id}`, courseObject)

  return response.data
}

export const deleteCourse = async (id) => {
  const response = await axios.delete(`${apiUrl}/courses/${id}`)

  return response.data
}
