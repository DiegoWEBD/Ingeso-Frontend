import React from 'react'

const PageNotFound: React.FC = () => {
	return (
		<div className="flex flex-col gap-4 items-center justify-center h-[90vh] tracking-widest">
			<p className="text-6xl font-bold">404</p>
			<p className="text-2xl">Página no encontrada 😢</p>
		</div>
	)
}

export default PageNotFound
