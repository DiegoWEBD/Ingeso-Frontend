import React, { useState } from 'react'
import axios from 'axios'
import Teacher from '../../../../domain/teacher/Teacher'
import User from '../../../../domain/user/User'
import useAppState from '../../../global_states/appState'
import LogOutButton from './LogOutButton'
import UserDataItem from './UserDataItem'
import ThemeSwitcher from './ThemeSwitcher'

import { API_URL } from '../../../utils/utils'

const ProfilePage: React.FC = () => {
	const user: User | null = useAppState((state) => state.user)
	const [teacherEmail, setTeacherEmail] = useState('')
	const [message, setMessage] = useState('')
	const [showConfirmation, setShowConfirmation] = useState(false)

	const handleAddTeacher = async () => {
		try {
			const accessToken = localStorage.getItem('access_token')
			const response = await axios.post(
				`${API_URL}/allowed_teacher/allowed`,
				{
					teacherEmail,
				},
				{
					headers: { Authorization: `Bearer ${accessToken}` },
				}
			)
			setMessage(response.data.message)
			setShowConfirmation(false)
		} catch (error) {
			console.log('Error al agregar el correo:', error)
			if (
				axios.isAxiosError(error) &&
				error.response &&
				error.response.status === 409
			) {
				setMessage('El correo ya posee permisos. ¿Desea eliminar el permiso?')
				setShowConfirmation(true)
			} else {
				setMessage('Error al agregar el correo.')
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
			setMessage(response.data.message)
			setShowConfirmation(false)
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
		<div className="flex flex-col gap-16 items-center justify-center lg:h-full pb-10 lg:pb-0">
			<div className="flex flex-col gap-x-16 gap-y-7 items-center">
				<div className="bg-white shadow-md flex flex-col gap-3 sm:w-[25rem] rounded-md p-5 break-words bg-card">
					<p className="text-xl font-bold text-primary-intense pb-3">
						Información Personal
					</p>
					<div className="flex flex-col gap-1">
						<p className="text-primary font-semibold">Nombre Completo</p>
						<UserDataItem item={user?.getName()} />
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-primary font-semibold">Correo Institucional</p>
						<UserDataItem item={user?.getInstitutionalEmail()} />
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-primary font-semibold">Rol</p>
						<UserDataItem
							item={user instanceof Teacher ? 'Profesor' : 'Estudiante'}
						/>
					</div>
				</div>
				<div className="bg-white shadow-md flex flex-col gap-3 sm:w-[25rem] rounded-md p-5 break-words bg-card">
					<p className="text-xl font-bold text-primary-intense pb-3">
						Permitir acceso de docente
					</p>
					<div className="flex flex-col gap-1">
						<label className="text-primary font-semibold">
							Correo del docente
						</label>
						<input
							type="email"
							value={teacherEmail}
							onChange={(e) => setTeacherEmail(e.target.value)}
							className="border rounded-md px-2 py-1"
						/>
						<button
							onClick={handleAddTeacher}
							className="bg-primary text-white rounded-md px-4 py-2 mt-2"
						>
							Permitir acceso
						</button>
					</div>
					{message && <p className="text-red-500 mt-2">{message}</p>}
					{showConfirmation && (
						<div className="flex gap-2 mt-2">
							<button
								onClick={handleRemoveTeacher}
								className="bg-red-500 text-white rounded-md px-4 py-2"
							>
								Eliminar permiso
							</button>
							<button
								onClick={handleKeepPermission}
								className="bg-gray-500 text-white rounded-md px-4 py-2"
							>
								Mantener permiso
							</button>
						</div>
					)}
				</div>
				<div className="flex flex-col lg:w-auto lg:flex-grow">
					<ThemeSwitcher />
				</div>
			</div>

			<LogOutButton />
		</div>
	)
}

export default ProfilePage
