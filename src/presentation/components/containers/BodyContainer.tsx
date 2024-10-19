import React, { ReactNode } from 'react'

type BodyContainerProps = {
	children: ReactNode
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
	return (
		<div className='flex flex-col mx-6 mt-12 sm:ml-5 gap-5 w-full'>
			{children}
		</div>
	)
}

export default BodyContainer
