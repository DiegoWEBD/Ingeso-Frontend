import React from 'react'
import Drug from '../../../../../../domain/drug/Drug'
import useAppState from '../../../../../global_states/appState'
import { useErrorBoundary } from 'react-error-boundary'

type DeleteDrugButtonProps = {
	drug: Drug | null
	closeModal: () => void
}

const DeleteDrugButton: React.FC<DeleteDrugButtonProps> = ({
	drug,
	closeModal,
}) => {
	const { drugRepository, setDrugsNames, drugsInitialData } = useAppState()
	const { showBoundary } = useErrorBoundary()

	const handleDeleteDrug = () => {
		if (!drug) return

		drugRepository
			.delete(drug)
			.then(() => {
				console.log('Fármaco eliminado correctamente.')
				setDrugsNames(
					drugsInitialData.filter(
						(data) => data.name !== drug.getName()
					)
				)
				closeModal()
			})
			.catch((error) => showBoundary(error))
	}

	return (
		<button
			type="button"
			className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:font-bold w-full transition-all"
			onClick={handleDeleteDrug}
		>
			Eliminar Fármaco
		</button>
	)
}

export default DeleteDrugButton
