import axios from 'axios'
import DrugRepository from '../../domain/drug/DrugRepository'
import { API_URL } from '../../utils'
import Cookies from 'js-cookie'
import DrugAdapter from './adapter/DrugAdapter'
import Drug from '../../domain/drug/Drug'

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
		console.log(name)
		console.log(newValues)
		throw new Error('To do.')
	}

	async delete(drug: Drug): Promise<void> {
		console.log(drug)
		throw new Error('To do.')
	}
}
