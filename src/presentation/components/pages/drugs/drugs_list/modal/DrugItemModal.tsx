import { FormikErrors, useFormik } from 'formik'
import { motion } from 'framer-motion'
import { Pill, X } from 'lucide-react'
import React from 'react'
import { useErrorBoundary } from 'react-error-boundary'
import Skeleton from 'react-loading-skeleton'
import AdministrationProcedure from '../../../../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../../../../domain/drug/Drug'
import Ram from '../../../../../../domain/ram/Ram'
import useAppState from '../../../../../global_states/appState'
import ModalContainer from '../../../../containers/ModalContainer'
import DrugAdministrationProcedure from './DrugAdministrationProcedure'
import DrugInfoContainer from './DrugInfoContainer'
import DrugInfoLabel from './DrugInfoLabel'
import Input from './Input'
import TextArea from './TextArea'

type DrugItemModalProps = {
	closeModal: () => void
	setDrug: (drug: Drug) => void
	drug: Drug | null
	loading: boolean
}

export interface FormValues {
	name: string
	presentation: string
	description: string
	administrationProcedures: Array<AdministrationProcedure>
	rams: Array<Ram>
}

const DrugItemModal: React.FC<DrugItemModalProps> = ({
	closeModal,
	drug,
	loading,
	setDrug,
}) => {
	const { drugRepository, setDrugsNames, drugsInitialData } = useAppState()
	const { showBoundary } = useErrorBoundary()

	const validate = (values: FormValues): FormikErrors<FormValues> => {
		let errors: FormikErrors<FormValues> = {}

		values.administrationProcedures.forEach((administrationProcedure) => {
			if (administrationProcedure.getProcedure().replace(' ', '') !== '')
				return

			errors.administrationProcedures =
				'Debe definir todos los procedimientos de administración'
		})

		return errors
	}

	const formik = useFormik<FormValues>({
		initialValues: {
			name: drug?.getName() || '',
			presentation: drug?.getPresentation() || '',
			description: drug?.getDescription() || '',
			administrationProcedures: drug?.getAdministrationProcedures() || [],
			rams: drug?.getRams() || [],
		},
		onSubmit: (values) => {
			handleSubmit(values)
		},
		enableReinitialize: true,
		validate: validate,
	})

	const handleSubmit = (values: FormValues) => {
		if (!drug) return

		const newValues = new Drug(
			values.name,
			values.presentation,
			values.description,
			values.rams,
			values.administrationProcedures
		)

		drugRepository
			.update(drug.getName(), newValues)
			.then(() => {
				console.log('Fármaco modificado correctamente')
				setDrugsNames(
					drugsInitialData.map((data) =>
						data.name === drug.getName()
							? {
									name: newValues.getName(),
									favorite: data.favorite,
							  }
							: data
					)
				)
				setDrug(newValues)
				closeModal()
			})
			.catch((error) => showBoundary(error))
	}

	const handleDeleteDrug = () => {
		if (!drug) return

		drugRepository
			.delete(drug)
			.then(() => {
				console.log('Fármaco eliminado correctamente.')
				setDrugsNames(
					drugsInitialData.filter(
						(data) => data.name !== drug.getName()
					)
				)
				closeModal()
			})
			.catch((error) => showBoundary(error))
	}

	return (
		<ModalContainer>
			<motion.div
				initial={{ scale: 0 }}
				animate={{ scale: 1 }}
				className="relative bg-card rounded-lg p-6 shadow-lg sm:max-w-[32rem] w-full mx-4 overflow-hidden"
			>
				<form onSubmit={formik.handleSubmit}>
					<div className="mb-4 text-2xl font-bold flex items-center gap-2">
						<Pill className="h-6 w-6 text-primary" />
						<h2 className="font-bold tracking-wide text-primary-intense">
							Detalles del fármaco
						</h2>
					</div>

					<DrugInfoContainer>
						<Input
							name="name"
							label="Nombre"
							loading={loading}
							value={formik.values.name}
							onChange={formik.handleChange}
						/>

						<Input
							name="presentation"
							label="Presentación"
							loading={loading}
							value={formik.values.presentation}
							onChange={formik.handleChange}
						/>

						<TextArea
							name="description"
							label="Descripción"
							value={formik.values.description}
							onChange={formik.handleChange}
							loading={loading}
						/>

						<DrugAdministrationProcedure
							loading={loading}
							formik={formik}
						/>
						{formik.errors.administrationProcedures && (
							<p className="text-xs text-red-500 italic">
								{formik.errors.administrationProcedures.toString()}
							</p>
						)}

						<div>
							<DrugInfoLabel>
								Reacciones adversas a medicamentos
							</DrugInfoLabel>
							{loading ? (
								<>
									<Skeleton
										className="h-4 w-full mb-2"
										baseColor="var(--secondary-color)"
										highlightColor="var(--secondary-color-intense)"
									/>
									<Skeleton
										className="h-4 w-5/6 mb-2"
										baseColor="var(--secondary-color)"
										highlightColor="var(--secondary-color-intense)"
									/>
								</>
							) : (
								<div className="space-y-2">
									{formik.values.rams.map(
										(_, index: number) => (
											<textarea
												key={index}
												name={`rams[${index}].reaction`}
												value={formik.values.rams[
													index
												].getReaction()}
												onChange={formik.handleChange}
												className="input border border-[var(--input-border-color)] rounded-md px-2 py-1 w-full"
											/>
										)
									)}
								</div>
							)}
						</div>
					</DrugInfoContainer>

					<button
						type="button"
						onClick={closeModal}
						className="absolute top-2 right-2 p-2 text-primary hover:text-[var(--primary-text-color-intense)] transition-all"
					>
						<X className="h-6 w-6" />
					</button>
					<div className="space-y-3">
						<button
							type="button"
							className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 hover:font-bold w-full transition-all"
							onClick={handleDeleteDrug}
						>
							Eliminar Fármaco
						</button>
						<button
							type="submit"
							className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-[var(--primary-color-intense)] hover:font-bold w-full transition-all"
						>
							Guardar
						</button>
					</div>
				</form>
			</motion.div>
		</ModalContainer>
	)
}

export default DrugItemModal
