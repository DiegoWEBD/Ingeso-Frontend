import React, { useEffect, useState } from 'react'
import useAppState from '../../../global_states/appState'
import DrugsList from './drugs_list/DrugsList'
import DrugInitialData from '../../../../infrastrucure/drug/DrugInitialData'
import SearchBar from '../../SearchBar'

const DrugsPage: React.FC = () => {
	const drugsInitialData: Array<DrugInitialData> = useAppState(
		(state) => state.drugsInitialData
	)
	const [filteredDrugsInitialData, setFilteredDrugsInitialData] = useState<
		DrugInitialData[]
	>([])

	useEffect(() => {
		const waitTime = 0 // Tiempo que debe transcurrir desde que el usuario deja de escribir para realizar la búsqueda.

		const timeout = setTimeout(() => {
			filterDrugNames('')
		}, waitTime)

		return () => clearTimeout(timeout)
	}, [drugsInitialData])

	const filterDrugNames = (query: string) => {
		const filtered = drugsInitialData.filter((drugInitialData) =>
			drugInitialData.name.toLowerCase().includes(query.toLowerCase())
		)
		setFilteredDrugsInitialData(filtered)
	}

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold text-secondary">Fármacos</h1>
			<SearchBar onSearch={filterDrugNames} />
			<DrugsList drugsInitialData={filteredDrugsInitialData} />
		</div>
	)
}

export default DrugsPage
