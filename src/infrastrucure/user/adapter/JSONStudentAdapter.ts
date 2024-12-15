import { Student } from '../../../domain/student/Student'
import UserJSON from './UserJSON'

export default class JSONStudentAdapter extends Student {
	constructor(userJSON: UserJSON) {
		super(userJSON.name, userJSON.institutional_email)
	}
}
