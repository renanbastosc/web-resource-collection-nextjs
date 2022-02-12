import { getResourcesByEventId } from '@Helpers/resources'
import axios from 'axios'
import { TConfig } from 'types/config'

const { apiUrl } = process.env.config as unknown as TConfig

export const getEvents = async (sort = '') => {
  const response = await axios.get(`${apiUrl}/events${sort}`)

  const data = response.data

  return data._embedded.events
}

export const showEvent = async (id) => {
  const response = await axios.get(`${apiUrl}/events/${id}`)

  const event = response.data;
  event.resources = await getResourcesByEventId(event.id);

  return event
}

export const saveEvent = async (eventObject) => {
  const response = await axios.post(`${apiUrl}/events`, eventObject)

  return response.data
}

export const updateEvent = async (id, eventObject) => {
  const response = await axios.patch(`${apiUrl}/events/${id}`, eventObject)

  return response.data
}

export const deleteEvent = async (id) => {
  const response = await axios.delete(`${apiUrl}/events/${id}`)

  return response.data
}
