import { Download } from 'lucide-react'
import React, { useEffect, useState } from 'react'

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}

type InstallButtonProps = {
	className: string
}

const InstallButton: React.FC<InstallButtonProps> = ({ className }) => {
	const [installPromptEvent, setInstallPromptEvent] =
		useState<BeforeInstallPromptEvent | null>(null)

	useEffect(() => {
		const handler = (e: Event) => {
			e.preventDefault()
			setInstallPromptEvent(e as BeforeInstallPromptEvent)
		}

		window.addEventListener('beforeinstallprompt', handler)

		return () => {
			window.removeEventListener('beforeinstallprompt', handler)
		}
	}, [])

	const handleInstallClick = async () => {
		if (!installPromptEvent) {
			return
		}

		installPromptEvent.prompt()
		const { outcome } = await installPromptEvent.userChoice
		if (outcome === 'accepted') {
			console.log('User accepted the install prompt')
		} else {
			console.log('User dismissed the install prompt')
		}
		setInstallPromptEvent(null)
	}

	return (
		<>
			{installPromptEvent && (
				<button onClick={handleInstallClick} className={className}>
					<Download size={'1.2rem'} />
					Instalar
				</button>
			)}
		</>
	)
}

export default InstallButton
