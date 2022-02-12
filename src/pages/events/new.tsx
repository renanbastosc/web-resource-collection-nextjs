import { saveResource, showResource } from '@Helpers/resources'
import { getResources } from '@Helpers/resources'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const defaultResourceData = {
  title: "",
  description: "",
  image: "",
  startAt: "",
  endAt: "",
  resources: []
}

const NewResource = (props) => {
  const [resourceData, setResourceData] = useState(defaultResourceData)
  const [resources, setResources] = useState([])

  useEffect(()=>{
    getResources().then(resources=>{
      setResources(resources)
    })
  }, [])

  async function submit(e) {
    e.preventDefault();

    const response = await saveResource(resourceData)

    setResourceData(defaultResourceData)
    Router.push('/resources')
  }

  function inputChange(e){
    const data = { ...resourceData}
    data[e.target.name] = e.target.value

    setResourceData(data)
  }

  function resourcesChange(e){
    const updatedOptions = [...e.target.options].filter(option => option.selected)
                                                .map(x => x.value);

    const data = {...resourceData, resources: updatedOptions};

    setResourceData(data)
  }

  return (
    <Template>
      <h3>Novo Evento</h3>

      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title">Título</label>        
          <input type="text" className="form-control" id="title" name="title" value={resourceData.title} onChange={inputChange}/>
        </div>

       <div className="mb-3">
          <label htmlFor="description">Descrição</label>
          <textarea className="form-control" id="description" name="description" value={resourceData.description} onChange={inputChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image">Imagem</label>
          <input type="url" className="form-control" id="image" name="image"  value={resourceData.image} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="createdAt">Inicia em</label>
          <input type="date" className="form-control" id="createdAt" name="createdAt"  value={resourceData.createdAt} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="registeredAt">Termina em</label>
          <input type="date" className="form-control" id="registeredAt" name="registeredAt"  value={resourceData.registeredAt} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="resources">Recursos</label>
          <select name="resources" size="3" className="form-select" id="resources" value={resourceData.resources} onChange={resourcesChange} multiple>
          { resources.map((resource, i) => (<option key={i} value={resource._links.self.href}>{resource.title}</option>)) }
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar</button>
        <a href="/resources" className="btn btn-secondary ms-2">Voltar</a>
      </form>
    </Template>
  )
}

export default NewResource
