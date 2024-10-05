import React from 'react'
import DashboardTab from './DashboardTab'

const Dashboard: React.FC = () => {
	return (
		<div className="bg-white p-5 flex flex-col gap-2 shadow-md shadow-gray-500/50 w-[18rem]">
			<DashboardTab title="Todas las categorías" to="/" selected={true} />
			<DashboardTab title="Fármacos" to="/drugs" selected={false} />
			<DashboardTab
				title="Tipos de fármacos"
				to="/drug_types"
				selected={false}
			/>
			<DashboardTab
				title="Vías de administración"
				to="/administration_route"
				selected={false}
			/>
		</div>
	)
}

export default Dashboard
