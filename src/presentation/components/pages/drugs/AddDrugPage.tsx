import React, { useState } from 'react'
import Drug from '../../../../domain/drug/Drug'
import DrugClassification from '../../../../domain/drug_classification/DrugClassification'
import Ram from '../../../../domain/ram/Ram'
import AdministrationProcedure from '../../../../domain/administration_procedure/AdministrationProcedure'
import useAppState from '../../../global_states/appState'
import { useErrorBoundary } from 'react-error-boundary'

type AddDrugPageProps = {}

const AddDrugPage: React.FC<AddDrugPageProps> = () => {
	const { drugRepository, drugsNames, setDrugsNames } = useAppState()

	const [name, setName] = useState('')
	const [presentation, setPresentation] = useState('') // Agregado para la presentación
	const [description, setDescription] = useState('')
	const [classifications, setClassifications] = useState<DrugClassification[]>(
		[]
	)
	const [rams, setRams] = useState<Ram[]>([])
	const [administrationProcedures, setAdministrationProcedures] = useState<
		AdministrationProcedure[]
	>([])
	const { showBoundary } = useErrorBoundary()

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		// Verificar si los campos requeridos están completos
		if (
			!name ||
			!presentation ||
			!description ||
			classifications.length === 0 ||
			rams.length === 0 ||
			administrationProcedures.length === 0
		) {
			alert('Por favor, complete todos los campos.')
			return
		}

		// Crea una instancia de la clase Drug usando el constructor
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
						onChange={(e) => {
							// Aquí se agrega la clasificación
							const classification = new DrugClassification(
								e.target.value,
								'Descripción'
							) // Aquí deberías añadir una descripción si es necesario
							setClassifications((prev) => [...prev, classification])
						}}
					/>
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
						onChange={(e) => {
							const ram = new Ram(e.target.value)
							setRams((prev) => [...prev, ram])
						}}
					/>
					<ul>
						{rams.map((ram, index) => (
							<li key={index}>{ram.getReaction()}</li>
						))}
					</ul>
				</div>

				{/* Procedimientos de Administración */}
				<div>
					<label>Procedimiento de Administración</label>
					<input
						type="text"
						onChange={(e) => {
							// Aquí se agrega el procedimiento de administración
							const procedure = new AdministrationProcedure(
								e.target.value,
								'Descripción del procedimiento'
							)
							setAdministrationProcedures((prev) => [...prev, procedure])
						}}
					/>
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
