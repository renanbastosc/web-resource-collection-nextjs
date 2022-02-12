import { getResources, deleteResource } from '@Helpers/resources'
import Swal from 'sweetalert2'
import Template from '@Templates/index'

const Resources = ({ resources }) => {  
  const removeResource = async (id) => {
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
        await deleteResource(id)        
        Swal.fire(
          'Deletado!',
          'Seu recurso foi deletado.',
          'success'
          )          
          location.reload();
      } 
      catch(e){
        Swal.fire(
          'Ops!',
          e.response.status == 409 ? 'Conflito. Este recurso está associado a um curso.' : 'Erro ao remover.',
          'error'
        )
      }
    }
  }

  return (
    <Template>
      <div className="d-flex align-items-center mt-4 mb-4">
        <h2 className="h4 m-0">Recursos</h2>
        <a href="resources/new" className="btn btn-primary ms-auto">
          Cadastrar
        </a>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Título</th>
            <th scope="col">Descrição</th>
            <th scope="col">Palavras-chaves</th>
            <th scope="col" colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {resources.map(resource => (
            <tr key={resource.id}>
              <th scope="row">{resource.id}</th>
              <td>{resource.title}</td>
              <td><small>{resource.description}</small></td>
              <td>{resource.keywords.map(keyword=><span key={keyword} className="badge bg-secondary">{keyword}</span>)}</td>
              <td>
                <a href={`/resources/${resource.id}`} className="btn btn-outline-primary btn-sm">
                  Visualizar
                </a>
              </td>
              <td>
                <a href={`/resources/${resource.id}/edit`} className="btn btn-outline-primary btn-sm">
                  Editar
                </a>
              </td>
              <td>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={e => removeResource(resource.id)}>
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
  const resources = await getResources()
  return { props: { resources } }
}

export default Resources
