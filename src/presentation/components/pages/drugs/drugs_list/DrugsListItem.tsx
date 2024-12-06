import { Star } from 'lucide-react'
import React, { useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import Drug from '../../../../../domain/drug/Drug'
import DrugRepository from '../../../../../domain/drug/DrugRepository'
import useAppState from '../../../../global_states/appState'
import DrugItemForm from './drug_form/DrugItemForm'
import DrugInitialData from '../../../../../infrastrucure/drug/DrugInitialData'
import ModalContainer from '../../../containers/ModalContainer'

type DrugsListItemProps = {
	drugInitialData: DrugInitialData
}

const DrugsListItem: React.FC<DrugsListItemProps> = ({ drugInitialData }) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false)
	const [drug, setDrug] = useState<Drug | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [isFavorite, setIsFavorite] = useState<boolean>(
		drugInitialData.favorite
	)
	const { showBoundary } = useErrorBoundary()

	const drugRepository: DrugRepository = useAppState(
		(state) => state.drugRepository
	)

	const handleFavoriteClick = async () => {
		if (isFavorite) {
			await drugRepository.removeFavorite(drugInitialData.name)
		} else {
			await drugRepository.addFavorite(drugInitialData.name)
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
			.catch((error) => {
				showBoundary(error)
			})
	}

	const getDrug = async (): Promise<Drug> => {
		setLoading(true)
		return (await drugRepository.findByName(drugInitialData.name)) as Drug
	}

	const openModal = () => setModalVisible(true)
	const closeModal = () => setModalVisible(false)

	return (
		<div className="relative">
			<button
				onClick={onClick}
				className="min-h-[4rem] w-full bg-card text-secondary hover:font-bold transition-all rounded font-semibold rounded-[7px] shadow-sm shadow-black/30 py-[0.9rem] px-[1.8rem] hover:shadow-md hover:shadow-black/30"
			>
				<p className="break-words">{drugInitialData.name}</p>
			</button>

			<Star
				onClick={handleFavoriteClick}
				size={'1.3rem'}
				className={`absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer ${
					isFavorite ? 'text-yellow-500' : 'text-gray-400'
				}`}
			/>

			{modalVisible && (
				<ModalContainer>
					<DrugItemForm
						closeModal={closeModal}
						drug={drug}
						loading={loading}
					/>
				</ModalContainer>
			)}
		</div>
	)
}

export default DrugsListItem
