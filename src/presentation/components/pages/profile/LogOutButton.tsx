import Cookies from 'js-cookie'
import { LogOut } from 'lucide-react'
import React from 'react'

const LogOutButton: React.FC = () => {
	const logOut = () => {
		Cookies.remove('access_token')
		Cookies.remove('refresh_token')
		window.location.reload()
	}

	return (
		<button
			type='button'
			onClick={logOut}
			className='w-fit flex items-center gap-3 bg-primary-weak hover:bg-[var(--primary-color)] transition-all rounded text-white font-bold tracking-wide p-3'
		>
			<LogOut />
			<p>Cerrar sesión</p>
		</button>
	)
}

export default LogOutButton
