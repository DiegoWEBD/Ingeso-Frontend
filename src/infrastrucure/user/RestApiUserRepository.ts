import axios from 'axios'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import { API_URL } from '../../utils'

export default class RestApiUserRepository implements UserRepository {
	async findByInstitutionalEmail(_: string): Promise<User | null> {
		await axios.get(`${API_URL}/`)
		return null
	}
}
