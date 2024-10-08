import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { Layout } from './components/Layout'
import { CreatePage } from './pages/CreatePage/CreatePage'
import { MainPage } from './pages/MainPage/MainPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <MainPage />,
      },
      {
        path: '/new',
        element: <CreatePage />,
      },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App
