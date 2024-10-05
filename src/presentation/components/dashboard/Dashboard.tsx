import React from 'react'
import DashboardTab from './DashboardTab'

const Dashboard: React.FC = () => {
	return (
		<div className="bg-white py-5 px-3 flex flex-col gap-2 shadow-md shadow-gray-500/50 w-[18rem]">
			<DashboardTab title="Inicio" to="/" />
			<DashboardTab title="Fármacos" to="/drugs" />
			<DashboardTab title="Tipos de fármacos" to="/drug_types" />
			<DashboardTab title="Vías de administración" to="/administration_route" />
		</div>
	)
}

export default Dashboard
