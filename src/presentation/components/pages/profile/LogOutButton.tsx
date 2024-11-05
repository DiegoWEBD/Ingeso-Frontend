import { LogOut } from 'lucide-react'
import React from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'

const LogOutButton: React.FC = () => {
	const navigate = useNavigate()

	const logOut = () => {
		Cookies.remove('access_token')
		navigate('/login')
	}

	return (
		<button
			type='button'
			onClick={logOut}
			className='flex items-center bg-[#047857] hover:bg-[#065f46] transition-all rounded text-white font-bold tracking-wide p-3'
		>
			<LogOut />
			<p>Cerrar sesión</p>
		</button>
	)
}

export default LogOutButton
