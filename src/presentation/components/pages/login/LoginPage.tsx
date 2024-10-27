import React from 'react'
import { Navigate } from 'react-router-dom'
import useAppState from '../../../global_states/appState'
import LoginForm from './LoginForm'

const LoginPage: React.FC = () => {
	const { user } = useAppState()

	return user !== null ? <Navigate to='/farmacos' replace /> : <LoginForm />
}

export default LoginPage
