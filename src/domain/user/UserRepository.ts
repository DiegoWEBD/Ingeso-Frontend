import User from './User'

export default interface UserRepository {
	findByInstitutionalEmail: (institutionalEmail: string) => Promise<User | null>
	getByAccessToken: (accessToken: string) => Promise<User | null>
}
