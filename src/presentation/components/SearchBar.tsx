import React from 'react'
import { useFormik } from 'formik'

type SearchBarProps = {
	onSearch: (query: string) => void
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
	const formik = useFormik({
		initialValues: {
			userInput: '',
		},
		onSubmit() {
			return
		},
	})

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		formik.handleChange(e)
		onSearch(e.target.value)
	}

	return (
		<form onSubmit={formik.handleSubmit} className="flex gap-5">
			<input
				id="userInput"
				name="userInput"
				type="text"
				onChange={handleChange}
				value={formik.values.userInput}
				placeholder="Introduzca nombre de fármaco para filtrar"
				className="w-full py-2 px-4 border rounded border-[var(--primary-color)]"
			/>
			<button
				type="button"
				onClick={() => {
					formik.resetForm()
					onSearch('')
				}}
				className="bg-primary-weak hover:bg-[var(--primary-color)] text-white font-semibold rounded py-2 px-4 hover:shadow hover:shadow-[var(--primary-color-intense)] transition-all"
			>
				Borrar
			</button>
		</form>
	)
}

export default SearchBar
