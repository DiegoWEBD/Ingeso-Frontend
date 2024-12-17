import { CheckCircle } from 'lucide-react'
import React from 'react'
import { useNotification } from './contexts/InformativeNotificationContext'

const InformativeNotification: React.FC = () => {
	const { message, isVisible } = useNotification()

	if (!isVisible) return null

	return (
		<div className="absolute bottom-2 right-2 bg-green-500 rounded-lg p-3 shadow-lg w-fit text-white flex gap-5 items-center">
			<CheckCircle />
			<p>{message}</p>
		</div>
	)
}

export default InformativeNotification
