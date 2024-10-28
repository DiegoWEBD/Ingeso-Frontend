import Cookies from 'js-cookie'
import React from 'react'
import { Link } from 'react-router-dom'
import AppTitle from '../AppTitle'
import { SECONDARY_COLOR } from '../../colors'

const Header: React.FC = () => {
	const accessToken = Cookies.get('access_token')

	return (
		<header className='flex justify-between px-6 py-8 bg-white w-full  shadow-md items-center'>
			<AppTitle style={{ color: SECONDARY_COLOR }} className='font-extrabold' />
			{!accessToken && (
				<Link
					to='/login'
					className='text-center rounded-md border-2 px-3 py-2 font-semibold text-[#6f7fb7] border-[#6f7fb7] hover:bg-[#6f7fb7] hover:text-white transition-all'
				>
					Iniciar sesión
				</Link>
			)}
		</header>
	)
}

export default Header
