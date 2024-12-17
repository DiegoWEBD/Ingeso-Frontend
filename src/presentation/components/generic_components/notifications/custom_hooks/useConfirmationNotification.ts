import { useState } from 'react'

const useConfirmationNotification = () => {
	const [isConfirmationOpen, setIsConfirmationOpen] = useState<boolean>(false)

	const openConfirmationNotification = () => {
		setIsConfirmationOpen(true)
	}

	const closeConfirmationNotification = () => {
		setIsConfirmationOpen(false)
	}

	return {
		isConfirmationOpen,
		openConfirmationNotification,
		closeConfirmationNotification,
	}
}

export default useConfirmationNotification
