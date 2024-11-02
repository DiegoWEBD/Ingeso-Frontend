import React, { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import useAppState from '../../global_states/appState'
import AppContainer from '../containers/AppContainer'
import BodyContainer from '../containers/BodyContainer'
import Dashboard from '../dashboard/Dashboard'
import Header from '../header/Header'

import Cookies from 'js-cookie'

const Root: React.FC = () => {
	const { loadInitialData } = useAppState()
	const pathname = useLocation().pathname
	const accessToken = Cookies.get('access_token')

	useEffect(() => {
		if (accessToken) loadInitialData()
	}, [accessToken])

	return (
		<AppContainer>
			{Cookies.get('access_token') && <Dashboard />}
			<div className='w-full h-full'>
				<BodyContainer>
					{pathname !== '/login' && <Header />}
					<Outlet />
				</BodyContainer>
			</div>
		</AppContainer>
	)
}

export default Root
