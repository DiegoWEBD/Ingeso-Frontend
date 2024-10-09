import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../../utils'
import DrugsList from './drugs_list/DrugsList'

const DrugsPage: React.FC = () => {
	const [drugs, setDrugs] = useState<any[]>([])

	useEffect(() => {
		getDrugs().then(setDrugs).catch(console.error)
	}, [])

	const getDrugs = async (): Promise<any[]> => {
		const { data } = await axios.get(`${API_URL}/drugs`)
		return data
	}

	return (
		<div>
			<h1 className="text-3xl font-bold pb-5">Fármacos</h1>
			<DrugsList drugs={drugs} />
		</div>
	)
}

export default DrugsPage
