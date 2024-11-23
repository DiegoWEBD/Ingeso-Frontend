import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'
import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorBoundary } from 'react-error-boundary'
import UserAdapter from '../../../../infrastrucure/user/adapter/UserAdapter'
import { API_URL } from '../../../../utils'
import useAppState from '../../../global_states/appState'
import AppTitle from '../../AppTitle'
import LoginButton from './LoginButton'

const LoginForm: React.FC = () => {
	const { setUser } = useAppState()

	const navigate = useNavigate()
	const { showBoundary } = useErrorBoundary()

	const handleSuccess = (
		response: Omit<TokenResponse, 'err' | 'error_description' | 'error_uri'>
	) => {
		axios
			.post(`${API_URL}/auth`, {
				google_access_token: response.access_token,
				token_type: response.token_type,
			})
			.then((res) => res.data)
			.then((data) => {
				console.log(data)
				Cookies.set('access_token', data.access_token, {
					expires: 1,
					secure: true,
					sameSite: 'Lax',
				})

				Cookies.set('refresh_token', data.refresh_token, {
					expires: 28,
					secure: true,
					sameSite: 'Lax',
				})

				setUser(UserAdapter.FromRestApi(data.user))
				navigate('/farmacos')
			})
			.catch((error: AxiosError) => {
				console.log(error)
				handleError(error.response?.data)
			})
	}

	const handleError = (error: any) => {
		showBoundary(error)
	}

	const login = useGoogleLogin({
		onSuccess: handleSuccess,
		onError: (error: any) => handleError(error),
		scope: 'email profile',
	})

	return (
		<div className='h-full flex justify-center items-center'>
			<div className='rounded-md p-7 text-center bg-card text-primary sm:w-[25rem] h-fit flex flex-col items-center gap-5 shadow-md'>
				<img src='logo_ucn.png' className='w-[9rem]' />
				<AppTitle className='text-primary' />
				<LoginButton onClick={() => login()}>Acceso Docentes</LoginButton>
				<LoginButton onClick={() => login()}>Acceso Estudiantes</LoginButton>
			</div>
		</div>
	)
}

export default LoginForm
