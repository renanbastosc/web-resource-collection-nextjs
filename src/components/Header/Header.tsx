import React, { useRef, useState } from 'react'

import Logo from '/public/vercel.svg'
import IconMenu from '/public/images/profile.svg'

import { TConfig } from 'types/config'

const Header = () => {
  const [collapse, setCollapse] = useState(true)

  return (
    <>
      <nav className="navbar navbar-dark bg-dark navbar-expand-lg mb-5">
        <div className="container">
          <a className="navbar-brand" href="#">
            <Logo style={{zoom: .5}} className="d-inline-block align-text-top"/>
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav ">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/authors">Autores</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/courses">Cursos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/events">Eventos</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/resources">Recursos</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  )
}

export default Header
