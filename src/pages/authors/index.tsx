import { getAuthors, deleteAuthor } from '@Helpers/authors'
import Swal from 'sweetalert2'
import Template from '@Templates/index'

const HomePage = ({ authors }) => {  
  const removeAuthor = async (id) => {
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
        await deleteAuthor(id)        
        Swal.fire(
          'Deletado!',
          'Seu autor foi deletado.',
          'success'
          )          
          location.reload();
      } 
      catch(e){
        Swal.fire(
          'Ops!',
          e.response.status == 409 ? 'Não foi possível excluir. Este autor possui uma associação.' : 'Erro ao remover.',
          'error'
        )
      }
    }
  }

  return (
    <Template>
      <div className="d-flex align-items-center mt-4 mb-4">
        <h2 className="h4 m-0">Autores</h2>
        <a href="authors/new" className="btn btn-primary ms-auto">
          Cadastrar
        </a>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nome completo</th>
            <th scope="col">Email</th>
            <th scope="col">Afiliação</th>
            <th scope="col" colSpan={3}></th>
          </tr>
        </thead>
        <tbody>
          {authors.map(author => (
            <tr key={author.id}>
              <th scope="row">{author.id}</th>
              <td>{author.name} {author.lastName}</td>
              <td>{author.email}</td>
              <td><small>{author.affiliation}</small></td>
              <td>
                <a href={`/authors/${author.id}`} className="btn btn-outline-primary btn-sm">
                  Visualizar
                </a>
              </td>
              <td>
                <a href={`/authors/${author.id}/edit`} className="btn btn-outline-primary btn-sm">
                  Editar
                </a>
              </td>
              <td>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={e => removeAuthor(author.id)}>
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
  const authors = await getAuthors()
  return { props: { authors } }
}

export default HomePage
