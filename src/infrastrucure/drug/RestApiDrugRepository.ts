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
		const { data } = await axios.get(`${API_URL}/drugs`)
		console.log(data)
		return data.map(DrugAdapter.FromRestApi)
	}

	async findByName(name: string): Promise<Drug | null> {
		throw new Error('To do.')
	}

	async update(name: string, newValues: Drug): Promise<void> {
		throw new Error('To do.')
	}

	async delete(drug: Drug): Promise<void> {
		throw new Error('To do.')
	}
}
