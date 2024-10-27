import React, { useEffect } from 'react'
import useAppState from '../../../global_states/appState'
import LoginForm from './LoginForm'
import { useNavigate } from 'react-router-dom'

const LoginPage: React.FC = () => {
	const { user } = useAppState()
	const navigate = useNavigate()

	useEffect(() => {
		if (user) navigate('/farmacos')
	}, [user])

	return <LoginForm />
}

export default LoginPage
