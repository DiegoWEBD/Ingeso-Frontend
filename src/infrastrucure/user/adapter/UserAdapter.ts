import { Student } from '../../../domain/student/Student'
import Teacher from '../../../domain/teacher/Teacher'
import User from '../../../domain/user/User'

export default class UserAdapter {
	private constructor() {}

	static FromRestApi(user: any): User {
		if (user.role === 'teacher')
			return new Teacher(user.name, user.institutional_email)

		return new Student(user.name, user.institutional_email)
	}
}
