import React from 'react'
import Drug from '../../../../../../../domain/drug/Drug'
import useAppState from '../../../../../../global_states/appState'
import { useErrorBoundary } from 'react-error-boundary'
import useConfirmationNotification from '../../../../../generic_components/notifications/custom_hooks/useConfirmationNotification'
import ConfirmationNotification from '../../../../../generic_components/notifications/ConfirmationNotification'
import { useNotification } from '../../../../../generic_components/notifications/contexts/InformativeNotificationContext'
import Button from '../../../../../generic_components/buttons/Button'

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
	const { showNotification } = useNotification()

	const {
		isConfirmationOpen,
		openConfirmationNotification,
		closeConfirmationNotification,
	} = useConfirmationNotification()

	const handleDeleteDrug = () => {
		if (!drug) return

		drugRepository
			.delete(drug)
			.then(() => {
				setDrugsNames(
					drugsInitialData.filter(
						(data) => data.name !== drug.getName()
					)
				)
				showNotification('Fármaco eliminado correctamente')
				closeModal()
			})
			.catch((error) => showBoundary(error))
	}

	return (
		<div>
			<Button
				type="button"
				className="w-full"
				backgroundColor="bg-red-500 hover:bg-red-600"
				onClick={openConfirmationNotification}
			>
				<p>Eliminar Fármaco</p>
			</Button>
			{isConfirmationOpen && (
				<ConfirmationNotification
					closeNotification={closeConfirmationNotification}
					onConfirm={handleDeleteDrug}
				>
					¿Está seguro que desea eliminar este fármaco?
				</ConfirmationNotification>
			)}
		</div>
	)
}

export default DeleteDrugButton
