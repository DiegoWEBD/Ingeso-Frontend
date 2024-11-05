import axios from 'axios'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import { API_URL } from '../../utils'

export default class RestApiUserRepository implements UserRepository {
	async getByAccessToken(accessToken: string): Promise<User | null> {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		}
		const { data } = await axios.get(`${API_URL}/user`, { headers })
		console.log(data.user)

		return data.user
			? new User(data.user.name, data.user.institutionalEmail)
			: null
	}

	async findByInstitutionalEmail(_: string): Promise<User | null> {
		await axios.get(`${API_URL}/`)
		return null
	}
}
