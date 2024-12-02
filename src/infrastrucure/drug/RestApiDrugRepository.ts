import axios from 'axios'
import Cookies from 'js-cookie'
import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import { API_URL } from '../../utils'
import DrugAdapter from './adapter/DrugAdapter'
import DrugJSONAdapter from './adapter/DrugJSONAdapter'
import { DrugJSON } from './adapter/DrugJSON'

export default class RestApiDrugRepository implements DrugRepository {
	async add(drug: Drug): Promise<void> {
		console.log(drug)
		const accessToken = Cookies.get('access_token')
		/*const drugData = {
			name: drug.getName(),
			presentation: drug.getPresentation(),
			description: drug.getDescription(),
			classifications: drug
				.getDrugClassifications()
				.map((c) => c.getClassification()),
			rams: drug.getRams().map((r) => r.getReaction()),
			administrationProceduresWithMethod: Object.fromEntries(
				drug
					.getAdministrationProcedures()
					.map((p) => [p.getMethod(), p.getProcedure()])
			),
		}*/
		const drugAdapted: DrugJSON = new DrugJSONAdapter(drug)
		console.log(drugAdapted)
		await axios.post(`${API_URL}/drugs`, drugAdapted, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
				'Content-Type': 'application/json',
			},
		})
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
