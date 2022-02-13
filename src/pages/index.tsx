import { getCourses } from '@Helpers/courses'
import { getEvents } from '@Helpers/events'
import { getResources } from '@Helpers/resources'
import { useEffect, useState } from 'react'

import Template from '@Templates/index'

const HomePage = ({ events, courses, resources }) => {
  return (
    <Template>
      <h2 className="h4 mt-4">Recursos recentes</h2>
      <div className="list-group">
        {resources.map((resource) => (
          <a
            href={`resources/${resource.id}`}
            key={resource.id}
            className="list-group-item list-group-item-action"
          >
            {resource.title}
          </a>
        ))}
      </div>

      <h2 className="h4 mt-4">Eventos recentes</h2>
      <div className="list-group">
        {events.map((event) => (
          <a
            href="#"
            key={event.id}
            className="list-group-item list-group-item-action"
          >
            {event.title}
          </a>
        ))}
      </div>

      <h2 className="h4 mt-4">Cursos recentes</h2>
      <div className="list-group">
        {courses.map((course) => (
          <a
            href="#"
            key={course.id}
            className="list-group-item list-group-item-action"
          >
            {course.title}
          </a>
        ))}
      </div>
    </Template>
  )
}

export async function getServerSideProps() {
  const courses = await getCourses('?size=3&sort=registerAt,desc')
  const resources = await getResources('?size=3&sort=registeredAt,desc')
  const events = await getEvents('?size=3&sort=startAt,desc')

  return { props: { events, courses, resources } }
}

export default HomePage
