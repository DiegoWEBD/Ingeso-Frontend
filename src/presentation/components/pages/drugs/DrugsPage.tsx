import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import useAppState from '../../../global_states/appState'
import DrugsList from './drugs_list/DrugsList'
import { PRIMARY_COLOR } from '../../../colors'

const DrugsPage: React.FC = () => {
	const drugsNames: Array<string> = useAppState((state) => state.drugsNames)
	const [filteredDrugNames, setFilteredDrugNames] = useState<string[]>([])

	const formik = useFormik({
		initialValues: {
			userInput: '',
		},
		onSubmit() {},
	})

	useEffect(() => {
		const waitTime = 0 // Tiempo que debe transcurrir desde que el usuario deja de escribir para realizar la búsqueda.

		const timeout = setTimeout(() => {
			filterDrugNames()
		}, waitTime)

		return () => clearTimeout(timeout)
	}, [drugsNames, formik.values.userInput])

	const filterDrugNames = () => {
		const filtered = drugsNames.filter((name) =>
			name.toLowerCase().includes(formik.values.userInput.toLowerCase())
		)
		setFilteredDrugNames(filtered)
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
					className={`py-2 px-4 border rounded border-${PRIMARY_COLOR} w-full`}
				/>
				<button
					type='button'
					onClick={() => formik.resetForm()}
					className={`bg-[${PRIMARY_COLOR}] text-white font-semibold rounded py-2 px-4  hover:shadow hover:shadow-blue-600 transition-all`}
				>
					Borrar
				</button>
			</form>
			<DrugsList drugNames={filteredDrugNames} />
		</div>
	)
}

export default DrugsPage
