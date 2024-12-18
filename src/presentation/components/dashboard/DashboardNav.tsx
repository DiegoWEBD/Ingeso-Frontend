import { Home, LogIn, Pill, Star, User } from 'lucide-react'
import React from 'react'
import DashboardTab from './DashboardTab'

type DashboardNavProps = {
	isOpen: boolean
	closeNav: () => void
}

const DashboardNav: React.FC<DashboardNavProps> = ({ isOpen, closeNav }) => {
	const accessToken = localStorage.getItem('access_token')

	return (
		<nav
			className={`flex w-full flex-col gap-2 transition-all duration-300 ease-in-out ${
				isOpen
					? 'max-h-[1000px] opacity-100'
					: 'max-h-0 opacity-0 lg:max-h-[1000px] lg:opacity-100'
			} overflow-hidden`}
		>
			<DashboardTab
				icon={<Home />}
				title="Inicio"
				to="/"
				closeNav={closeNav}
			/>

			{accessToken && (
				<DashboardTab
					icon={<Pill />}
					title="Fármacos"
					to="/farmacos"
					closeNav={closeNav}
				/>
			)}
			{accessToken && (
				<DashboardTab
					icon={<Star />}
					title="Favoritos"
					to="/favoritos"
					closeNav={closeNav}
				/>
			)}
			{accessToken && (
				<DashboardTab
					icon={<User />}
					title="Perfil"
					to="/perfil"
					closeNav={closeNav}
				/>
			)}

			{!accessToken && (
				<DashboardTab
					icon={<LogIn />}
					title="Iniciar sesión"
					to="/login"
					closeNav={closeNav}
				/>
			)}
		</nav>
	)
}

export default DashboardNav
