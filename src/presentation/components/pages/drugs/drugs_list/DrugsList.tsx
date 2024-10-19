import React from 'react'
import DrugsListItem from './DrugsListItem'

type DrugsListProps = {
	drugNames: string[]
}

const DrugsList: React.FC<DrugsListProps> = ({ drugNames }) => {
	return (
		<div
			className='grid gap-4 overflow-y-auto max-h-[70vh] w-[80vw]'
			style={{
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
				justifyItems: 'center', // Center items horizontally
				alignItems: 'center', // Center items vertically
			}}
		>
			{drugNames.map((drugName) => (
				<DrugsListItem key={drugName} drugName={drugName} />
			))}
		</div>
	)
}

export default DrugsList
