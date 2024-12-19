import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAppState from '../../global_states/appState'
import AppContainer from '../containers/AppContainer'
import BodyContainer from '../containers/BodyContainer'
import Dashboard from '../dashboard/Dashboard'

import { useErrorBoundary } from 'react-error-boundary'
import InformativeNotification from '../generic_components/notifications/InformativeNotification'

const Root: React.FC = () => {
	const { loadInitialData, setTheme } = useAppState()
	const accessToken = localStorage.getItem('access_token')
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
			<InformativeNotification />
			<Dashboard />
			<BodyContainer>
				<Outlet />
			</BodyContainer>
		</AppContainer>
	)
}

export default Root
