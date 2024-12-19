import React, { ReactNode } from 'react'
import useAppState from '../../global_states/appState'

type StudentComponentProps = {
	children: ReactNode
}

const StudentComponent: React.FC<StudentComponentProps> = ({ children }) => {
	const isTeacher = useAppState((state) => state.isTeacher)

	if (isTeacher()) return null

	return children
}

export default StudentComponent
