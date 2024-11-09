import axios from 'axios'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import { API_URL } from '../../utils'
import UserAdapter from './adapter/UserAdapter'

export default class RestApiUserRepository implements UserRepository {
	async getByAccessToken(accessToken: string): Promise<User | null> {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		}
		const { data } = await axios.get(`${API_URL}/user`, { headers })

		return data.user ? UserAdapter.FromRestApi(data.user) : null
	}

	async findByInstitutionalEmail(_: string): Promise<User | null> {
		await axios.get(`${API_URL}/`)
		return null
	}
}
