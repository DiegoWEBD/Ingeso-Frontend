import React, { ReactNode } from 'react'
import useAppState from '../../global_states/appState'
import { ENV_VARIABLES } from '../../utils/env_variables'

type AdminComponentProps = {
	children: ReactNode
}

const AdminComponent: React.FC<AdminComponentProps> = ({ children }) => {
	const { user } = useAppState()

	return user?.getInstitutionalEmail() === ENV_VARIABLES.ADMIN_EMAIL
		? children
		: null
}

export default AdminComponent
