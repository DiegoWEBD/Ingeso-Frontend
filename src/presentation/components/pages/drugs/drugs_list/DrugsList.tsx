import React from 'react'
import DrugsListItem from './DrugsListItem'
import useAppState from '../../../../global_states/appState'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AddDrugButton from './AddDrugButton'
import DrugInitialData from '../../../../../infrastrucure/drug/DrugInitialData'

type DrugsListProps = {
	drugsInitialData: DrugInitialData[]
}

const DrugsList: React.FC<DrugsListProps> = ({ drugsInitialData }) => {
	const { loadingInitialData } = useAppState()

	return (
		<div
			className="grid gap-4  py-2"
			style={{
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
			}}
		>
			{!loadingInitialData && <AddDrugButton />}

			{loadingInitialData
				? Array.from({ length: 6 }).map((_, index) => (
						<Skeleton
							key={index}
							className="h-[4rem] border shadow"
							baseColor="var(--secondary-color-intense)"
							highlightColor="var(--secondary-color)"
						/>
				  ))
				: drugsInitialData.map((data) => (
						<DrugsListItem key={data.name} drugInitialData={data} />
				  ))}
		</div>
	)
}

export default DrugsList
