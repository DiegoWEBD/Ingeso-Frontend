import { create } from 'zustand'
import DrugRepository from '../../domain/drug/DrugRepository'
import Teacher from '../../domain/teacher/Teacher'
import User from '../../domain/user/User'
import UserRepository from '../../domain/user/UserRepository'
import DrugInitialData from '../../infrastrucure/drug/DrugInitialData'
import RestApiDrugRepository from '../../infrastrucure/drug/RestApiDrugRepository'
import RestApiUserRepository from '../../infrastrucure/user/RestApiUserRepository'
import { NavigateFunction } from 'react-router-dom'
import AuthService from '../../application/auth/AuthService'
import RestApiAuthService from '../../infrastrucure/auth/RestApiAuthService'

type AppState = {
	user: User | null
	drugsInitialData: Array<DrugInitialData>
	drugRepository: DrugRepository
	userRepository: UserRepository
	loadingInitialData: boolean
	authService: AuthService
	loadInitialData: (navigate: NavigateFunction) => Promise<void>
	setUser: (user: User) => void
	setDrugsNames: (drugsInitialData: DrugInitialData[]) => void
	setTheme: (themeId: string) => void
	isTeacher: () => boolean
	isAppInstaled: () => boolean
	setDrugsInititalData: (data: DrugInitialData[]) => void
}

const useAppState = create<AppState>((set) => {
	const drugRepository: DrugRepository = new RestApiDrugRepository()
	const userRepository: UserRepository = new RestApiUserRepository()
	const authService: AuthService = new RestApiAuthService()

	return {
		user: null,
		drugsInitialData: [],
		loadingInitialData: false,
		drugRepository,
		userRepository,
		authService,

		loadInitialData: async (navigate: NavigateFunction) => {
			const accessToken = localStorage.getItem('access_token')
			const refreshToken = localStorage.getItem('refresh_token')
			if (!accessToken || !refreshToken) return

			set({ loadingInitialData: true })
			let user: User | null = null

			try {
				user = await userRepository.getByToken(
					accessToken,
					refreshToken
				)
			} catch (error) {
				try {
					const newAccessToken = await authService.refresh(
						refreshToken
					)
					localStorage.setItem('access_token', newAccessToken)
					user = await userRepository.getByToken(
						newAccessToken,
						refreshToken
					)
				} catch (refreshError) {
					localStorage.removeItem('access_token')
					localStorage.removeItem('refresh_token')
					set({ loadingInitialData: false })
					navigate('/login')
					return
				}
			}

			if (!user) {
				set({ loadingInitialData: false })
				return
			}

			const drugsInitialData: Array<DrugInitialData> =
				await drugRepository.getDrugsInitialData()

			set({
				drugsInitialData,
				user,
				loadingInitialData: false,
			})
		},

		setDrugsInititalData: (data: DrugInitialData[]) => {
			set({ drugsInitialData: data })
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

		isTeacher: (): boolean => {
			const state = useAppState.getState()
			return state.user !== null && state.user instanceof Teacher
		},

		isAppInstaled: (): boolean => {
			return window.matchMedia('(display-mode: standalone)').matches
		},
	}
})

export default useAppState
