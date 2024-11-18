import React from 'react'

import Teacher from '../../../../domain/teacher/Teacher'
import User from '../../../../domain/user/User'
import useAppState from '../../../global_states/appState'
import LogOutButton from './LogOutButton'
import UserDataItem from './UserDataItem'

const ProfilePage: React.FC = () => {
	const user: User | null = useAppState((state) => state.user)

	return (
		<div className='flex flex-col gap-8 items-center'>
			<div className='bg-white shadow-md flex flex-col gap-3 sm:w-[25rem] rounded-md p-5 break-words'>
				<p className='text-xl font-bold'>Información Personal</p>
				<div className='flex flex-col gap-1'>
					<p>Nombre Completo</p>
					<UserDataItem item={user?.getName()} />
				</div>
				<div className='flex flex-col gap-1'>
					<p>Correo Institucional</p>
					<UserDataItem item={user?.getInstitutionalEmail()} />
				</div>
				<div className='flex flex-col gap-1'>
					<p>Rol</p>
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

			<LogOutButton />
		</div>
	)
}

export default ProfilePage
