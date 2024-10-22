import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_URL } from '../../../../utils'
import DrugsList from './drugs_list/DrugsList'
import { useFormik } from 'formik'

const DrugsPage: React.FC = () => {
	const [drugNames, setDrugNames] = useState<string[]>([])
	const [filteredDrugNames, setFilteredDrugNames] = useState<string[]>([])

	const formik = useFormik({
		initialValues: {
			userInput: '',
		},
		onSubmit() {},
	})

	useEffect(() => {
		getDrugs().then(setDrugNames).catch(console.error)
	}, [])

	useEffect(() => {
		const waitTime = 0 // Tiempo que debe transcurrir desde que el usuario deja de escribir para realizar la búsqueda.

		const timeout = setTimeout(() => {
			filterDrugNames()
		}, waitTime)

		return () => clearTimeout(timeout)
	}, [drugNames, formik.values.userInput])

	const filterDrugNames = () => {
		const filtered = drugNames.filter((name) =>
			name.toLowerCase().includes(formik.values.userInput.toLowerCase())
		)
		setFilteredDrugNames(filtered)
	}

	const getDrugs = async (): Promise<any[]> => {
		const { data } = await axios.get(`${API_URL}/drugs`)
		return data
	}

	return (
		<div className='flex flex-col gap-5'>
			<h1 className='text-3xl font-bold'>Fármacos</h1>

			<form onSubmit={formik.handleSubmit} className='flex gap-5'>
				<input
					id='userInput'
					name='userInput'
					type='text'
					onChange={formik.handleChange}
					value={formik.values.userInput}
					placeholder='Introduzca nombre de fármaco para filtrar'
					className='py-2 px-4 border rounded border-blue-400 w-5/6'
				/>
				<button
					type='button'
					onClick={() => formik.resetForm()}
					className='bg-blue-500 text-white rounded py-2 px-4  hover:shadow hover:shadow-blue-600 transition-all'
				>
					Borrar
				</button>
			</form>
			<DrugsList drugNames={filteredDrugNames} />
		</div>
	)
}

export default DrugsPage
