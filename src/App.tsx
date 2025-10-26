import './assets/css/main.css'
import './assets/css/monigote.css'
import { Outlet } from 'react-router-dom'
import { Header } from './views/app/Header'
import { Footer } from './views/app/Footer'

function App() {


  return (
    <div className='dpF fdC v100vw h100vh'>
      <Header />
      <div className='h100pc w100pc'>
        <Outlet />

      </div>
      <Footer />
    </div>
  )
}

export default App
