import React from 'react'
import AppContainer from '../AppContainer'
import Dashboard from '../dashboard/Dashboard'
import { Outlet } from 'react-router-dom'

const Root: React.FC = () => {
	return (
		<AppContainer>
			<Dashboard />
			<div className="py-6 px-4 text-3xl font-bold tracking-wide">
				Guía Administración de Fármacos
			</div>
			<Outlet />
		</AppContainer>
	)
}

export default Root
