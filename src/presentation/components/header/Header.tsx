import React from 'react'
import { Link } from 'react-router-dom'
import useAppState from '../../global_states/appState'

const Header: React.FC = () => {
	const user = useAppState((state) => state.user)

	return (
		<header className='flex justify-between px-6 py-8 bg-white w-full  shadow-md'>
			<p className='text-[#8b5e3c] text-3xl font-bold'>Bienvenido</p>
			{user === null && (
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
