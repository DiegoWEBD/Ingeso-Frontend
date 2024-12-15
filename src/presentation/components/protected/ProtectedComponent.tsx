import React, { ReactNode } from 'react'
import useAppState from '../../global_states/appState'

type ProtectedComponentProps = {
	children: ReactNode
}

const ProtectedComponent: React.FC<ProtectedComponentProps> = ({
	children,
}) => {
	const isTeacher = useAppState((state) => state.isTeacher)

	if (!isTeacher()) return null

	return children
}

export default ProtectedComponent
