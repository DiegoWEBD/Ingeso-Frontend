import axios from 'axios'
import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import { API_URL } from '../../utils'
import Cookies from 'js-cookie'
import DrugAdapter from './adapter/DrugAdapter'

export default class RestApiDrugRepository implements DrugRepository {
	async add(drug: Drug): Promise<void> {
		console.log(drug)

		const accessToken = Cookies.get('access_token')

		const drugData = {
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
		}

		try {
			await axios.post(
				`${API_URL}/drugs/${encodeURIComponent(drug.getName())}`,
				drugData,
				{
					headers: {
						Authorization: `Bearer ${accessToken}`,
						'Content-Type': 'application/json',
					},
				}
			)
		} catch (error) {
			console.error('Error al agregar el fármaco:', error)
			throw new Error(
				'No se pudo agregar el fármaco. Por favor, inténtelo de nuevo.'
			)
		}
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
