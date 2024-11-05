import React from 'react'
import DashboardTab from './DashboardTab'
import { Home, Pill, LogIn } from 'lucide-react'
import Cookies from 'js-cookie'

type DashboardNavProps = {
	isOpen: boolean
	closeNav: () => void
}

const DashboardNav: React.FC<DashboardNavProps> = ({ isOpen, closeNav }) => {
	const accessToken = Cookies.get('access_token')

	return (
		<nav
			className={`flex w-full flex-col gap-2 transition-all duration-300 ease-in-out ${
				isOpen
					? 'max-h-[1000px] opacity-100'
					: 'max-h-0 opacity-0 lg:max-h-[1000px] lg:opacity-100'
			} overflow-hidden`}
		>
			<DashboardTab icon={<Home />} title='Inicio' to='/' closeNav={closeNav} />

			{accessToken && (
				<DashboardTab
					icon={<Pill />}
					title='Fármacos'
					to='/farmacos'
					closeNav={closeNav}
				/>
			)}

			{!accessToken && (
				<DashboardTab
					icon={<LogIn />}
					title='Iniciar sesión'
					to='/login'
					closeNav={closeNav}
				/>
			)}
		</nav>
	)
}

export default DashboardNav
