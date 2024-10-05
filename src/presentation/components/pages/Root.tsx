import React from 'react'
import AppContainer from '../AppContainer'
import Dashboard from '../dashboard/Dashboard'
import { Outlet } from 'react-router-dom'

const Root: React.FC = () => {
	return (
		<AppContainer>
			<Dashboard />

			<div className="flex flex-col py-6 px-4 gap-5">
				<p className="text-3xl font-bold tracking-wide">
					Guía Administración de Fármacos
				</p>
				<Outlet />
			</div>
		</AppContainer>
	)
}

export default Root
