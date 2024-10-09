import React from 'react'
import DrugsListItem from './DrugsListItem'

type DrugsListProps = {
	drugs: string[]
}

const DrugsList: React.FC<DrugsListProps> = ({ drugs }) => {
	return (
		<div className="flex flex-wrap gap-5 ">
			{drugs.map((drugName) => (
				<DrugsListItem key={drugName} drugName={drugName} />
			))}
		</div>
	)
}

export default DrugsList
