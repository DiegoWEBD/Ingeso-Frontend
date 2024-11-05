import React from 'react'

import useAppState from '../../../global_states/appState'
import LogOutButton from './LogOutButton'
import Teacher from '../../../../domain/teacher/Teacher'
import User from '../../../../domain/user/User'

const ProfilePage: React.FC = () => {
	const user: User | null = useAppState((state) => state.user)

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-col gap-3 border border-gray-300 w-[25rem] rounded-md p-5'>
				<p className='text-xl font-bold'>Información Personal</p>
				<div className='flex flex-col gap-1'>
					<p>Nombre Completo</p>
					<p className='border rounded-md py-1 px-2 text-sm text-gray-500'>
						{user?.getName()}
					</p>
				</div>
				<div className='flex flex-col gap-1'>
					<p>Correo Institucional</p>
					<p className='border rounded-md py-1 px-2 text-sm text-gray-500'>
						{user?.getInstitutionalEmail()}
					</p>
				</div>
				<div className='flex flex-col gap-1'>
					<p>Rol</p>
					{user && (
						<p className='border rounded-md py-1 px-2 text-sm text-gray-500'>
							{user instanceof Teacher ? 'Profesor' : 'Estudiante'}
						</p>
					)}
				</div>
			</div>

			<LogOutButton />
		</div>
	)
}

export default ProfilePage
