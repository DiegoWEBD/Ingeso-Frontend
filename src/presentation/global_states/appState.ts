import { create } from 'zustand'
import DrugRepository from '../../domain/drug/DrugRepository'
import RestApiDrugRepository from '../../infrastrucure/drug/RestApiDrugRepository'
import User from '../../domain/user/User'

type AppState = {
	user: User | null
	drugsNames: Array<string>
	drugRepository: DrugRepository
	loadInitialData: () => Promise<void>
	setUser: (user: User) => void
}

const useAppState = create<AppState>((set) => {
	const drugRepository: DrugRepository = new RestApiDrugRepository()

	return {
		user: null,
		drugsNames: [],
		drugRepository,

		loadInitialData: async () => {
			const drugsNames: Array<string> = await drugRepository.getAllNames()
			set({ drugsNames })
		},

		setUser: (user: User) => {
			set({ user })
		},
	}
})

export default useAppState
