import React, { ReactNode } from 'react'

type ModalInfoContainerProps = {
	children: ReactNode
}

const ModalInfoContainer: React.FC<ModalInfoContainerProps> = ({
	children,
}) => {
	return (
		<div className='overflow-y-auto border rounded-md p-4 max-h-[425px] flex flex-col gap-4'>
			{children}
		</div>
	)
}

export default ModalInfoContainer
