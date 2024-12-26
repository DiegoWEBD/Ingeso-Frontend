import React, { useState } from 'react'
import axios from 'axios'
import Teacher from '../../../../domain/teacher/Teacher'
import User from '../../../../domain/user/User'
import useAppState from '../../../global_states/appState'
import LogOutButton from './LogOutButton'
import UserDataItem from './UserDataItem'
import ThemeSwitcher from './theme_switcher/ThemeSwitcher'

import { API_URL } from '../../../utils/utils'
import useConfirmationNotification from '../../generic_components/notifications/custom_hooks/useConfirmationNotification'
import ConfirmationNotification from '../../generic_components/notifications/ConfirmationNotification'
import { useNotification } from '../../generic_components/notifications/contexts/InformativeNotificationContext'
import { useErrorBoundary } from 'react-error-boundary'
import AdminComponent from '../../protected/AdminComponent'

const ProfilePage: React.FC = () => {
	const user: User | null = useAppState((state) => state.user)
	const [teacherEmail, setTeacherEmail] = useState('')
	const [message, setMessage] = useState<string | null>('')

	const [showConfirmation, setShowConfirmation] = useState(false)
	const { showNotification } = useNotification()
	const { showBoundary } = useErrorBoundary()

	const {
		isConfirmationOpen,
		openConfirmationNotification,
		closeConfirmationNotification,
	} = useConfirmationNotification()

	const handleAddTeacher = async () => {
		try {
			const accessToken = localStorage.getItem('access_token')
			const response = await axios.post(
				`${API_URL}/allowed_teacher/allowed`,
				{ teacherEmail },
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			)
			showNotification(response.data.message)
			setShowConfirmation(false)
			setTeacherEmail('')
		} catch (error) {
			if (axios.isAxiosError(error) && error.response?.status === 409) {
				setMessage(
					'El correo ya posee permisos. ¿Desea eliminar el permiso?'
				)
				setShowConfirmation(true)
			} else {
				showBoundary(error)
			}
		}
	}

	const handleRemoveTeacher = async () => {
		try {
			const accessToken = localStorage.getItem('access_token')
			const response = await axios.delete(
				`${API_URL}/allowed_teacher/allowed/${teacherEmail}`,
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			)
			showNotification(response.data.message)
			setShowConfirmation(false)
			setMessage(null)
			setTeacherEmail('')
		} catch (error) {
			setMessage('Error al eliminar el permiso.')
		}
	}

	const handleKeepPermission = () => {
		setMessage('')
		setShowConfirmation(false)
		setTeacherEmail('')
	}

	return (
		<div className="flex flex-col gap-16 bg-secondary h-full">
			<h1 className="text-3xl font-bold text-secondary text-start">
				Perfil de Usuario
			</h1>
			<div className="flex flex-col items-center justify-center gap-3 xl:gap-12">
				<div className="flex flex-wrap justify-around gap-8 w-full">
					{/* Personal Info Card */}
					<div className="w-full sm:w-[28rem] bg-card shadow-md rounded-lg p-6 flex flex-col gap-6">
						<h2 className="text-2xl font-semibold text-primary-intense">
							Información Personal
						</h2>
						<div>
							<p className="text-sm text-primary font-semibold">
								Nombre Completo
							</p>
							<UserDataItem item={user?.getName()} />
						</div>
						<div>
							<p className="text-sm text-primary font-semibold">
								Correo Institucional
							</p>
							<UserDataItem
								item={user?.getInstitutionalEmail()}
							/>
						</div>
						<div>
							<p className="text-sm text-primary font-semibold">
								Rol
							</p>
							<UserDataItem
								item={
									user instanceof Teacher
										? 'Profesor'
										: 'Estudiante'
								}
							/>
						</div>
					</div>

					<AdminComponent>
						<div className="w-full sm:w-[28rem] bg-card shadow-md rounded-lg p-6 flex flex-col gap-4">
							<h2 className="text-2xl font-semibold text-primary-intense">
								Permitir Acceso de Docente
							</h2>
							<div>
								<label className="text-sm text-primary font-semibold">
									Correo del Docente
								</label>
								<input
									type="email"
									value={teacherEmail}
									onChange={(e) =>
										setTeacherEmail(e.target.value)
									}
									className="w-full border rounded-md px-3 py-2 mt-1"
								/>
							</div>
							<button
								onClick={openConfirmationNotification}
								className="bg-primary text-white rounded-md px-4 py-2 mt-3"
							>
								Permitir Acceso
							</button>
							{message && (
								<p className="text-red-500 mt-3">{message}</p>
							)}
							{showConfirmation && (
								<div className="flex gap-4 mt-4">
									<button
										onClick={handleRemoveTeacher}
										className="bg-red-500 text-white rounded-md px-4 py-2"
									>
										Eliminar Permiso
									</button>
									<button
										onClick={handleKeepPermission}
										className="bg-gray-500 text-white rounded-md px-4 py-2"
									>
										Mantener Permiso
									</button>
								</div>
							)}
						</div>
					</AdminComponent>
				</div>

				<div className="w-full max-w-md mt-6 flex justify-center">
					<ThemeSwitcher />
				</div>

				{isConfirmationOpen && (
					<ConfirmationNotification
						closeNotification={closeConfirmationNotification}
						onConfirm={handleAddTeacher}
					>
						¿Está seguro que desea permitir el acceso a este
						docente?
					</ConfirmationNotification>
				)}

				<div className="mt-10 pb-12">
					<LogOutButton />
				</div>
			</div>
		</div>
	)
}

export default ProfilePage
