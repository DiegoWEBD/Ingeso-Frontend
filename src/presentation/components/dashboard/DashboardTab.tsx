import React from 'react'
import { NavLink } from 'react-router-dom'
import { PRIMARY_COLOR } from '../../colors'

type DashboardTabProps = {
	title: string
	to: string
}

const baseStyles = `w-full rounded-[7px] py-2 px-4 transition-all text-[${PRIMARY_COLOR}] font-semibold`
const unselectedStyle = `${baseStyles} hover:bg-gray-200`
const selectedStyle = `${baseStyles} bg-[${PRIMARY_COLOR}] text-white`

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
