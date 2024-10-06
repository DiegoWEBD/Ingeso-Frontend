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
				<p className="text-3xl font-bold tracking-wide">
					Guía Administración de Fármacos
				</p>
				<Outlet />
			</BodyContainer>
		</AppContainer>
	)
}

export default Root
