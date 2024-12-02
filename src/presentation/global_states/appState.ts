import { create } from 'zustand'
import DrugRepository from '../../domain/drug/DrugRepository'
import RestApiDrugRepository from '../../infrastrucure/drug/RestApiDrugRepository'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import RestApiUserRepository from '../../infrastrucure/user/RestApiUserRepository'
import Cookies from 'js-cookie'
import DrugInitialData from '../../infrastrucure/drug/DrugInitialData'

type AppState = {
	user: User | null
	drugsInitialData: Array<DrugInitialData>
	drugRepository: DrugRepository
	userRepository: UserRepository
	loadingInitialData: boolean
	loadInitialData: () => Promise<void>
	setUser: (user: User) => void
	setDrugsNames: (drugsInitialData: DrugInitialData[]) => void
	setTheme: (themeId: string) => void
	isAppInstaled: () => boolean
}

const useAppState = create<AppState>((set) => {
	const drugRepository: DrugRepository = new RestApiDrugRepository()
	const userRepository: UserRepository = new RestApiUserRepository()

	return {
		user: null,
		drugsInitialData: [],
		loadingInitialData: false,
		drugRepository,
		userRepository,

		loadInitialData: async () => {
			const accessToken = Cookies.get('access_token')
			const refreshToken = Cookies.get('refresh_token')
			if (!accessToken || !refreshToken) return

			set({ loadingInitialData: true })

			const user = await userRepository.getByToken(
				accessToken,
				refreshToken
			)
			const drugsInitialData: Array<DrugInitialData> =
				await drugRepository.getDrugsInitialData()

			set({
				drugsInitialData,
				user,
				loadingInitialData: false,
			})
		},

		setUser: (user: User) => {
			set({ user })
		},

		setDrugsNames: (drugsInitialData: DrugInitialData[]) => {
			set({ drugsInitialData })
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
