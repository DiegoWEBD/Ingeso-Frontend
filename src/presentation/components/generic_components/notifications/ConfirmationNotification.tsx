import React, { ReactNode } from 'react'
import ModalContainer from '../../containers/ModalContainer'
import Button from '../buttons/Button'

type ConfirmationNotificationProps = {
	children: ReactNode
	onConfirm: () => void
	closeNotification: () => void
}

const ConfirmationNotification: React.FC<ConfirmationNotificationProps> = ({
	children,
	onConfirm,
	closeNotification,
}) => {
	return (
		<ModalContainer>
			<div className="bg-card rounded-lg py-6 px-3 shadow-lg sm:max-w-[27rem] w-full">
				<p className="text-lg font-semibold mb-5 text-center">
					{children}
				</p>
				<div className="flex justify-around ">
					<Button
						onClick={() => {
							onConfirm()
							closeNotification()
						}}
					>
						Confirmar
					</Button>
					<Button
						onClick={() => closeNotification()}
						backgroundColor="bg-red-500 hover:bg-red-600"
					>
						Cancelar
					</Button>
				</div>
			</div>
		</ModalContainer>
	)
}

export default ConfirmationNotification
