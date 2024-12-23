import React from 'react'
import Button from '../../../../../generic_components/buttons/Button'
import ConfirmationNotification from '../../../../../generic_components/notifications/ConfirmationNotification'
import useConfirmationNotification from '../../../../../generic_components/notifications/custom_hooks/useConfirmationNotification'

type SaveChangesButtonProps = {
	disabled?: boolean
}

const SaveChangesButton: React.FC<SaveChangesButtonProps> = ({ disabled }) => {
	const {
		isConfirmationOpen,
		openConfirmationNotification,
		closeConfirmationNotification,
	} = useConfirmationNotification()

	return (
		<div>
			<Button
				type="button"
				className="w-full"
				disabledBackgroundColor="var(--disabled-button-background-color)"
				onClick={openConfirmationNotification}
				disabled={disabled}
			>
				<p>Guardar</p>
			</Button>
			{isConfirmationOpen && (
				<ConfirmationNotification
					closeNotification={closeConfirmationNotification}
					buttonType="submit"
				>
					¿Está seguro que desea guardar los cambios?
				</ConfirmationNotification>
			)}
		</div>
	)
}

export default SaveChangesButton
