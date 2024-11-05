import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { API_URL } from '../../../../utils'
import { PRIMARY_COLOR } from '../../../colors'
import useAppState from '../../../global_states/appState'
import AppTitle from '../../AppTitle'
import LoginButton from './LoginButton'
import User from '../../../../domain/user/User'

const LoginForm: React.FC = () => {
	const { setUser } = useAppState()
	const [_, setError] = useState<string | null>(null)
	const navigate = useNavigate()

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
				//console.log(data.message)
				Cookies.set('access_token', data.access_token, {
					expires: 7,
					secure: true,
					sameSite: 'Lax',
				})
				setUser(new User(data.user.name, data.user.institutional_email))
				navigate('/farmacos')
			})
			.catch((err: Error) => handleError(err.message))
	}

	const handleError = (err: string) => {
		setError(err)
	}

	const login = useGoogleLogin({
		onSuccess: handleSuccess,
		onError: (err: any) => handleError(err.message),
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
