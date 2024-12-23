import axios from 'axios'
import AuthService from '../../application/auth/AuthService'
import { API_URL } from '../../presentation/utils/utils'

export default class RestApiAuthService implements AuthService {
	async refresh(refreshToken: string): Promise<string> {
		const headers = {
			Authorization: `Bearer ${refreshToken}`,
		}

		const { data } = await axios.get(`${API_URL}/refresh`, { headers })
		console.log('access token refreshed.')

		return data.access_token
	}
}
