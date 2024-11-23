import React from 'react'
import DrugsListItem from './DrugsListItem'
import useAppState from '../../../../global_states/appState'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AddDrugButton from './AddDrugButton'

type DrugsListProps = {
	drugNames: string[]
}

const DrugsList: React.FC<DrugsListProps> = ({ drugNames }) => {
	const { loadingInitialData } = useAppState()

	return (
		<div
			className='grid gap-4  py-2'
			style={{
				gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
			}}
		>
			{!loadingInitialData && <AddDrugButton />}

			{loadingInitialData
				? Array.from({ length: 6 }).map((_, index) => (
						<Skeleton
							key={index}
							className='h-[4rem] border shadow'
							baseColor='var(--secondary-color-intense)'
							highlightColor='var(--secondary-color)'
						/>
				  ))
				: drugNames.map((drugName) => (
						<DrugsListItem key={drugName} drugName={drugName} />
				  ))}
		</div>
	)
}

export default DrugsList
