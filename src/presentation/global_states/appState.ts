import { create } from 'zustand'
import DrugRepository from '../../domain/drug/DrugRepository'
import RestApiDrugRepository from '../../infrastrucure/drug/RestApiDrugRepository'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import RestApiUserRepository from '../../infrastrucure/user/RestApiUserRepository'
import Cookies from 'js-cookie'

type AppState = {
	setDrugsNames: (drugsNames: string[]) => void
	user: User | null
	drugsNames: Array<string>
	drugRepository: DrugRepository
	userRepository: UserRepository
	loadInitialData: () => Promise<void>
	setUser: (user: User) => void
}

const useAppState = create<AppState>((set) => {
	const drugRepository: DrugRepository = new RestApiDrugRepository()
	const userRepository: UserRepository = new RestApiUserRepository()

	return {
		user: null,
		drugsNames: [],
		drugRepository,
		userRepository,

		loadInitialData: async () => {
			const accessToken = Cookies.get('access_token')
			if (!accessToken) return

			const user = await userRepository.getByAccessToken(accessToken)
			const drugsNames: Array<string> = await drugRepository.getAllNames()

			set({ drugsNames, user })
		},

		setUser: (user: User) => {
			set({ user })
		},

		setDrugsNames: (drugsNames: string[]) => {
			set({ drugsNames})
		},
	}
})

export default useAppState
