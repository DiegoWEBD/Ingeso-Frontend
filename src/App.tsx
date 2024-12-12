import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import ErrorFallback from './presentation/components/error/ErrorFallback'
import ProtectedRoute from './presentation/components/pages/ProtectedRoute'
import Root from './presentation/components/pages/Root'
import DrugsPage from './presentation/components/pages/drugs/DrugsPage'
import HomePage from './presentation/components/pages/home/HomePage'
import LoginPage from './presentation/components/pages/login/LoginPage'
import PageNotFound from './presentation/components/pages/not_found/PageNotFound'
import ProfilePage from './presentation/components/pages/profile/ProfilePage'
import FavoritesPage from './presentation/components/pages/favorites/FavoritesPage'

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
				element: <ProtectedRoute children={<DrugsPage />} />,
			},

			{
				path: 'favoritos',
				element: <ProtectedRoute children={<FavoritesPage />} />,
			},

			{
				path: 'perfil',
				element: <ProtectedRoute children={<ProfilePage />} />,
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
