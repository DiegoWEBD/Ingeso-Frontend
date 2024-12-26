import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import apiClient from '../../presentation/utils/axios_interceptor'
import { API_URL } from '../../presentation/utils/utils'
import JSONStudentAdapter from './adapter/JSONStudentAdapter'
import JSONTeacherAdapter from './adapter/JSONTeacherAdapter'

export default class RestApiUserRepository implements UserRepository {
	async getByToken(accessToken: string): Promise<User | null> {
		const headers = {
			Authorization: `Bearer ${accessToken}`,
		}

		const { data } = await apiClient.get('/user', { headers })

		if (!data.user) return null

		return data.role === 'teacher'
			? new JSONTeacherAdapter(data.user)
			: new JSONStudentAdapter(data.user)
	}

	async findByInstitutionalEmail(_: string): Promise<User | null> {
		await apiClient.get(`${API_URL}/`)
		return null
	}
}
