import User from '../../../domain/user/User'
import UserJSON from './UserJSON'

export default class JSONUserAdapter extends User {
	constructor(userJSON: UserJSON) {
		super(userJSON.name, userJSON.institutional_email)
	}
}
