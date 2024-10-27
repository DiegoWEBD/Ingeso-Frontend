import Cookies from 'js-cookie'
import React from 'react'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
	const accessToken = Cookies.get('access_token')

	return (
		<header className='flex justify-between px-6 py-8 bg-white w-full  shadow-md'>
			<p className='text-[#8b5e3c] text-3xl font-bold'>Bienvenido</p>
			{!accessToken && (
				<Link
					to='/login'
					className='rounded-md border-2 px-3 py-2 font-semibold text-[#6f7fb7] border-[#6f7fb7] hover:bg-[#6f7fb7] hover:text-white transition-all'
				>
					Iniciar sesión
				</Link>
			)}
		</header>
	)
}

export default Header
