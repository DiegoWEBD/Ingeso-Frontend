import { createContext, useContext, useState, ReactNode } from 'react'

type NotificationContextType = {
	message: string | null
	isVisible: boolean
	showNotification: (message: string) => void
	hideNotification: () => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(
	undefined
)

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [message, setMessage] = useState<string | null>(null)
	const [isVisible, setIsVisible] = useState(false)

	const showNotification = (message: string) => {
		setMessage(message)
		setIsVisible(true)

		setTimeout(hideNotification, 4000)
	}

	const hideNotification = () => {
		setMessage(null)
		setIsVisible(false)
	}

	return (
		<NotificationContext.Provider
			value={{ message, isVisible, showNotification, hideNotification }}
		>
			{children}
		</NotificationContext.Provider>
	)
}

export const useNotification = (): NotificationContextType => {
	const context = useContext(NotificationContext)
	if (!context) {
		throw new Error(
			'useNotification debe ser utilizado con un NotificationProvider'
		)
	}
	return context
}
