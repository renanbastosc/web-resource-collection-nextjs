import { updateAuthor, showAuthor } from '@Helpers/authors'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import Template from '@Templates/index'
import { useRouter } from 'next/router';
import { getResources } from '@Helpers/resources';

const defaultAuthorData = {
  name: "",
  lastName: "",
  email: "",
  affiliation: "",
  orcid: "",
  resources: []
}

const EditAuthor = (props) => {
  const [authorData, setAuthorData] = useState(null)
  const [resources, setResources] = useState([])

  const router = useRouter()
  const { id } = router.query
  
  useEffect(()=>{
    getResources().then(resources=>{
      setResources(resources)
    })
    
    if(id){
      showAuthor(id).then(author=>setAuthorData({
        ...author,
        resources: author.resources.map(k=>k._links.self.href) 
      }))
    }
  }, [id])

  async function submit(e) {
    e.preventDefault();

    await updateAuthor(authorData.id, authorData)

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
      <h3>Editando autor</h3>

      { (authorData)?(
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
          <input type="text" className="form-control" id="orcid" name="orcid" value={authorData.orcid} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="resources">Recursos</label>
          <select name="resources" size="3" className="form-select" id="resources" value={authorData.resources} onChange={resourcesChange} multiple>
          { resources.map((resource, i) => (<option key={i} value={resource._links.self.href}>{resource.name}</option>)) }
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Editar</button>
        <a href="/authors" className="btn btn-secondary ms-2">Voltar</a>
        </form>
      ):(
        <p>Carregando...</p>
      ) }
    </Template>
  )
}

export default EditAuthor
