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
		<div className='flex flex-col gap-8 items-center'>
			<div className='flex flex-col xl:flex-row gap-x-10 gap-y-7'>
				<div className='bg-white shadow-md flex flex-col gap-3 sm:w-[25rem] rounded-md p-5 break-words'>
					<p className='text-xl font-bold text-primary-intense pb-3'>
						Información Personal
					</p>
					<div className='flex flex-col gap-1'>
						<p className='text-primary font-semibold'>Nombre Completo</p>
						<UserDataItem item={user?.getName()} />
					</div>
					<div className='flex flex-col gap-1'>
						<p className='text-primary font-semibold'>Correo Institucional</p>
						<UserDataItem item={user?.getInstitutionalEmail()} />
					</div>
					<div className='flex flex-col gap-1'>
						<p className='text-primary font-semibold'>Rol</p>
						<UserDataItem
							item={
								user
									? user instanceof Teacher
										? 'Profesor'
										: 'Estudiante'
									: undefined
							}
						/>
					</div>
				</div>

				<ThemeSwitcher />
			</div>

			<LogOutButton />
		</div>
	)
}

export default ProfilePage
