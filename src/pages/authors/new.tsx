import { saveAuthor, showAuthor } from '@Helpers/authors'
import { getResources } from '@Helpers/resources'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const defaultAuthorData = {
  name: "",
  lastName: "",
  email: "",
  affiliation: "",
  orcid: "",
  resources: []
}

const NewAuthor = (props) => {
  const [authorData, setAuthorData] = useState(defaultAuthorData)
  const [resources, setResources] = useState([])

  useEffect(()=>{
    getResources().then(resources=>{
      setResources(resources)
    })
  }, [])

  async function submit(e) {
    e.preventDefault();

    const response = await saveAuthor(authorData)

    setAuthorData(defaultAuthorData)
    Router.push('/authors')
  }

  function inputChange(e){
    const data = { ...authorData}
    data[e.target.name] = e.target.value

    setAuthorData(data)
  }

  function resourcesChange(e){
    const updatedOptions = [...e.target.options].filter(option => option.selected)
                                                .map(x => x.value);

    const data = {...authorData, resources: updatedOptions};

    setAuthorData(data)
  }

  return (
    <Template>
      <h3>Novo Autor</h3>

      <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="name">Nome</label>        
          <input type="text" className="form-control" id="name" name="name" value={authorData.name} onChange={inputChange}/>
        </div>
        
        <div className="mb-3">
          <label htmlFor="lastName">Sobrenome</label>        
          <input type="text" className="form-control" id="lastName" name="lastName" value={authorData.lastName} onChange={inputChange}/>
        </div>        

        <div className="mb-3">
          <label htmlFor="email">Email</label>        
          <input type="text" className="form-control" id="email" name="email" value={authorData.email} onChange={inputChange}/>
        </div>

       <div className="mb-3">
          <label htmlFor="affiliation">Afiliação</label>
          <textarea className="form-control" id="affiliation" name="affiliation" value={authorData.affiliation} onChange={inputChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="orcid">Orcid</label>
          <input type="text" className="form-control" id="orcid" name="orcid"  value={authorData.orcid} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="resources">Recursos</label>
          <select name="resources" size="3" className="form-select" id="resources" value={authorData.resources} onChange={resourcesChange} multiple>
          { resources.map((resource, i) => (<option key={i} value={resource._links.self.href}>{resource.title}</option>)) }
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar</button>
        <a href="/authors" className="btn btn-secondary ms-2">Voltar</a>
      </form>
    </Template>
  )
}

export default NewAuthor
