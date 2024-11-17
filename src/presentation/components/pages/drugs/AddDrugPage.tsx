import React, { useState } from 'react'
import Drug from '../../../../domain/drug/Drug'
import DrugClassification from '../../../../domain/drug_classification/DrugClassification'
import Ram from '../../../../domain/ram/Ram'
import AdministrationProcedure from '../../../../domain/administration_procedure/AdministrationProcedure'
import useAppState from '../../../global_states/appState'
import { useErrorBoundary } from 'react-error-boundary'

const AddDrugPage: React.FC = () => {
	const { drugRepository, drugsNames, setDrugsNames } = useAppState()

	const [name, setName] = useState('')
	const [presentation, setPresentation] = useState('')
	const [description, setDescription] = useState('')
	const [classifications, setClassifications] = useState<DrugClassification[]>(
		[]
	)
	const [rams, setRams] = useState<Ram[]>([])
	const [administrationProcedures, setAdministrationProcedures] = useState<
		AdministrationProcedure[]
	>([])

	const [tempClassification, setTempClassification] = useState('')
	const [tempRam, setTempRam] = useState('')
	const [tempProcedure, setTempProcedure] = useState('')

	const { showBoundary } = useErrorBoundary()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		if (!name || !presentation || !description) {
			alert('Por favor, complete todos los campos obligatorios.')
			return
		}

		const drug = new Drug(
			name,
			presentation,
			description,
			classifications,
			rams,
			administrationProcedures
		)

		try {
			await drugRepository.add(drug)
			setDrugsNames([...drugsNames, drug.getName()])
			console.log('Fármaco registrado:', drug)

			// Limpiar los campos
			setName('')
			setPresentation('')
			setDescription('')
			setClassifications([])
			setRams([])
			setAdministrationProcedures([])
			setTempClassification('')
			setTempRam('')
			setTempProcedure('')
		} catch (error) {
			showBoundary(error)
			console.error('Error al registrar el fármaco:', error)
		}
	}

	return (
		<div>
			<h1>Registrar nuevo fármaco</h1>
			<form onSubmit={handleSubmit}>
				{/* Campo Nombre */}
				<div>
					<label>Nombre</label>
					<input
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
					/>
				</div>

				{/* Campo Presentación */}
				<div>
					<label>Presentación</label>
					<input
						type="text"
						value={presentation}
						onChange={(e) => setPresentation(e.target.value)}
						required
					/>
				</div>

				{/* Campo Descripción */}
				<div>
					<label>Descripción</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>

				{/* Clasificaciones */}
				<div>
					<label>Clasificaciones</label>
					<input
						type="text"
						value={tempClassification}
						onChange={(e) => setTempClassification(e.target.value)}
					/>
					<button
						type="button"
						onClick={() => {
							if (tempClassification) {
								setClassifications((prev) => [
									...prev,
									new DrugClassification(tempClassification, 'Descripción'),
								])
								setTempClassification('')
							}
						}}
					>
						Agregar
					</button>
					<ul>
						{classifications.map((classification, index) => (
							<li key={index}>{classification.getClassification()}</li>
						))}
					</ul>
				</div>

				{/* RAMs */}
				<div>
					<label>RAMs</label>
					<input
						type="text"
						value={tempRam}
						onChange={(e) => setTempRam(e.target.value)}
					/>
					<button
						type="button"
						onClick={() => {
							if (tempRam) {
								setRams((prev) => [...prev, new Ram(tempRam)])
								setTempRam('')
							}
						}}
					>
						Agregar
					</button>
					<ul>
						{rams.map((ram, index) => (
							<li key={index}>{ram.getReaction()}</li>
						))}
					</ul>
				</div>

				{/* Procedimientos de Administración */}
				<div>
					<label>Procedimientos de Administración</label>
					<input
						type="text"
						value={tempProcedure}
						onChange={(e) => setTempProcedure(e.target.value)}
					/>
					<button
						type="button"
						onClick={() => {
							if (tempProcedure) {
								setAdministrationProcedures((prev) => [
									...prev,
									new AdministrationProcedure(
										tempProcedure,
										'Descripción del procedimiento'
									),
								])
								setTempProcedure('')
							}
						}}
					>
						Agregar
					</button>
					<ul>
						{administrationProcedures.map((procedure, index) => (
							<li key={index}>
								{procedure.getMethod()} - {procedure.getProcedure()}
							</li>
						))}
					</ul>
				</div>

				{/* Botón de Envío */}
				<button type="submit">Registrar Fármaco</button>
			</form>
		</div>
	)
}

export default AddDrugPage
