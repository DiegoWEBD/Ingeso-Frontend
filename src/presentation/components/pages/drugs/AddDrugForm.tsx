import { useState } from 'react'
import { FormikErrors, useFormik } from 'formik'
import { motion } from 'framer-motion'
import { Pill, X } from 'lucide-react'
import { useErrorBoundary } from 'react-error-boundary'
import AdministrationProcedure from '../../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../../domain/drug/Drug'
import Ram from '../../../../domain/ram/Ram'
import useAppState from '../../../global_states/appState'
import ModalContainer from '../../containers/ModalContainer'
import Input from '../../generic_components/input/Input'
import TextAreaWithSkeleton from '../../generic_components/text_area/TextAreaWithSkeleton'
import DrugAdministrationProcedure from './drugs_list/drug_form/DrugAdministrationProcedure'
import DrugInfoContainer from './drugs_list/drug_form/DrugInfoContainer'
import DrugInfoLabel from './drugs_list/drug_form/DrugInfoLabel'

type DrugItemModalProps = {
	closeModal: () => void
}

export interface FormValues {
	name: string
	presentation: string
	description: string
	administrationProcedures: Array<AdministrationProcedure>
	rams: Array<Ram>
}

const AddDrugForm: React.FC<DrugItemModalProps> = ({ closeModal }) => {
	const { drugRepository, setDrugsNames, drugsInitialData } = useAppState()
	const { showBoundary } = useErrorBoundary()

	const [confirmationModalVisible, setConfirmationModalVisible] =
		useState(false)
	const [formValues, setFormValues] = useState<FormValues | null>(null)

	const validate = (values: FormValues): FormikErrors<FormValues> => {
		let errors: FormikErrors<FormValues> = {}

		if (!values.name.trim()) {
			errors.name = 'El nombre es requerido'
		}
		if (!values.presentation.trim()) {
			errors.presentation = 'La presentación es requerida'
		}
		if (!values.description.trim()) {
			errors.description = 'La descripción es requerida'
		}

		values.administrationProcedures.forEach((administrationProcedure) => {
			if (administrationProcedure.getProcedure().replace(' ', '') !== '') return

			errors.administrationProcedures =
				'Debe definir todos los procedimientos de administración'
		})

		values.rams.forEach((ram, index) => {
			if (!ram.getReaction().trim()) {
				if (!errors.rams) errors.rams = []
				errors.rams[index] = {
					reaction: 'Debe definir la reacción adversa',
				}
			}
		})

		return errors
	}

	const formik = useFormik<FormValues>({
		initialValues: {
			name: '',
			presentation: '',
			description: '',
			administrationProcedures: [],
			rams: [new Ram('')],
		},
		onSubmit: (values) => {
			setFormValues(values)
			setConfirmationModalVisible(true)
		},
		validate: validate,
	})

	const confirmSubmit = async () => {
		if (!formValues) return
		const drug = new Drug(
			formValues.name,
			formValues.presentation,
			formValues.description,
			formValues.rams,
			formValues.administrationProcedures
		)

		try {
			await drugRepository.add(drug)
			setDrugsNames([
				...drugsInitialData,
				{ name: drug.getName(), favorite: false },
			])
			closeModal()
		} catch (error) {
			showBoundary(error)
		} finally {
			setConfirmationModalVisible(false)
		}
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
							value={formik.values.name}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={formik.touched.name ? formik.errors.name : undefined}
						/>

						<Input
							name="presentation"
							label="Presentación"
							value={formik.values.presentation}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.presentation
									? formik.errors.presentation
									: undefined
							}
						/>

						<TextAreaWithSkeleton
							name="description"
							label="Descripción"
							value={formik.values.description}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							error={
								formik.touched.description
									? formik.errors.description
									: undefined
							}
						/>

						<DrugAdministrationProcedure formik={formik} />

						{formik.errors.administrationProcedures && (
							<p className="text-xs text-red-500 italic">
								{formik.errors.administrationProcedures.toString()}
							</p>
						)}

						<div>
							<DrugInfoLabel>Reacciones adversas a medicamentos</DrugInfoLabel>
							<div className="space-y-2">
								<textarea
									name={`rams[0].reaction`}
									value={formik.values.rams[0].getReaction()}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									className={`text-secondary-weak border rounded-md px-2 py-1 w-full ${
										formik.touched.rams &&
										formik.touched.rams[0] &&
										formik.errors.rams &&
										formik.errors.rams[0] &&
										formik.errors.rams[0].reaction
											? 'border-red-500'
											: 'border-gray-300'
									}`}
								/>
								{formik.touched.rams &&
									formik.touched.rams[0] &&
									formik.errors.rams &&
									formik.errors.rams[0] &&
									formik.errors.rams[0].reaction && (
										<p className="text-xs text-red-500 italic">
											{formik.errors.rams[0].reaction}
										</p>
									)}
							</div>
						</div>
					</DrugInfoContainer>

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

				{confirmationModalVisible && (
					<ModalContainer>
						<div className="relative bg-card rounded-lg p-6 shadow-lg sm:max-w-[32rem] w-full mx-4">
							<p className="text-lg font-bold mb-4">
								¿Está seguro que desea agregar este fármaco?
							</p>
							<div className="flex justify-end space-x-4">
								<button
									onClick={confirmSubmit}
									className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-intense transition-all"
								>
									Sí
								</button>
								<button
									onClick={() => setConfirmationModalVisible(false)}
									className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-all"
								>
									No
								</button>
							</div>
						</div>
					</ModalContainer>
				)}
			</motion.div>
		</ModalContainer>
	)
}

export default AddDrugForm
