import React, { useEffect } from 'react'
import AppContainer from '../containers/AppContainer'
import BodyContainer from '../containers/BodyContainer'
import Dashboard from '../dashboard/Dashboard'
import { Outlet } from 'react-router-dom'
import useAppState from '../../global_states/appState'

const Root: React.FC = () => {
	const loadInitialData = useAppState((state) => state.loadInitialData)

	useEffect(() => {
		loadInitialData()
	}, [])

	return (
		<AppContainer>
			<Dashboard />
			<BodyContainer>
				<Outlet />
			</BodyContainer>
		</AppContainer>
	)
}

export default Root
