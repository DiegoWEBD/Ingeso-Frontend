import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import useAppState from '../../../global_states/appState'
import DrugsList from './drugs_list/DrugsList'
import DrugInitialData from '../../../../infrastrucure/drug/DrugInitialData'

const DrugsPage: React.FC = () => {
	const drugsInitialData: Array<DrugInitialData> = useAppState(
		(state) => state.drugsInitialData
	)
	const [filteredDrugsInitialData, setFilteredDrugsInitialData] = useState<
		DrugInitialData[]
	>([])

	const formik = useFormik({
		initialValues: {
			userInput: '',
		},
		onSubmit() {
			return
		},
	})

	useEffect(() => {
		const waitTime = 0 // Tiempo que debe transcurrir desde que el usuario deja de escribir para realizar la búsqueda.

		const timeout = setTimeout(() => {
			filterDrugNames()
		}, waitTime)

		return () => clearTimeout(timeout)
	}, [drugsInitialData, formik.values.userInput])

	const filterDrugNames = () => {
		const filtered = drugsInitialData.filter((drugInitialData) =>
			drugInitialData.name
				.toLowerCase()
				.includes(formik.values.userInput.toLowerCase())
		)
		setFilteredDrugsInitialData(filtered)
	}

	return (
		<div className="flex flex-col gap-5">
			<h1 className="text-3xl font-bold text-secondary">Fármacos</h1>

			<form onSubmit={formik.handleSubmit} className="flex gap-5">
				<input
					id="userInput"
					name="userInput"
					type="text"
					onChange={formik.handleChange}
					value={formik.values.userInput}
					placeholder="Introduzca nombre de fármaco para filtrar"
					className="w-full py-2 px-4 border rounded border-[var(--primary-color)]"
				/>
				<button
					type="button"
					onClick={() => formik.resetForm()}
					className="bg-primary-weak hover:bg-[var(--primary-color)] text-white font-semibold rounded py-2 px-4 hover:shadow hover:shadow-[var(--primary-color-intense)] transition-all"
				>
					Borrar
				</button>
			</form>
			<DrugsList drugsInitialData={filteredDrugsInitialData} />
		</div>
	)
}

export default DrugsPage
