import React, { useState, useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Upload, FileSpreadsheet, X } from 'lucide-react'
import { parseExcelFile } from '../../../utils/parse_excel'
import Cookies from 'js-cookie'
import axios from 'axios'
import { API_URL } from '../../../../utils'

type ExcelUploaderProps = {
	closeModal: () => void
}

const ExcelUploader: React.FC<ExcelUploaderProps> = ({ closeModal }) => {
	const [excelFile, setExcelFile] = useState<any | null>()
	const [excelData, setExcelData] = useState<any[] | null>(null)
	const [fileName, setFileName] = useState<string | null>(null)

	const onDrop = useCallback(async (acceptedFiles: File[]) => {
		console.log('onDrop')
		const file = acceptedFiles[0]
		console.log(file)
		if (!file) return

		setExcelFile(file)

		try {
			const data = await parseExcelFile(file)
			setExcelData(data)
			setFileName(file.name)
		} catch (error) {
			console.error('Error parsing Excel file:', error)
		}
	}, [])

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
				['.xlsx'],
			'application/vnd.ms-excel': ['.xls'],
		},
		multiple: false,
	})

	const clearData = () => {
		setExcelData(null)
		setFileName(null)
	}

	const handleSubmit = (event: any) => {
		event.preventDefault()

		uploadDrugsExcel()
	}

	const uploadDrugsExcel = () => {
		const accessToken = Cookies.get('access_token')

		const headers = {
			Authorization: `Bearer ${accessToken}`,
			'Content-Type': 'multipart/form-data',
		}

		axios
			.post(`${API_URL}/drugs/upload`, { file: excelFile }, { headers })
			.then(() => {
				closeModal()
				window.location.reload()
			})
			.catch(console.error)
	}

	return (
		<form className="container mx-auto p-4" onSubmit={handleSubmit}>
			<div className="bg-white shadow-md rounded-lg p-6">
				<div
					{...getRootProps()}
					className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
						isDragActive
							? 'border-blue-500 bg-blue-50'
							: 'border-gray-300 hover:border-blue-500'
					}`}
				>
					<input {...getInputProps()} />
					{isDragActive ? (
						<p className="text-lg text-blue-500">
							Suelta el archivo Excel aquí...
						</p>
					) : (
						<div>
							<Upload className="mx-auto h-12 w-12 text-gray-400" />
							<p className="mt-2 text-lg text-gray-700">
								Arrastra y suelta un archivo Excel aquí, o haz
								click para seleccionar uno
							</p>
							<p className="text-sm text-gray-500">
								Únicamente archivos .xlsx y .xls
							</p>
						</div>
					)}
				</div>

				{fileName && (
					<div className="mt-4 flex items-center justify-between bg-gray-100 p-2 rounded">
						<div className="flex items-center">
							<FileSpreadsheet className="h-5 w-5 text-green-500 mr-2" />
							<span className="text-gray-700">{fileName}</span>
						</div>
						<button
							onClick={clearData}
							className="text-gray-500 hover:text-gray-700 focus:outline-none"
							aria-label="Remove file"
						>
							<X className="h-4 w-4" />
						</button>
					</div>
				)}

				{excelData && excelData.length > 0 && (
					<div className="mt-6">
						<h2 className="text-lg font-semibold mb-2 text-gray-800">
							Preview:
						</h2>
						<div className="overflow-x-auto">
							<table className="min-w-full bg-white border border-gray-300">
								<thead>
									<tr className="bg-gray-100">
										{Object.keys(excelData[0]).map(
											(key) => (
												<th
													key={key}
													className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
												>
													{key}
												</th>
											)
										)}
									</tr>
								</thead>
								<tbody className="divide-y divide-gray-200">
									{excelData.slice(0, 5).map((row, index) => (
										<tr key={index}>
											{Object.values(row).map(
												(value: any, cellIndex) => (
													<td
														key={cellIndex}
														className="px-4 py-2 whitespace-nowrap text-sm text-gray-700"
													>
														{value}
													</td>
												)
											)}
										</tr>
									))}
								</tbody>
							</table>
						</div>
						{excelData.length > 5 && (
							<p className="mt-2 text-sm text-gray-500">
								Showing first 5 rows out of {excelData.length}
							</p>
						)}
					</div>
				)}
			</div>
			<button
				type="button"
				onClick={closeModal}
				className="absolute top-2 right-2 p-2 text-primary hover:text-primary-intense transition-all"
			>
				<X className="h-6 w-6" />
			</button>
			<button
				type="submit"
				className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-intense w-full"
			>
				Guardar
			</button>
		</form>
	)
}

export default ExcelUploader
