import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './presentation/components/pages/Root'

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		children: [],
	},
])

const App: React.FC = () => {
	return <RouterProvider router={router} />
}

export default App
