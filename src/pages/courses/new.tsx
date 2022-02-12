import { saveCourse, showCourse } from '@Helpers/courses'
import { getResources } from '@Helpers/resources'
import { useEffect, useState } from 'react'
import Router from 'next/router'

import Template from '@Templates/index'
import { useRouter } from 'next/router';

const defaultCourseData = {
  title: "",
  description: "",
  image: "",
  registeredAt: "",
  resources: []
}

const NewCourse = (props) => {
  const [courseData, setCourseData] = useState(defaultCourseData)
  const [resources, setResources] = useState([])

  useEffect(()=>{
    getResources().then(resources=>{
      setResources(resources)
    })
  }, [])

  async function submit(e) {
    e.preventDefault();

    const response = await saveCourse(courseData)

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
      <h3>Novo Curso</h3>

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
          <label htmlFor="registeredAt">Registrado em</label>
          <input type="date" className="form-control" id="registeredAt" name="registeredAt"  value={courseData.registerAt} onChange={inputChange}/>
        </div>

        <div className="mb-3">
          <label htmlFor="resources">Recursos</label>
          <select name="resources" size="3" className="form-select" id="resources" value={courseData.resources} onChange={resourcesChange} multiple>
          { resources.map((resource, i) => (<option key={i} value={resource._links.self.href}>{resource.title}</option>)) }
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Cadastrar</button>
        <a href="/courses" className="btn btn-secondary ms-2">Voltar</a>
      </form>
    </Template>
  )
}

export default NewCourse
