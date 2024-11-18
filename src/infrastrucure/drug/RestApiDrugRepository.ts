import axios from 'axios'
import Drug from '../../domain/drug/Drug'
import DrugRepository from '../../domain/drug/DrugRepository'
import { API_URL } from '../../utils'
import Cookies from 'js-cookie'
import DrugAdapter from './adapter/DrugAdapter'

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
		const accessToken = Cookies.get('access_token');
		const currentDrug = await this.findByName(name);
		//Se verifica si existe el farmacos
		if (!currentDrug) {
			throw new Error(`Farmaco de nombre "${name}" no encontrado.`);
		}
	
		//Se crea nuevamente el farmaco con nombre "updateDrugData" pero sin los procesos de administracion
		const updatedDrugData = {
			name: currentDrug.getName(),
			presentation: newValues.getPresentation(),
			description: newValues.getDescription(),
			drugClassifications: newValues.getDrugClassifications(),
			rams: newValues.getRams(),
			administrationProcedures: [],  //Vaciamos la informacion del proceso de administracion
		};
	
		// Enviamos los datos actualizados a la API para eliminar los procedimientos de administración
		await axios.put(`${API_URL}/drugs/${encodeURIComponent(name)}`, updatedDrugData, {
			headers: {
				Authorization: `Bearer ${accessToken}`,
			},
		});
	}
	

	async delete(drug: Drug): Promise<void> {
		console.log(drug)
		throw new Error('To do.')
	}
}
