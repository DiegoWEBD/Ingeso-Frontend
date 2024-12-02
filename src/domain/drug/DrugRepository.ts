import Drug from './Drug'

export default interface DrugRepository {
	add: (drug: Drug) => Promise<void>
	getAllNames: () => Promise<Array<string>>
	findByName: (name: string) => Promise<Drug | null>
	update: (name: string, newValues: Drug) => Promise<void>
	delete: (drug: Drug) => Promise<void>
	addFavorite: (drugName: string) => Promise<void>
	removeFavorite: (drugName: string) => Promise<void>
}
