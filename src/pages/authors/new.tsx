import { saveResource, showResource } from '@Helpers/resources'
import { getAuthors } from '@Helpers/authors'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const defaultResourceData = {
  title: "",
  description: "",
  link: "",
  image: "",
  createdAt: "",
  registeredAt: "",
  keywords: "",
  authors: []
}

const NewResource = (props) => {
  const [resourceData, setResourceData] = useState(defaultResourceData)
  const [authors, setAuthors] = useState([])

  useEffect(()=>{
    getAuthors().then(authors=>{
      setAuthors(authors)
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

  function authorsChange(e){
    const updatedOptions = [...e.target.options].filter(option => option.selected)
                                                .map(x => x.value);

    const data = {...resourceData, authors: updatedOptions};

    setResourceData(data)
  }

  return (
    <Template>
      <h3>Novo Autor</h3>

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
          <label htmlFor="link">Link</label>
          <input type="url" className="form-control" id="link" name="link"  value={resourceData.link} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="image">Imagem</label>
          <input type="url" className="form-control" id="image" name="image"  value={resourceData.image} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="createdAt">Criado em</label>
          <input type="date" className="form-control" id="createdAt" name="createdAt"  value={resourceData.createdAt} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="registeredAt">Registrado em</label>
          <input type="date" className="form-control" id="registeredAt" name="registeredAt"  value={resourceData.registeredAt} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="keywords">Palavras-chaves</label>
          <input type="text" className="form-control" id="keywords" name="keywords" aria-describedby="keywordsHelp" value={resourceData.keywords} onChange={inputChange}/>
          <small id="keywordsHelp" className="form-text">Separado por vírgulas.</small>
        </div>

        <div className="mb-3">
          <label htmlFor="authors">Autores</label>
          <select name="authors" size="3" className="form-select" id="authors" value={resourceData.authors} onChange={authorsChange} multiple>
          { authors.map((author, i) => (<option key={i} value={author._links.self.href}>{author.name}</option>)) }
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar</button>
        <a href="/resources" className="btn btn-secondary ms-2">Voltar</a>
      </form>
    </Template>
  )
}

export default NewResource
