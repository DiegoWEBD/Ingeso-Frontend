import React, { ReactNode } from 'react'

interface AppContainerProps {
	children: ReactNode
}

const AppContainer: React.FC<AppContainerProps> = ({ children }) => {
	// h-[100vh] es temporal
	return <div className='flex bg-gray-100 h-[100vh]'>{children}</div>
}

export default AppContainer
