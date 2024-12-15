import { Pill, PlusCircle, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import AdministrationProcedure from '../../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../../domain/drug/Drug'
import Ram from '../../../../domain/ram/Ram'
import useAppState from '../../../global_states/appState'
import ModalContainer from '../../containers/ModalContainer'
import DrugInfoContainer from './drugs_list/drug_form/DrugInfoContainer'
import { motion } from 'framer-motion'

type AddDrugPageProps = {
	closeModal: () => void
}

const AddDrugPage: React.FC<AddDrugPageProps> = ({ closeModal }) => {
	const { drugRepository, drugsInitialData, setDrugsNames } = useAppState()

	const [name, setName] = useState('')
	const [presentation, setPresentation] = useState('')
	const [description, setDescription] = useState('')
	const [rams, setRams] = useState<Ram[]>([])
	const [administrationProcedures, setAdministrationProcedures] = useState<
		AdministrationProcedure[]
	>([])
	const [submitEnabled, setSubmitEnabled] = useState<boolean>(false)

	const [tempRam, setTempRam] = useState('')
	const [tempProcedure, setTempProcedure] = useState('')

	const { showBoundary } = useErrorBoundary()

	useEffect(() => {
		setSubmitEnabled(
			name !== '' && presentation !== '' && description !== ''
		)
	}, [name, presentation, description])

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
			rams,
			administrationProcedures
		)

		try {
			console.log('trying to add')
			await drugRepository.add(drug)
			setDrugsNames([
				...drugsInitialData,
				{ name: drug.getName(), favorite: false },
			])
			console.log('Fármaco registrado:', drug)

			// Limpiar los campos
			setName('')
			setPresentation('')
			setDescription('')
			setRams([])
			setAdministrationProcedures([])
			setTempRam('')
			setTempProcedure('')
		} catch (error) {
			showBoundary(error)
			console.error('Error al registrar el fármaco:', error)
		}
	}

	return (
		<ModalContainer>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				className="relative bg-card rounded-lg p-6 shadow-lg sm:max-w-[32rem] w-full mx-4"
			>
				<div className=" text-2xl font-bold flex items-center gap-2 mb-4">
					<Pill className="h-6 w-6 text-primary" />
					<h1 className="font-bold tracking-wide text-primary-intense">
						Registrar nuevo fármaco
					</h1>
				</div>

				<form onSubmit={handleSubmit}>
					<DrugInfoContainer>
						{/* Campo Nombre */}
						<div className="flex flex-col gap-1">
							<label className="font-bold text-lg text-primary">
								Nombre
							</label>
							<input
								className="text-gray-700 border rounded-md border-gray-300 w-full"
								type="text"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>

						{/* Campo Presentación */}
						<div className="flex flex-col gap-1">
							<label className="font-bold text-lg text-primary">
								Presentación
							</label>
							<input
								className="text-gray-700 border rounded-md border-gray-300 w-full"
								type="text"
								value={presentation}
								onChange={(e) =>
									setPresentation(e.target.value)
								}
								required
							/>
						</div>

						{/* Campo Descripción */}
						<div className="flex flex-col gap-1">
							<label className="font-bold text-lg text-primary">
								Descripción
							</label>
							<textarea
								className="text-gray-700 border rounded-md border-gray-300 w-full"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
								required
							/>
						</div>

						{/* RAMs */}
						<div className="flex flex-col gap-1">
							<label className="font-bold text-lg text-primary">
								RAMs
							</label>
							<div className="flex gap-2">
								<input
									className="text-gray-700 border rounded-md border-gray-300 w-full"
									type="text"
									value={tempRam}
									onChange={(e) => setTempRam(e.target.value)}
								/>
								{tempRam !== '' && (
									<button
										type="button"
										onClick={() => {
											if (tempRam) {
												setRams((prev) => [
													...prev,
													new Ram(tempRam),
												])
												setTempRam('')
											}
										}}
									>
										<PlusCircle
											size={'1.5rem'}
											className="text-primary hover:text-[var(--primary-color-intense)] transition-all"
										/>
									</button>
								)}
							</div>
							<ul>
								{rams.map((ram, index) => (
									<li key={index}>{ram.getReaction()}</li>
								))}
							</ul>
						</div>

						{/* Procedimientos de Administración */}
						<div className="flex flex-col gap-1">
							<label className="font-bold text-lg text-primary">
								Procedimientos de Administración
							</label>
							<div className="flex gap-2">
								<input
									className="text-gray-700 border rounded-md border-gray-300 w-full"
									type="text"
									value={tempProcedure}
									onChange={(e) =>
										setTempProcedure(e.target.value)
									}
								/>
								{tempProcedure !== '' && (
									<button
										type="button"
										onClick={() => {
											if (tempProcedure) {
												setAdministrationProcedures(
													(prev) => [
														...prev,
														new AdministrationProcedure(
															tempProcedure,
															'Descripción del procedimiento'
														),
													]
												)
												setTempProcedure('')
											}
										}}
									>
										<PlusCircle
											size={'1.5rem'}
											className="text-primary hover:text-[var(--primary-color-intense)] transition-all"
										/>
									</button>
								)}
							</div>
							<ul>
								{administrationProcedures.map(
									(procedure, index) => (
										<li key={index}>
											{procedure.getMethod()} -{' '}
											{procedure.getProcedure()}
										</li>
									)
								)}
							</ul>
						</div>
					</DrugInfoContainer>
					{/* Botón de Envío */}
					<button
						type="submit"
						disabled={!submitEnabled}
						className="w-full mt-4 bg-primary text-white font-semibold tracking-wider rounded-md py-2 hover:bg-[var(--primary-color-intense)] transition-all"
					>
						Registrar Fármaco
					</button>
				</form>

				{/* Botón para cerrar ventana */}
				<button
					onClick={closeModal}
					className="absolute top-2 right-2 p-2 hover:text-[var(--primary-color-intense)] transition-all"
				>
					<X className="h-6 w-6" />
				</button>
			</motion.div>
		</ModalContainer>
	)
}

export default AddDrugPage
