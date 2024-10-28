import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'
import { SECONDARY_COLOR } from '../../colors'

type DashboardTabProps = {
	icon: ReactElement
	title: string
	to: string
	closeDashboard: () => void
}

const baseStyles = `w-full rounded-[7px] py-2 px-4 transition-all text-white font-semibold flex gap-5 items-center`
const unselectedStyle = `${baseStyles} hover:bg-[#059669]`
const selectedStyle = {
	background: SECONDARY_COLOR,
}

const DashboardTab: React.FC<DashboardTabProps> = ({
	icon,
	title,
	to,
	closeDashboard,
}) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? baseStyles : unselectedStyle)}
			style={({ isActive }) => (isActive ? selectedStyle : {})}
			onClick={closeDashboard}
		>
			{icon}
			<p className='text-lg'>{title}</p>
		</NavLink>
	)
}

export default DashboardTab
