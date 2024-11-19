import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'

type BodyContainerProps = {
	children: ReactNode
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
	const pathname = useLocation().pathname

	return (
		<div
			className='pt-[5rem] md:pt-[6rem] lg:pt-0 lg:pl-[25rem]'
			style={{
				height: pathname === '/login' ? '100%' : '',
			}}
		>
			<div className='flex flex-col p-5 gap-5 w-full h-full'>{children}</div>
		</div>
	)
}

export default BodyContainer
