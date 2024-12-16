import { useEffect, useState } from 'react'
import useAppState from '../../../global_states/appState'
import DrugInitialData from '../../../../infrastrucure/drug/DrugInitialData'
import DrugsList from '../drugs/drugs_list/DrugsList'
import SearchBar from '../../SearchBar'

const FavoritesPage: React.FC = () => {
	const { drugsInitialData } = useAppState()
	const [favoriteDrugs, setFavoriteDrugs] = useState<DrugInitialData[]>([])
	const [filteredFavoriteDrugs, setFilteredFavoriteDrugs] = useState<
		DrugInitialData[]
	>([])

	useEffect(() => {
		const favorites = drugsInitialData.filter((drug) => drug.favorite)
		setFavoriteDrugs(favorites)
		setFilteredFavoriteDrugs(favorites)
	}, [drugsInitialData])

	const filterFavoriteDrugs = (query: string) => {
		const filtered = favoriteDrugs.filter((drug) =>
			drug.name.toLowerCase().includes(query.toLowerCase())
		)
		setFilteredFavoriteDrugs(filtered)
	}

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold text-secondary">Favoritos</h1>
			<SearchBar onSearch={filterFavoriteDrugs} />
			<DrugsList drugsInitialData={filteredFavoriteDrugs} />
		</div>
	)
}

export default FavoritesPage
