import React, { useState } from 'react'
//import DrugService from '../../../application/services/DrugService';

const AddDrugPage: React.FC = () => {
	const [name, setName] = useState('')
	const [description, setDescription] = useState('')
	const [classifications, setClassifications] = useState<string[]>([])
	const [rams, setRams] = useState<string[]>([])
	const [
		administrationProceduresWithMethod,
		setAdministrationProceduresWithMethod,
	] = useState<Map<string, string>>(new Map())

	// Inputs para agregar valores a los arrays/mapa
	const [classificationInput, setClassificationInput] = useState('')
	const [ramInput, setRamInput] = useState('')
	const [procedureInput, setProcedureInput] = useState('')
	const [methodInput, setMethodInput] = useState('')

	const handleAddClassification = () => {
		setClassifications([...classifications, classificationInput])
		setClassificationInput('')
	}

	const handleAddRam = () => {
		setRams([...rams, ramInput])
		setRamInput('')
	}

	const handleAddProcedureWithMethod = () => {
		setAdministrationProceduresWithMethod(
			new Map(
				administrationProceduresWithMethod.set(procedureInput, methodInput)
			)
		)
		setProcedureInput('')
		setMethodInput('')
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()

		const drug = {
			name,
			description,
			classifications,
			rams,
			administrationProceduresWithMethod,
		}

		console.log(drug)

		/*try {
      const registeredDrug = await DrugService.registerDrug(drug);
      console.log('Fármaco registrado:', registeredDrug);
    } catch (error) {
      console.error('Error al registrar el fármaco:', error);
    }*/
	}

	return (
		<div>
			<h1>Registrar nuevo fármaco</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Nombre</label>
					<input
						type='text'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label>Descripción</label>
					<input
						type='text'
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					<label>Clasificaciones</label>
					<input
						type='text'
						value={classificationInput}
						onChange={(e) => setClassificationInput(e.target.value)}
					/>
					<button type='button' onClick={handleAddClassification}>
						Agregar Clasificación
					</button>
					<ul>
						{classifications.map((classification, index) => (
							<li key={index}>{classification}</li>
						))}
					</ul>
				</div>
				<div>
					<label>RAMs</label>
					<input
						type='text'
						value={ramInput}
						onChange={(e) => setRamInput(e.target.value)}
					/>
					<button type='button' onClick={handleAddRam}>
						Agregar RAM
					</button>
					<ul>
						{rams.map((ram, index) => (
							<li key={index}>{ram}</li>
						))}
					</ul>
				</div>
				<div>
					<label>Procedimiento</label>
					<input
						type='text'
						value={procedureInput}
						onChange={(e) => setProcedureInput(e.target.value)}
					/>
					<label>Método</label>
					<input
						type='text'
						value={methodInput}
						onChange={(e) => setMethodInput(e.target.value)}
					/>
					<button type='button' onClick={handleAddProcedureWithMethod}>
						Agregar Procedimiento y Método
					</button>
					<ul>
						{[...administrationProceduresWithMethod].map(
							([procedure, method], index) => (
								<li key={index}>
									{procedure} - {method}
								</li>
							)
						)}
					</ul>
				</div>
				<button type='submit'>Registrar Fármaco</button>
			</form>
		</div>
	)
}

export default AddDrugPage
