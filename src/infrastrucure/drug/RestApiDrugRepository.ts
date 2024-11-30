import axios from 'axios'
import Cookies from 'js-cookie'
import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import { API_URL } from '../../utils'
import DrugAdapter from './adapter/DrugAdapter'
import DrugJSONAdapter from './adapter/DrugJSONAdapter'

export default class RestApiDrugRepository implements DrugRepository {
	async add(drug: Drug): Promise<void> {
		console.log(drug)
		throw new Error('To do.')
	}

	async getAll(): Promise<Array<Drug>> {
		throw new Error('To do.')
	}

	async getAllNames(): Promise<Array<string>> {
		const accessToken = Cookies.get('access_token')
		const { data } = await axios.get(`${API_URL}/drugs`, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		})
		return data
	}

	async findByName(name: string): Promise<Drug | null> {
		const accessToken = Cookies.get('access_token')
		const { data } = await axios.get(
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
		const accessToken = Cookies.get('access_token')
		await axios.put(
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
		console.log(drug)
		throw new Error('To do.')
	}
}
