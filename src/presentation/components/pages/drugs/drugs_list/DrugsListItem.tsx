import React, { useState } from 'react'
import DrugRepository from '../../../../../domain/drug/DrugRepository'
import useAppState from '../../../../global_states/appState'
import DrugItemModal from './modal/DrugItemModal'
import Drug from '../../../../../domain/drug/Drug'
import {Star} from 'lucide-react'

type DrugsListItemProps = {
	drugName: string
}

const DrugsListItem: React.FC<DrugsListItemProps> = ({ drugName }) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false)
	const [drug, setDrug] = useState<Drug | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [isFavorite, setIsFavorite] = useState<boolean>(false)

	const drugRepository: DrugRepository = useAppState(
		(state) => state.drugRepository
	)

	const handleFavoriteClick = async () => {
		if (isFavorite) {
		  await drugRepository.removeFavorite(drugName)
		} else {
		  await drugRepository.addFavorite(drugName)
		}
		setIsFavorite(!isFavorite)
	  }

	const onClick = () => {
		openModal()
		getDrug()
			.then((data) => {
				setDrug(data)
				setLoading(false)
			})
			.catch(console.error)
	}

	const getDrug = async (): Promise<Drug> => {
		setLoading(true)
		return (await drugRepository.findByName(drugName)) as Drug
	}

	const openModal = () => setModalVisible(true)
	const closeModal = () => setModalVisible(false)


	return (
		<div className='relative'>
		  <button onClick={onClick} className='min-h-[4rem] w-full bg-card text-secondary hover:font-bold transition-all rounded border font-semibold rounded-[7px] shadow-sm shadow-black/30 py-[0.9rem] px-[0.8rem] hover:shadow-md hover:shadow-black/30 transition-all'>
			{drugName}
		  </button>
		  {modalVisible && (
				<DrugItemModal closeModal={closeModal} drug={drug} loading={loading} />
			)}
		  <Star
			onClick={handleFavoriteClick}
			className={`absolute top-2 right-2 cursor-pointer ${isFavorite ? 'text-yellow-500' : 'text-gray-400'}`}
		  />
		</div>
	  )

	return (
		<>
			<button
				onClick={onClick}
				className='min-h-[4rem] w-full bg-card text-secondary hover:font-bold transition-all rounded border font-semibold rounded-[7px] shadow-sm shadow-black/30 py-[0.9rem] px-[0.8rem] hover:shadow-md hover:shadow-black/30 transition-all'
			>
				{drugName}
			</button>

			{modalVisible && (
				<DrugItemModal closeModal={closeModal} drug={drug} loading={loading} />
			)}
		</>
	)
}

export default DrugsListItem
