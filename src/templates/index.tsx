import Header from '@Components/Header'
import Footer from '@Components/Footer'

const Template = ({children}) => {

  return (
    <>
      <Header />
        <div className="container">
          {children}
        </div>
      <Footer />
    </>
  )
}

export default Template
