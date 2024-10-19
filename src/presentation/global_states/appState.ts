import { create } from 'zustand'
import DrugRepository from '../../domain/drug/DrugRepository'
import RestApiDrugRepository from '../../infrastrucure/drug/RestApiDrugRepository'

type AppState = {
	drugsNames: Array<string>
	drugRepository: DrugRepository
	loadInitialData: () => Promise<void>
}

const useAppState = create<AppState>((set) => ({
	drugsNames: [],
	drugRepository: new RestApiDrugRepository(),

	loadInitialData: async () => {
		// por hacer
	},
}))

export default useAppState
