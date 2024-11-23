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
	setTheme: (themeId: string) => void
	isAppInstaled: () => boolean
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
			const refreshToken = Cookies.get('refresh_token')
			if (!accessToken || !refreshToken) return

			set({ loadingInitialData: true })

			const user = await userRepository.getByToken(accessToken, refreshToken)
			const drugsNames: Array<string> = await drugRepository.getAllNames()

			set({ drugsNames, user, loadingInitialData: false })
		},

		setUser: (user: User) => {
			set({ user })
		},

		setDrugsNames: (drugsNames: string[]) => {
			set({ drugsNames })
		},

		setTheme: (themeId: string) => {
			document.querySelector('body')?.setAttribute('data-theme', themeId)
			localStorage.setItem('data-theme', themeId)
		},

		isAppInstaled: (): boolean => {
			return window.matchMedia('(display-mode: standalone)').matches
		},
	}
})

export default useAppState
