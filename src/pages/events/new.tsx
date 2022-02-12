import { saveEvent, showEvent } from '@Helpers/events'
import { getResources } from '@Helpers/resources'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const defaultEventData = {
  title: "",
  description: "",
  image: "",
  startAt: "",
  endAt: "",
  resources: []
}

const NewEvent = (props) => {
  const [eventData, setEventData] = useState(defaultEventData)
  const [resources, setResources] = useState([])

  useEffect(()=>{
    getResources().then(resources=>{
      setResources(resources)
    })
  }, [])

  async function submit(e) {
    e.preventDefault();

    const response = await saveEvent(eventData)

    setEventData(defaultEventData)
    Router.push('/events')
  }

  function inputChange(e){
    const data = { ...eventData}
    data[e.target.name] = e.target.value

    setEventData(data)
  }

  function resourcesChange(e){
    const updatedOptions = [...e.target.options].filter(option => option.selected)
                                                .map(x => x.value);

    const data = {...eventData, resources: updatedOptions};

    setEventData(data)
  }

  return (
    <Template>
      <h3>Novo Evento</h3>

      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title">Título</label>        
          <input type="text" className="form-control" id="title" name="title" value={eventData.title} onChange={inputChange}/>
        </div>

       <div className="mb-3">
          <label htmlFor="description">Descrição</label>
          <textarea className="form-control" id="description" name="description" value={eventData.description} onChange={inputChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image">Imagem</label>
          <input type="url" className="form-control" id="image" name="image"  value={eventData.image} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="startAt">Começa em</label>
          <input type="date" className="form-control" id="startAt" name="startAt"  value={eventData.startAt} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="endAt">Termina em</label>
          <input type="date" className="form-control" id="endAt" name="endAt"  value={eventData.endAt} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="resources">Recursos</label>
          <select name="resources" size="3" className="form-select" id="resources" value={eventData.resources} onChange={resourcesChange} multiple>
          { resources.map((resource, i) => (<option key={i} value={resource._links.self.href}>{resource.title}</option>)) }
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar</button>
        <a href="/events" className="btn btn-secondary ms-2">Voltar</a>
      </form>
    </Template>
  )
}

export default NewEvent

