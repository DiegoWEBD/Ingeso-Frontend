import React from 'react'

type DrugInfoLabelProps = {
	children: string
}

const DrugInfoLabel: React.FC<DrugInfoLabelProps> = ({ children }) => {
	return <label className="font-bold text-lg text-primary">{children}</label>
}

export default DrugInfoLabel
