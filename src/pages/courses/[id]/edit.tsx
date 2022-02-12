import { updateCourse, showCourse } from '@Helpers/courses'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import Template from '@Templates/index'
import { useRouter } from 'next/router';
import { getResources } from '@Helpers/resources';

const defaultCourseData = {
  title: "",
  description: "",
  image: "",
  registerAt: ""
}

const EditCourse = (props) => {
  const [courseData, setCourseData] = useState(null)
  const [resources, setResources] = useState([])

  const router = useRouter()
  const { id } = router.query
  
  useEffect(()=>{
    getResources().then(resources=>{
      setResources(resources)
    })
    
    if(id){
      showCourse(id).then(course=>setCourseData({
        ...course,
        resources: course.resources.map(k=>k._links.self.href) 
      }))
    }
  }, [id])

  async function submit(e) {
    e.preventDefault();

    await updateCourse(courseData.id, courseData)

    setCourseData(defaultCourseData)
    Router.push('/courses')
  }

  function inputChange(e){
    const data = { ...courseData}
    data[e.target.name] = e.target.value
    setCourseData(data)
  }

  function resourcesChange(e){
    const updatedOptions = [...e.target.options].filter(option => option.selected)
                                                .map(x => x.value);

    const data = {...courseData, resources: updatedOptions};
    setCourseData(data)
  }

  return (
    <Template>
      <h3>Editando curso</h3>

      { (courseData)?(
        <form onSubmit={submit}>
        <div className="mb-3">
          <label htmlFor="title">Título</label>        
          <input type="text" className="form-control" id="title" name="title" value={courseData.title} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="description">Descrição</label>
          <textarea className="form-control" id="description" name="description" value={courseData.description} onChange={inputChange}></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image">Imagem</label>
          <input type="url" className="form-control" id="image" name="image"  value={courseData.image} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="startAt">Registrado em</label>
          <input type="date" className="form-control" id="startAt" name="startAt"  value={courseData.startAt} onChange={inputChange} pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}"/>
        </div>

        <div className="mb-3">
          <label htmlFor="resources">Recursos</label>
          <select name="resources" size="3" className="form-select" id="resources" value={courseData.resources} onChange={resourcesChange} multiple>
          { resources.map((resource, i) => (<option key={i} value={resource._links.self.href}>{resource.title}</option>)) }
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Editar</button>
        <a href="/courses" className="btn btn-secondary ms-2">Voltar</a>
        </form>
      ):(
        <p>Carregando...</p>
      ) }
    </Template>
  )
}

export default EditCourse
