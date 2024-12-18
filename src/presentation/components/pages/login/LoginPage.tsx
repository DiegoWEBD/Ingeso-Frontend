import React from 'react'
import { Navigate } from 'react-router-dom'
import LoginForm from './LoginForm'

const LoginPage: React.FC = () => {
	const accessToken = localStorage.getItem('access_token')

	return !accessToken ? <LoginForm /> : <Navigate to="/farmacos" replace />
}

export default LoginPage
