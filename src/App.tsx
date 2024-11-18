import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorFallback from './presentation/components/error/ErrorFallback'
import ProtectedComponent from './presentation/components/pages/ProtectedComponent'
import Root from './presentation/components/pages/Root'
import DrugsPage from './presentation/components/pages/drugs/DrugsPage'
import HomePage from './presentation/components/pages/home/HomePage'
import LoginPage from './presentation/components/pages/login/LoginPage'
import PageNotFound from './presentation/components/pages/not_found/PageNotFound'
import ProfilePage from './presentation/components/pages/profile/ProfilePage'

const router = createBrowserRouter([
	{
		path: '/',
		element: (
			<ErrorBoundary FallbackComponent={ErrorFallback}>
				<Root />
			</ErrorBoundary>
		),
		children: [
			{
				path: '/',
				element: <HomePage />,
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'farmacos',
				element: <ProtectedComponent children={<DrugsPage />} />,
			},

			{
				path: 'perfil',
				element: <ProtectedComponent children={<ProfilePage />} />,
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
