import React, { useEffect } from 'react'
import useAppState from '../../../global_states/appState'
import LoginForm from './LoginForm'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const LoginPage: React.FC = () => {
	const { user } = useAppState()
	const navigate = useNavigate()
	const accessToken = Cookies.get('access_token')

	useEffect(() => {
		if (accessToken) navigate('/farmacos')
	}, [user])

	return <LoginForm />
}

export default LoginPage
