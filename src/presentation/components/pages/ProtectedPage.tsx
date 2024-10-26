import React, { ReactElement } from 'react'
import useAppState from '../../global_states/appState'
import { Navigate } from 'react-router-dom'

type ProtectedPageProps = {
	children: ReactElement
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
	const user = useAppState((state) => state.user)

	return user !== null ? children : <Navigate to='/login' replace />
}

export default ProtectedPage
