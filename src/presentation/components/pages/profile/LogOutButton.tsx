import Cookies from 'js-cookie'
import { LogOut } from 'lucide-react'
import React from 'react'

const LogOutButton: React.FC = () => {
	const logOut = () => {
		Cookies.remove('access_token')
		window.location.reload()
	}

	return (
		<button
			type='button'
			onClick={logOut}
			className='w-fit flex items-center gap-3 bg-[#047857] hover:bg-[#065f46] transition-all rounded text-white font-bold tracking-wide p-3'
		>
			<LogOut />
			<p>Cerrar sesión</p>
		</button>
	)
}

export default LogOutButton
