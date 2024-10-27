import React, { ReactNode } from 'react'

type BodyContainerProps = {
	children: ReactNode
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
	return (
		<div className='flex flex-col px-5 gap-5 w-full h-full'>{children}</div>
	)
}

export default BodyContainer
