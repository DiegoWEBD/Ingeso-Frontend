import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import useAppState from '../../global_states/appState'
import AppContainer from '../containers/AppContainer'
import BodyContainer from '../containers/BodyContainer'
import Dashboard from '../dashboard/Dashboard'

import Cookies from 'js-cookie'

const Root: React.FC = () => {
	const { loadInitialData } = useAppState()
	const accessToken = Cookies.get('access_token')

	useEffect(() => {
		if (accessToken) loadInitialData()
	}, [accessToken])

	return (
		<AppContainer>
			<Dashboard />
			<div className='w-full h-full'>
				<BodyContainer>
					<Outlet />
				</BodyContainer>
			</div>
		</AppContainer>
	)
}

export default Root
