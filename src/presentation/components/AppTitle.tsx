import React from 'react'

type AppTitleProps = {
	className?: string
	style?: Object
}

const AppTitle: React.FC<AppTitleProps> = ({ className, style }) => {
	return (
		<p
			className={`text-3xl font-bold tracking-wide pb-5 ${
				className ? className : ''
			}`}
			style={style}
		>
			Guía Administración de Fármacos
		</p>
	)
}

export default AppTitle
