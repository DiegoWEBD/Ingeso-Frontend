import React, { useEffect, useState } from 'react'
import DrugsListItem from './DrugsListItem'
import { useFormik } from 'formik'

type DrugsListProps = {
	drugs: string[]
}

const DrugsList: React.FC<DrugsListProps> = ({ drugs }) => {
	const [filteredDrugs, setFilteredDrugs] = useState<string[]>(drugs)

	const formik = useFormik({
		initialValues: { userInput: '' },
		onSubmit(values, formikHelpers) {},
	})

	useEffect(() => {
		filterDrugs()
	}, [formik.values.userInput, drugs])

	const filterDrugs = () => {
		if (formik.values.userInput === '') {
			setFilteredDrugs(drugs)
			return
		}
		const filtered = drugs.filter((drug) =>
			drug.toLowerCase().includes(formik.values.userInput)
		)
		setFilteredDrugs(filtered)
	}

	return (
		<form className="flex flex-wrap gap-5 ">
			<input
				id="userInput"
				name="userInput"
				type="text"
				onChange={formik.handleChange}
			/>
			{drugs.map((drugName) => (
				<DrugsListItem key={drugName} drugName={drugName} />
			))}
		</form>
	)
}

export default DrugsList
