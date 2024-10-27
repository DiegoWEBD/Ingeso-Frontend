import axios from 'axios'
import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import { API_URL } from '../../utils'
import DrugAdapter from './adapter/DrugAdapter'

export default class RestApiDrugRepository implements DrugRepository {
	async add(drug: Drug): Promise<void> {
		throw new Error('To do.')
	}

	async getAll(): Promise<Array<Drug>> {
		throw new Error('To do.')
	}

	async getAllNames(): Promise<Array<string>> {
		const { data } = await axios.get(`${API_URL}/drugs`)
		return data
	}

	async findByName(name: string): Promise<Drug | null> {
		const { data } = await axios.get(
			`${API_URL}/drugs/${encodeURIComponent(name)}`
		)
		return DrugAdapter.FromRestApi(data)
	}

	async update(name: string, newValues: Drug): Promise<void> {
		throw new Error('To do.')
	}

	async delete(drug: Drug): Promise<void> {
		throw new Error('To do.')
	}
}
