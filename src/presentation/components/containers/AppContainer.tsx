import React, { ReactNode } from 'react'

interface AppContainerProps {
	children: ReactNode
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
	// h-[100vh] es temporal
	return (
		<div className='flex flex-col lg:flex-row h-[100vh] bg-gray-100'>
			{children}
		</div>
	)
}

export default AppContainer
