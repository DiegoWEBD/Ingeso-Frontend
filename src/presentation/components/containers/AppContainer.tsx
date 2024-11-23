import React, { ReactNode } from 'react'

interface AppContainerProps {
	children: ReactNode
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
	return (
		<div className='flex flex-col lg:flex-row h-[100vh] bg-secondary app-container'>
			{children}
		</div>
	)
}

export default AppContainer
