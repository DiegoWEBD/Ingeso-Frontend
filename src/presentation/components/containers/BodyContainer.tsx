import React, { ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

type BodyContainerProps = {
	children: ReactNode
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
	const location = useLocation()
	const accessToken = Cookies.get('access_token')

	return (
		<div
			className={accessToken ? 'pt-[8rem] lg:pt-0 lg:pl-[25rem]' : ''}
			style={{
				height: location.pathname === '/login' ? '100%' : '',
			}}
		>
			<div className='flex flex-col p-5 gap-5 w-full bg-gray-100 h-full'>
				{children}
			</div>
		</div>
	)
}

export default BodyContainer
