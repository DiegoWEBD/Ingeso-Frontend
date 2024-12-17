import { useState } from 'react'

type AfterCloseNotification = () => void

const useInformativeNotification = (
	afterCloseNotification?: AfterCloseNotification
) => {
	const [isNotificationOpen, setIsNotificationOpen] = useState<boolean>(false)

	const showNotification = () => {
		setIsNotificationOpen(true)
		setTimeout(() => {
			setIsNotificationOpen(false)
			if (afterCloseNotification) afterCloseNotification()
		}, 4000)
	}

	return {
		isNotificationOpen,
		showNotification,
	}
}

export default useInformativeNotification
