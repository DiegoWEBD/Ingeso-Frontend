import { LogOut } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const LogOutButton: React.FC = () => {
	const navigate = useNavigate()

	const logOut = () => {
		localStorage.removeItem('access_token')
		localStorage.removeItem('refresh_token')
		navigate('/login')
	}

	return (
		<button
			type="button"
			onClick={logOut}
			className="w-fit flex items-center gap-3 bg-primary-weak hover:bg-[var(--primary-color)] transition-all rounded text-white font-bold tracking-wide p-3"
		>
			<LogOut />
			<p>Cerrar sesión</p>
		</button>
	)
}

export default LogOutButton
