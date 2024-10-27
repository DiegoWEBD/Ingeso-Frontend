import React from 'react'
import AppTitle from '../../AppTitle'

const HomePage: React.FC = () => {
	return (
		<div>
			<AppTitle
				className='font-extrabold'
				style={{
					color: '#8b5e3c',
				}}
			/>
			<p>Página Inicio</p>
		</div>
	)
}

export default HomePage
