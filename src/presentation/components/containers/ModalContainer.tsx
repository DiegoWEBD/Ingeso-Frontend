import React, { ReactNode } from 'react'

type ModalContainerProps = {
	children: ReactNode
}

const ModalContainer: React.FC<ModalContainerProps> = ({ children }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			{children}
		</div>
	)
}

export default ModalContainer
