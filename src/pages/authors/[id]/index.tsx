import { showAuthor } from '@Helpers/authors'
import { useEffect, useState } from 'react'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const Resource = (props) => {
  const [author, setResource] = useState(null);
  const router = useRouter()
  const { id } = router.query
  
  useEffect(()=>{
    if(id){
      showAuthor(id).then(author=>setResource(author))
    }
  }, [id])

  return (
    <Template>
      {author ? (
        <>
          <h3>{author.name} {author.lastName}</h3>
          <p>{author.email}</p>
          <p>{author.affiliation}</p>
          <p>{author.orcid}</p>
          <p>
            <b>Recursos:</b><br/>
            <ul>
              {author.resources.map(resource=><li key={resource.id}>{resource.title}</li>)}  
            </ul>
          </p>
          {author.image ? <p><img src={author.image} className="img-thumbnail" width="300"/></p> : null}

          <a href={`/authors/${author.id}/edit`} className="btn btn-primary">
            Editar
          </a>
          <a href="/authors" className="btn btn-secondary ms-2">Voltar</a>
        </>
      ) : (
        <p>Carregando...</p>
      ) }
    </Template>
  )
}

export default Resource
