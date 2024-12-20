import React from 'react'

import Teacher from '../../../../domain/teacher/Teacher'
import User from '../../../../domain/user/User'
import useAppState from '../../../global_states/appState'
import LogOutButton from './LogOutButton'
import UserDataItem from './UserDataItem'
import ThemeSwitcher from './ThemeSwitcher'

const ProfilePage: React.FC = () => {
	const user: User | null = useAppState((state) => state.user)

	return (
		<div className="flex flex-col gap-16 items-center justify-center lg:h-full">
			<div className="flex flex-col gap-x-16 gap-y-7 items-center">
				<div className="bg-white shadow-md flex flex-col gap-3 sm:w-[25rem] rounded-md p-5 break-words bg-card">
					<p className="text-xl font-bold text-primary-intense pb-3">
						Información Personal
					</p>
					<div className="flex flex-col gap-1">
						<p className="text-primary font-semibold">
							Nombre Completo
						</p>
						<UserDataItem item={user?.getName()} />
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-primary font-semibold">
							Correo Institucional
						</p>
						<UserDataItem item={user?.getInstitutionalEmail()} />
					</div>
					<div className="flex flex-col gap-1">
						<p className="text-primary font-semibold">Rol</p>
						<UserDataItem
							item={
								user instanceof Teacher
									? 'Profesor'
									: 'Estudiante'
							}
						/>
					</div>
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
