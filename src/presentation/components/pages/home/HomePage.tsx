import React from 'react'
import { Link } from 'react-router-dom'
import { SECONDARY_COLOR } from '../../../colors'
import InformativeCard from './InformativeCard'
import InititalMessage from './InititalMessage'

const HomePage: React.FC = () => {
	return (
		<div className='p-5 text-center flex flex-col gap-[2.5rem] 2xl:gap-[5rem] overflow-y-auto'>
			<p className='font-extrabold text-5xl' style={{ color: SECONDARY_COLOR }}>
				Bienvenido a tu Guía de Farmacología
			</p>
			<InititalMessage />
			<div className='flex flex-col gap-8 xl:flex-row xl:justify-around items-center xl:items-start '>
				<InformativeCard title='Características principales'>
					<ul className='list-disc pl-5'>
						<li>Información detallada sobre diversos fármacos.</li>
						<li>Guías de dosificación y administración.</li>
						<li>Reacciones adversas a medicamentos.</li>
						<li>Actualizaciones regulares basadas en la últimas evidencia.</li>
					</ul>
				</InformativeCard>

				<InformativeCard title='Cómo empezar'>
					<ul className='list-decimal pl-5'>
						<li>Inicia sesión con tu correo institucional.</li>
						<li>Explora la lista de fármacos disponibles.</li>
						<li>Selecciona un fármaco para ver infromación detallada.</li>
						<li>
							Utiliza la barra de búsqueda para encontrar fármacos específicos.
						</li>
					</ul>
				</InformativeCard>
			</div>
			<Link
				to='/farmacos'
				className='text-white w-fit mx-auto font-bold py-3 px-5 rounded hover:bg-[#5a699e] bg-[#6f7fb7] transition-all hover:shadow-md'
			>
				Explorar fármacos
			</Link>
		</div>
	)
}

export default HomePage
