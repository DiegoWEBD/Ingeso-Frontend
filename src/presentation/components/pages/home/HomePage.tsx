import React from 'react'
import { Link } from 'react-router-dom'
import InstallButton from '../../buttons/InstallButton'
import InformativeCard from './InformativeCard'
import InititalMessage from './InititalMessage'

const HomePage: React.FC = () => {
	return (
		<div className="px-5 flex flex-col overflow-y-auto">
			<p className="font-extrabold text-xl sm:text-3xl lg:text-4xl xl:pt-5 text-primary-intense">
				Bienvenido a tu Guía de Farmacología
			</p>
			<div className="flex flex-col gap-[2rem] md:gap-[5rem] pt-5 sm:pt-10">
				<InititalMessage />
				<div className="flex flex-col gap-8 xl:flex-row xl:justify-around items-center xl:items-start ">
					<InformativeCard title="Características principales">
						<ul className="list-disc pl-5">
							<li>
								Información detallada sobre diversos fármacos.
							</li>
							<li>Guías de dosificación y administración.</li>
							<li>Reacciones adversas a medicamentos.</li>
							<li>
								Actualizaciones regulares basadas en las últimas
								evidencias.
							</li>
						</ul>
					</InformativeCard>

					<InformativeCard title="Cómo empezar">
						<ul className="list-decimal pl-5">
							<li>Inicia sesión con tu correo institucional.</li>
							<li>Explora la lista de fármacos disponibles.</li>
							<li>
								Selecciona un fármaco para ver información
								detallada.
							</li>
							<li>
								Utiliza la barra de búsqueda para encontrar
								fármacos específicos.
							</li>
						</ul>
					</InformativeCard>
				</div>
				<div className="flex flex-col gap-3">
					<InstallButton className="flex w-[12rem] items-center justify-center gap-3 text-white mx-auto font-bold py-3 px-5 rounded bg-primary-weak hover:bg-[var(primary-color)] transition-all hover:shadow-md" />
					<Link
						to="/farmacos"
						className="text-white w-[12rem] text-center mx-auto font-bold py-3 px-5 rounded bg-primary-weak hover:bg-[var(--primary-color)] transition-all hover:shadow-md"
					>
						Explorar fármacos
					</Link>
				</div>
			</div>
		</div>
	)
}

export default HomePage
