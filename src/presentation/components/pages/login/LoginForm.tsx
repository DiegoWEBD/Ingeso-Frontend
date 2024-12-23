import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import { AxiosError } from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useErrorBoundary } from 'react-error-boundary'
import useAppState from '../../../global_states/appState'
import AppTitle from '../../AppTitle'
import LoginButton from './LoginButton'
import { useAuthService } from '../../../custom_hooks/useAuthService'

const LoginForm: React.FC = () => {
	const { setUser } = useAppState()
	const [role, setRole] = useState<string>('')
	const apiLogin = useAuthService()

	const navigate = useNavigate()
	const { showBoundary } = useErrorBoundary()

	const handleSuccess = (
		response: Omit<TokenResponse, 'err' | 'error_description' | 'error_uri'>
	) => {
		apiLogin(response.access_token, response.token_type, role)
			.then((user) => {
				setUser(user)
				navigate('/farmacos')
			})
			.catch((error: AxiosError) => {
				handleError(error.response?.data)
			})
	}

	const handleError = (error: any) => {
		showBoundary(error)
	}

	const googleLogin = useGoogleLogin({
		onSuccess: handleSuccess,
		onError: (error: any) => handleError(error),
		scope: 'email profile',
	})

	return (
		<div className="h-full flex justify-center items-center">
			<div className="rounded-md p-7 text-center bg-card text-primary sm:w-[25rem] h-fit flex flex-col items-center gap-5 shadow-md">
				<img src="logo_ucn.png" className="w-[9rem]" />
				<AppTitle className="text-primary" />
				<LoginButton
					onClick={() => {
						setRole('teacher')
						googleLogin()
					}}
				>
					Acceso Docentes
				</LoginButton>
				<LoginButton
					onClick={() => {
						setRole('student')
						googleLogin()
					}}
				>
					Acceso Estudiantes
				</LoginButton>
			</div>
		</div>
	)
}

export default LoginForm
