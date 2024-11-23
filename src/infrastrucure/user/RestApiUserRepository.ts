import axios from 'axios'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import { API_URL } from '../../utils'
import UserAdapter from './adapter/UserAdapter'

export default class RestApiUserRepository implements UserRepository {
	async getByToken(
		accessToken: string,
		refreshToken: string
	): Promise<User | null> {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		}

		let isValid: boolean
		let data: any = null

		try {
			const response = await axios.get(`${API_URL}/user`, { headers })
			data = response.data
			isValid = true
		} catch (error) {
			isValid = false
		}

		if (!isValid) {
			headers.Authorization = `Bearer ${refreshToken}`
			await axios.get(`${API_URL}/refresh`, { headers })
		}

		//const { data } = await axios.get(`${API_URL}/user`, { headers })

		return data.user ? UserAdapter.FromRestApi(data.user) : null
	}

	async findByInstitutionalEmail(_: string): Promise<User | null> {
		await axios.get(`${API_URL}/`)
		return null
	}
}
