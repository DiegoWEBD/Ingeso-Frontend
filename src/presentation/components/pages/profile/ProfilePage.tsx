import React, { useEffect } from 'react'
import User from '../../../../domain/user/User'
import useAppState from '../../../global_states/appState'
import LogOutButton from './LogOutButton'

const ProfilePage: React.FC = () => {
	const user: User | null = useAppState((state) => state.user)

	useEffect(() => {
		console.log(user)
	}, [user])

	return (
		<div>
			<LogOutButton />
		</div>
	)
}

export default ProfilePage
