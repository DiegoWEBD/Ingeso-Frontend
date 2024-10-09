import React from 'react'
import DrugsListItem from './DrugsListItem'

type DrugsListProps = {
	drugNames: string[]
}

const DrugsList: React.FC<DrugsListProps> = ({ drugNames }) => {
	return (
		<div className="grid grid-cols-5 gap-4">
			{drugNames.map((drugName) => (
				<DrugsListItem key={drugName} drugName={drugName} />
			))}
		</div>
	)
}

export default DrugsList
