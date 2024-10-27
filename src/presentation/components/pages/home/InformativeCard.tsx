import React, { ReactNode } from 'react'
import { PRIMARY_COLOR } from '../../../colors'

type InformativeCardProps = {
	title: string
	children: ReactNode
}

const InformativeCard: React.FC<InformativeCardProps> = ({
	title,
	children,
}) => {
	return (
		<div className='text-start h-[20rem] 2xl:h-[15rem] border w-[30rem] xl:w-[25rem] 2xl:w-[30rem] bg-white rounded-md p-5 flex flex-col gap-3 shadow-md '>
			<p style={{ color: PRIMARY_COLOR }} className='font-bold text-xl'>
				{title}
			</p>
			<div className='text-gray-700'>{children}</div>
		</div>
	)
}

export default InformativeCard
