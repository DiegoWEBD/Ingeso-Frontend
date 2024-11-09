import User from '../../../domain/user/User'

export default class UserAdapter {
	private constructor() {}

	static FromRestApi(user: any): User {
		return new User(user.name, user.institutional_email)
	}
}
