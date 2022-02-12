import { showResource } from '@Helpers/resources'
import { useEffect, useState } from 'react'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const Resource = (props) => {
  const [resource, setResource] = useState(null);
  const router = useRouter()
  const { id } = router.query
  
  useEffect(()=>{
    if(id){
      showResource(id).then(resource=>setResource(resource))
    }
  }, [id])

  

  return (
    <Template>
      {resource ? (
        <>
          <h3>{resource.title}</h3>
          <p>{resource.description}</p>
          <p><a href={resource.link}>{resource.link}</a></p>
          <p>
            <b>Palavras-chaves:</b><br/>
            <ul>
              {resource.keywords.map((keyword, i)=><li key={i}>{keyword}</li>)}  
            </ul>
          </p>
          <p>
            <b>Autores:</b><br/>
            <ul>
              {resource.authors.map(author=><li key={author.id}>{author.name} {author.lastName}</li>)}  
            </ul>
          </p>
          {resource.image ? <p><img src={resource.image} className="img-thumbnail" width="300"/></p> : null}

          <a href={`/resources/${resource.id}/edit`} className="btn btn-primary">
            Editar
          </a>
          <a href="/resources" className="btn btn-secondary ms-2">Voltar</a>
        </>
      ) : (
        <p>Carregando...</p>
      ) }
    </Template>
  )
}

export default Resource
