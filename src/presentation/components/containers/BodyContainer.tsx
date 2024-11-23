import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import useAppState from '../../global_states/appState'

type BodyContainerProps = {
	children: ReactNode
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
	const pathname = useLocation().pathname
	const { isAppInstaled } = useAppState()

	return (
		<div
			className='pt-[5rem] md:pt-[6rem] lg:pt-0 lg:pl-[25rem]'
			style={{
				height: pathname === '/login' ? '100%' : '',
			}}
		>
			<div
				className={`flex flex-col px-4 pb-4 ${
					isAppInstaled() ? 'pt-14' : 'pt-5'
				} gap-5 w-full h-full`}
			>
				{children}
			</div>
		</div>
	)
}

export default BodyContainer
