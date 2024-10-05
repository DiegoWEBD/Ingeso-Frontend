import React, { ReactNode } from 'react'

interface AppContainerProps {
	children: ReactNode
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
	return (
		<div className="mx-auto w-[90%] sm:w-[33rem] flex flex-col gap-3 text-[0.8rem]">
			{children}
		</div>
	)
}

export default AppContainer
