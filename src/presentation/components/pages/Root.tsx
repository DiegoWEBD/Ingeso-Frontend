import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAppState from '../../global_states/appState'
import AppContainer from '../containers/AppContainer'
import BodyContainer from '../containers/BodyContainer'
import Dashboard from '../dashboard/Dashboard'

import Cookies from 'js-cookie'
import { useErrorBoundary } from 'react-error-boundary'

const Root: React.FC = () => {
	const { loadInitialData, setTheme } = useAppState()
	const accessToken = Cookies.get('access_token')
	const { showBoundary } = useErrorBoundary()

	useEffect(() => {
		if (!accessToken) return

		loadInitialData()
			.then(() => console.log('Datos iniciales cargados.'))
			.catch((error) => showBoundary(error))
	}, [accessToken])

	useEffect(() => {
		const dataTheme = localStorage.getItem('data-theme')

		if (dataTheme) setTheme(dataTheme)
	}, [])

	return (
		<AppContainer>
			<Dashboard />
			<div className="w-full h-full">
				<BodyContainer>
					<Outlet />
				</BodyContainer>
			</div>
		</AppContainer>
	)
}

export default Root
