import React from 'react'
import { NavLink } from 'react-router-dom'

type DashboardTabProps = {
	title: string
	to: string
	selected: boolean
}

const baseStyles = 'rounded-[7px] py-2 px-4 transition-all'
const unselectedStyle = `${baseStyles} hover:bg-gray-200`
const selectedStyle = `${baseStyles} bg-blue-200 text-blue-700 font-semibold`

const DashboardTab: React.FC<DashboardTabProps> = ({ title, to }) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? selectedStyle : unselectedStyle)}
		>
			{title}
		</NavLink>
	)
}

export default DashboardTab
