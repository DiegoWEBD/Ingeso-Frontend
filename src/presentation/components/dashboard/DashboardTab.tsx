import React from 'react'

type DashboardTabProps = {
	title: string
	to: string
	selected: boolean
}

const selectedStyle =
	'rounded-[7px] py-2 px-4 bg-blue-200 text-blue-700 transition-all font-semibold'

const DashboardTab: React.FC<DashboardTabProps> = ({ title, selected }) => {
	return (
		<div
			className={
				selected
					? selectedStyle
					: 'rounded-[7px] py-2 px-4 hover:bg-gray-200 transition-all'
			}
		>
			{title}
		</div>
	)
}

export default DashboardTab
