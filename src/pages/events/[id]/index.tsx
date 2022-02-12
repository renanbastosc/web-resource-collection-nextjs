import { showEvent } from '@Helpers/events'
import { useEffect, useState } from 'react'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const Resource = (props) => {
  const [event, setResource] = useState(null);
  const router = useRouter()
  const { id } = router.query
  
  useEffect(()=>{
    if(id){
      showEvent(id).then(event=>setResource(event))
    }
  }, [id])

  return (
    <Template>
      {event ? (
        <>
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>
            <b>Recursos:</b><br/>
            <ul>
              {event.resources.map(resource=><li key={resource.id}>{resource.title}</li>)}  
            </ul>
          </p>
          {event.image ? <p><img src={event.image} className="img-thumbnail" width="300"/></p> : null}

          <a href={`/events/${event.id}/edit`} className="btn btn-primary">
            Editar
          </a>
          <a href="/events" className="btn btn-secondary ms-2">Voltar</a>
        </>
      ) : (
        <p>Carregando...</p>
      ) }
    </Template>
  )
}

export default Resource
