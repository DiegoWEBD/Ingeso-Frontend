import axios from 'axios'
import Cookies from 'js-cookie'
import User from '../../../domain/user/User'
import JSONStudentAdapter from '../../../infrastrucure/user/adapter/JSONStudentAdapter'
import JSONTeacherAdapter from '../../../infrastrucure/user/adapter/JSONTeacherAdapter'
import { API_URL } from '../../../utils'

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

		return role === 'teacher'
			? new JSONTeacherAdapter(data.user)
			: new JSONStudentAdapter(data.user)
	}

	return login
}
