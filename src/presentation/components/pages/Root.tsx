import React from 'react'
import AppContainer from '../containers/AppContainer'
import BodyContainer from '../containers/BodyContainer'
import Dashboard from '../dashboard/Dashboard'
import { Outlet } from 'react-router-dom'

const Root: React.FC = () => {
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
