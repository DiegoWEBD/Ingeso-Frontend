import { CheckCircle } from 'lucide-react'
import React from 'react'
import { useNotification } from './contexts/InformativeNotificationContext'
import { motion, AnimatePresence } from 'framer-motion'

const InformativeNotification: React.FC = () => {
	const { message, isVisible } = useNotification()

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0, scale: 0.2 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={{ opacity: 0, scale: 0.2 }}
					className="fixed bottom-4 right-4 bg-green-500 rounded-lg p-3 shadow-lg w-fit text-white flex gap-5 items-center z-10"
				>
					<CheckCircle />
					<p>{message}</p>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default InformativeNotification
