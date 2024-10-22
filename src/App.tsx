import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './presentation/components/pages/Root'
import HomePage from './presentation/components/pages/home/HomePage'
import PageNotFound from './presentation/components/pages/not_found/PageNotFound'
import DrugsPage from './presentation/components/pages/drugs/DrugsPage'
import AddDrugPage from './presentation/components/pages/drugs/addDrugPage'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/drugs',
        element: <DrugsPage />,
      },
      {
        path: '/drugs/add',
        element: <AddDrugPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])

const App: React.FC = () => {
  return <RouterProvider router={router} />
}

export default App
