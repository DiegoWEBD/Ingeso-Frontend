import Cookies from 'js-cookie'
import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedComponentProps = {
	children: ReactElement
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
	children,
}) => {
	const accessToken = Cookies.get('access_token')

	return accessToken ? children : <Navigate to='/login' replace />
}

export default ProtectedComponent
