import { CheckCircle } from 'lucide-react'
import React, { ReactNode } from 'react'

type InformativeNotificationProps = {
	children: ReactNode
}

const InformativeNotification: React.FC<InformativeNotificationProps> = ({
	children,
}) => {
	return (
		<div className="absolute bottom-2 right-2 bg-green-500 rounded-lg p-3 shadow-lg w-fit text-white flex gap-5 items-center">
			<CheckCircle />
			<p className="text">{children}</p>
		</div>
	)
}

export default InformativeNotification
