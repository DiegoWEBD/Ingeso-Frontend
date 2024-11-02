import Cookies from 'js-cookie'
import React from 'react'
import { Link } from 'react-router-dom'
import { PRIMARY_COLOR_INTENSE } from '../../colors'

const Header: React.FC = () => {
	const accessToken = Cookies.get('access_token')

	return (
		<header className='flex gap-3 justify-between pt-8 w-full items-center bg-gray-100'>
			<p
				style={{ color: PRIMARY_COLOR_INTENSE }}
				className='font-extrabold text-3xl xs:text-3xl sm:text-5xl tracking-wide'
			>
				Guía Farmacología
			</p>
			{!accessToken && (
				<Link
					to='/login'
					className='text-sm xs:text-md text-center rounded-md border-2 p-1 sm:px-3 sm:py-2 font-semibold text-[#047857] border-[#047857] hover:bg-[#047857] hover:shadow hover:text-white transition-all'
				>
					Iniciar sesión
				</Link>
			)}
		</header>
	)
}

export default Header
