import React from 'react'

type AppTitleProps = {
	className?: string
}

const AppTitle: React.FC<AppTitleProps> = ({ className }) => {
	return (
		<p
			className={`text-3xl font-bold tracking-wide pb-5 ${
				className ? className : ''
			}`}
		>
			Guía Administración de Fármacos
		</p>
	)
}

export default AppTitle
