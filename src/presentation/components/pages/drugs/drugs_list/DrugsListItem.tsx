import React, { useState } from 'react'
import Drug from '../../../../../domain/drug/Drug'
import DrugRepository from '../../../../../domain/drug/DrugRepository'
import useAppState from '../../../../global_states/appState'
import DrugItemModal from './modal/DrugItemModal'

type DrugsListItemProps = {
	drugName: string
}

const DrugsListItem: React.FC<DrugsListItemProps> = ({ drugName }) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false)
	const [drug, setDrug] = useState<Drug | null>(null)

	const drugRepository: DrugRepository = useAppState(
		(state) => state.drugRepository
	)

	const onClick = () => {
		getDrug()
			.then((data) => {
				setDrug(data)
				setModalVisible(true)
			})
			.catch(console.error)
	}

	const getDrug = async (): Promise<Drug> => {
		return (await drugRepository.findByName(drugName)) as Drug
	}

	const closeModal = () => {
		setModalVisible(false)
	}

	return (
		<>
			<button
				onClick={onClick}
				className='rounded border font-semibold rounded-[7px] shadow-sm shadow-black/30 py-[0.9rem] px-[0.8rem] hover:shadow-md hover:shadow-black/30 transition-all'
			>
				{drugName}
			</button>

			{modalVisible && drug !== null && (
				<DrugItemModal closeModal={closeModal} drug={drug} />
			)}
		</>
	)
}

export default DrugsListItem
