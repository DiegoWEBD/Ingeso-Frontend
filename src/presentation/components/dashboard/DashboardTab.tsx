import React, { ReactElement } from 'react'
import { NavLink } from 'react-router-dom'

type DashboardTabProps = {
	icon: ReactElement
	title: string
	to: string
	closeNav: () => void
}

const baseStyles = `w-full rounded-[7px] py-2 px-4 transition-all text-white font-semibold flex gap-5 items-center bg-primary hover:bg-[var(--primary-color-weak)]`
const selectedStyle = `${baseStyles} bg-primary-weak`

const DashboardTab: React.FC<DashboardTabProps> = ({
	icon,
	title,
	to,
	closeNav,
}) => {
	return (
		<NavLink
			to={to}
			className={({ isActive }) => (isActive ? selectedStyle : baseStyles)}
			onClick={closeNav}
		>
			{icon}
			<p className='text-lg'>{title}</p>
		</NavLink>
	)
}

export default DashboardTab
