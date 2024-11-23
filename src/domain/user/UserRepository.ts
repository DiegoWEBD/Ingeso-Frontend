import User from './User'

export default interface UserRepository {
	findByInstitutionalEmail: (institutionalEmail: string) => Promise<User | null>
	getByToken: (
		accessToken: string,
		refreshToken: string
	) => Promise<User | null>
}
