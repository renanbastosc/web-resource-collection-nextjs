import { getEvents, deleteEvent } from '@Helpers/events'
import Swal from 'sweetalert2'
import Template from '@Templates/index'

const HomePage = ({ events }) => {  
  const removeEvent = async (id) => {
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
        await deleteEvent(id)        
        Swal.fire(
          'Deletado!',
          'Seu evento foi deletado.',
          'success'
          )          
          location.reload();
      } 
      catch(e){
        Swal.fire(
          'Ops!',
          e.response.status == 409 ? 'Conflito. Evento associado.' : 'Erro ao remover.',
          'error'
        )
      }
    }
  }

  return (
    <Template>
      <div className="d-flex align-items-center mt-4 mb-4">
        <h2 className="h4 m-0">Eventos</h2>
        <a href="events/new" className="btn btn-primary ms-auto">
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
          {events.map(event => (
            <tr key={event.id}>
              <th scope="row">{event.id}</th>
              <td>{event.title}</td>
              <td><small>{event.description}</small></td>
              <td>
                <a href={`/events/${event.id}`} className="btn btn-outline-primary btn-sm">
                  Visualizar
                </a>
              </td>
              <td>
                <a href={`/events/${event.id}/edit`} className="btn btn-outline-primary btn-sm">
                  Editar
                </a>
              </td>
              <td>
                <button type="button" className="btn btn-outline-danger btn-sm" onClick={e => removeEvent(event.id)}>
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
  const events = await getEvents()
  return { props: { events } }
}

export default HomePage
