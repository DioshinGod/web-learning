import ReactDOM from "react-dom/client"
import App from './App.tsx'
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { PlaraxView } from "./views/plarax/PlaraxView.tsx"


const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path:'/plarax',
        element: <PlaraxView/>
      },
      {
        path:'/juego1',
        element: <div>Este es mi juego1</div>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
