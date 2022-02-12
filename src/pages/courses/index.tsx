import { getCourses, deleteCourse } from '@Helpers/courses'
import Swal from 'sweetalert2'
import Template from '@Templates/index'

const HomePage = ({ courses }) => {  
  const removeCourse = async (id) => {
    const result = await Swal.fire({
      title: 'Você tem certeza?',
      text: "Esta ação não pode ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim delete!'
    })    
    
    if (result.isConfirmed) {
      try {
        await deleteCourse(id)        
        Swal.fire(
          'Deletado!',
          'Seu curso foi deletado.',
          'success'
          )          
          location.reload();
      } 
      catch(e){
        Swal.fire(
          'Ops!',
          e.response.status == 409 ? 'Não foi possível excluir. Este curso possui uma associação.' : 'Erro ao remover.',
          'error'
        )
      }
    }
  }

  return (
    <Template>
      <div className="d-flex align-items-center mt-4 mb-4">
        <h2 className="h4 m-0">Cursos</h2>
        <a href="courses/new" className="btn btn-primary ms-auto">
          Cadastrar
        </a>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col" colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.id}>
              <th scope="row">{course.id}</th>
              <td>{course.title}</td>
              <td><small>{course.description}</small></td>
              <td>
                <a href={`/courses/${course.id}`} className="btn btn-outline-primary btn-sm">
                  Visualizar
                </a>
              </td>
              <td>
                <a href={`/courses/${course.id}/edit`} className="btn btn-outline-primary btn-sm">
                  Editar
                </a>
              </td>
              <td>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={e => removeCourse(course.id)}>
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Template>
  )
}

export async function getServerSideProps() {
  const courses = await getCourses()
  return { props: { courses } }
}

export default HomePage
