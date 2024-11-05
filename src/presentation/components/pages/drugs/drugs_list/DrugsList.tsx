import React from 'react'
import DrugsListItem from './DrugsListItem'

type DrugsListProps = {
	drugNames: string[]
}

const DrugsList: React.FC<DrugsListProps> = ({ drugNames }) => {
	return (
		<div
			className='grid gap-4 max-h-[70vh] py-2'
			style={{
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
			}}
		>
			{drugNames.map((drugName) => (
				<DrugsListItem key={drugName} drugName={drugName} />
			))}
		</div>
	)
}

export default DrugsList
