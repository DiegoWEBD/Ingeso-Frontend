import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import apiClient from '../../presentation/utils/axios_interceptor'
import { API_URL } from '../../presentation/utils/utils'
import DrugAdapter from './adapter/DrugAdapter'
import DrugJSONAdapter from './adapter/DrugJSONAdapter'
import DrugInitialData from './DrugInitialData'

export default class RestApiDrugRepository implements DrugRepository {
	async add(drug: Drug): Promise<void> {
		const accessToken = localStorage.getItem('access_token')

		await apiClient.post(`${API_URL}/drugs`, new DrugJSONAdapter(drug), {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})
	}

	async getDrugsInitialData(): Promise<Array<DrugInitialData>> {
		const accessToken = localStorage.getItem('access_token')

		const response = await fetch(`${API_URL}/drugs`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		const data = await response.json()

		return data
	}

	async findByName(name: string): Promise<Drug | null> {
		const accessToken = localStorage.getItem('access_token')
		const { data } = await apiClient.get(
			`${API_URL}/drugs/${encodeURIComponent(name)}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
		return DrugAdapter.FromRestApi(data)
	}

	async update(name: string, newValues: Drug): Promise<void> {
		const accessToken = localStorage.getItem('access_token')
		await apiClient.put(
			`${API_URL}/drugs/${encodeURIComponent(name)}`,
			new DrugJSONAdapter(newValues),
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
	}

	async delete(drug: Drug): Promise<void> {
		const accessToken = localStorage.getItem('access_token')

		await apiClient.delete(
			`${API_URL}/drugs/${encodeURIComponent(drug.getName())}`,
			{
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			}
		)
	}

	async addFavorite(drugName: string): Promise<void> {
		const accessToken = localStorage.getItem('access_token')

		await apiClient.post(
			`${API_URL}/favorites/${encodeURIComponent(drugName)}`,
			null,
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		)
	}

	async removeFavorite(drugName: string): Promise<void> {
		const accessToken = localStorage.getItem('access_token')

		await apiClient.delete(
			`${API_URL}/favorites/${encodeURIComponent(drugName)}`,
			{
				headers: { Authorization: `Bearer ${accessToken}` },
			}
		)
	}
}
