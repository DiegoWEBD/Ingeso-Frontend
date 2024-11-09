import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import UserAdapter from '../../../../infrastrucure/user/adapter/UserAdapter'
import { API_URL } from '../../../../utils'
import { PRIMARY_COLOR } from '../../../colors'
import useAppState from '../../../global_states/appState'
import AppTitle from '../../AppTitle'
import LoginButton from './LoginButton'
import { useErrorBoundary } from 'react-error-boundary'

const LoginForm: React.FC = () => {
	const { setUser } = useAppState()
	const [_, setError] = useState<string | null>(null)
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
				Cookies.set('access_token', data.access_token, {
					expires: 7,
					secure: true,
					sameSite: 'Lax',
				})
				setUser(UserAdapter.FromRestApi(data.user))
				navigate('/farmacos')
			})
			.catch((error: Error) => {
				handleError(error)
			})
	}

	const handleError = (err: any) => {
		showBoundary(err)
	}

	const login = useGoogleLogin({
		onSuccess: handleSuccess,
		onError: (err: any) => handleError(err),
		scope: 'email profile',
	})

	return (
		<div className='h-full flex justify-center items-center'>
			<div className='p-7 text-center bg-white sm:w-[25rem] h-fit flex flex-col items-center gap-5 shadow-md'>
				<img src='logo_ucn.png' className='w-[9rem]' />
				<AppTitle style={{ color: PRIMARY_COLOR }} />
				<LoginButton onClick={() => login()}>Acceso Docentes</LoginButton>
				<LoginButton onClick={() => login()}>Acceso Estudiantes</LoginButton>
			</div>
		</div>
	)
}

export default LoginForm
