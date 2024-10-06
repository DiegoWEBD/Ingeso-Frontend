import React, { ReactNode } from 'react'

type BodyContainerProps = {
	children: ReactNode
}

const BodyContainer: React.FC<BodyContainerProps> = ({ children }) => {
	return <div className="flex flex-col py-6 px-4 gap-5">{children}</div>
}

export default BodyContainer
