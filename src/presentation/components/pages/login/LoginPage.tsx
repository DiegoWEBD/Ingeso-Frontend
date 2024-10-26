import { TokenResponse, useGoogleLogin } from '@react-oauth/google'
import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../../../../utils'
import User from '../../../../domain/user/User'

const LoginPage: React.FC = () => {
	const [error, setError] = useState<string | null>(null)

	const handleSuccess = (
		response: Omit<TokenResponse, 'err' | 'error_description' | 'error_uri'>
	) => {
		console.log(response)
		axios
			.post(`${API_URL}/auth`, {
				google_access_token: response.access_token,
				token_type: response.token_type,
			})
			.then((res) => res.data)
			.then((data) => {
				console.log(data.message)
				console.log(data.access_token)
				const user = new User(data.user.name, data.user.institutional_email)
				console.log(user)
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

	return <button onClick={() => login()}>Accesso estudiantes</button>
}

export default LoginPage
