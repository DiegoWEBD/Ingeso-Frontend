import Cookies from 'js-cookie'
import React, { ReactElement } from 'react'
import { Navigate } from 'react-router-dom'

type ProtectedRouteProps = {
	children: ReactElement
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const accessToken = Cookies.get('access_token')

	return accessToken ? children : <Navigate to="/login" replace />
}

export default ProtectedRoute
