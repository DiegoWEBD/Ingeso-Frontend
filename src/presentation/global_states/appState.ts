import { create } from 'zustand'
import DrugRepository from '../../domain/drug/DrugRepository'
import RestApiDrugRepository from '../../infrastrucure/drug/RestApiDrugRepository'

type AppState = {
	drugsNames: Array<string>
	drugRepository: DrugRepository
	loadInitialData: () => Promise<void>
}

const useAppState = create<AppState>((set) => {
	const drugRepository: DrugRepository = new RestApiDrugRepository()

	return {
		drugsNames: [],
		drugRepository,

		loadInitialData: async () => {
			const drugsNames: Array<string> = await drugRepository.getAllNames()
			set({ drugsNames })
		},
	}
})

export default useAppState
