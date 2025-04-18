import React, { ReactNode } from 'react'

type InformativeCardProps = {
	title: string
	children: ReactNode
}

const InformativeCard: React.FC<InformativeCardProps> = ({
	title,
	children,
}) => {
	return (
		<div className='bg-card text-start h-fit xl:h-[20rem] 2xl:h-[15rem] border w-full md:w-[30rem] xl:w-[25rem] 2xl:w-[30rem] bg-white rounded-md p-5 flex flex-col gap-3 shadow-md '>
			<p className='font-bold text-xl text-primary '>{title}</p>
			<div className='text-secondary'>{children}</div>
		</div>
	)
}

export default InformativeCard
