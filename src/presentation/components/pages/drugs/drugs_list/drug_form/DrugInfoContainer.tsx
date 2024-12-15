import React, { ReactNode } from 'react'

type DrugInfoContainerProps = {
	children: ReactNode
}

const DrugInfoContainer: React.FC<DrugInfoContainerProps> = ({ children }) => {
	return (
		<div className="overflow-y-auto max-h-[425px] flex flex-col gap-4 mb-5 px-1">
			{children}
		</div>
	)
}

export default DrugInfoContainer
