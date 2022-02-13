import { showCourse } from '@Helpers/courses'
import { useEffect, useState } from 'react'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const Resource = (props) => {
  const [course, setResource] = useState(null);
  const router = useRouter()
  const { id } = router.query
  
  useEffect(()=>{
    if(id){
      showCourse(id).then(course=>setResource(course))
    }
  }, [id])

  return (
    <Template>
      {course ? (
        <>
          <h3>{course.title}</h3>
          <p>{course.description}</p>
          <p>Registrado em {course.registerAt}</p>
          <p>
            <b>Recursos:</b><br/>
            <ul>
              {course.resources.map(resource=><li key={resource.id}>{resource.title}</li>)}  
            </ul>
          </p>
          {course.image ? <p><img src={course.image} className="img-thumbnail" width="300"/></p> : null}

          <a href={`/courses/${course.id}/edit`} className="btn btn-primary">
            Editar
          </a>
          <a href="/courses" className="btn btn-secondary ms-2">Voltar</a>
        </>
      ) : (
        <p>Carregando...</p>
      ) }
    </Template>
  )
}

export default Resource
