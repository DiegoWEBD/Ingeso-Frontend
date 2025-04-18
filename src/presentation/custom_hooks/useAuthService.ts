import axios from 'axios'
import User from '../../domain/user/User'
import JSONStudentAdapter from '../../infrastrucure/user/adapter/JSONStudentAdapter'
import JSONTeacherAdapter from '../../infrastrucure/user/adapter/JSONTeacherAdapter'
import { API_URL } from '../utils/utils'

export const useAuthService = () => {
	const login = async (
		googleAccessToken: string,
		tokenType: string,
		role: string
	): Promise<User> => {
		const { data } = await axios.post(`${API_URL}/auth`, {
			google_access_token: googleAccessToken,
			token_type: tokenType,
			role,
		})

		localStorage.setItem('access_token', data.access_token)
		localStorage.setItem('refresh_token', data.refresh_token)

		return role === 'teacher'
			? new JSONTeacherAdapter(data.user)
			: new JSONStudentAdapter(data.user)
	}

	return login
}
