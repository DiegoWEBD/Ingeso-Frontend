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
					className="fixed bottom-4 right-4 bg-green-500 rounded-lg p-2 shadow-lg w-fit max-w-xs text-white flex gap-3 items-center z-10"
				>
					<CheckCircle size={20} />
					<p className="text-sm">{message}</p>
				</motion.div>
			)}
		</AnimatePresence>
	)
}

export default InformativeNotification
