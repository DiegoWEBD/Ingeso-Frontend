import Teacher from '../../../domain/teacher/Teacher'
import UserJSON from './UserJSON'

export default class JSONTeacherAdapter extends Teacher {
	constructor(userJSON: UserJSON) {
		super(userJSON.name, userJSON.institutional_email)
	}
}
