import { create } from 'zustand'
import DrugRepository from '../../domain/drug/DrugRepository'
import RestApiDrugRepository from '../../infrastrucure/drug/RestApiDrugRepository'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import RestApiUserRepository from '../../infrastrucure/user/RestApiUserRepository'
import Cookies from 'js-cookie'

type AppState = {
	user: User | null
	drugsNames: Array<string>
	drugRepository: DrugRepository
	userRepository: UserRepository
	loadingInitialData: boolean
	loadInitialData: () => Promise<void>
	setUser: (user: User) => void
	setDrugsNames: (drugsNames: string[]) => void
}

const useAppState = create<AppState>((set) => {
	const drugRepository: DrugRepository = new RestApiDrugRepository()
	const userRepository: UserRepository = new RestApiUserRepository()

	return {
		user: null,
		drugsNames: [],
		loadingInitialData: false,
		drugRepository,
		userRepository,

		loadInitialData: async () => {
			const accessToken = Cookies.get('access_token')
			if (!accessToken) return

			set({ loadingInitialData: true })

			const user = await userRepository.getByAccessToken(accessToken)
			const drugsNames: Array<string> = await drugRepository.getAllNames()

			set({ drugsNames, user, loadingInitialData: false })
		},

		setUser: (user: User) => {
			set({ user })
		},

		setDrugsNames: (drugsNames: string[]) => {
			set({ drugsNames })
		},
	}
})

export default useAppState
