import { FormikErrors, useFormik } from 'formik'
import { Pill, X } from 'lucide-react'
import { useState } from 'react'

import { useErrorBoundary } from 'react-error-boundary'
import Drug from '../../../../domain/drug/Drug'
import Ram from '../../../../domain/ram/Ram'
import useAppState from '../../../global_states/appState'
import ModalContainer from '../../containers/ModalContainer'
import Button from '../../generic_components/buttons/Button'
import Input from '../../generic_components/input/Input'
import ConfirmationNotification from '../../generic_components/notifications/ConfirmationNotification'
import { useNotification } from '../../generic_components/notifications/contexts/InformativeNotificationContext'
import useConfirmationNotification from '../../generic_components/notifications/custom_hooks/useConfirmationNotification'
import TextAreaWithSkeleton from '../../generic_components/text_area/TextAreaWithSkeleton'
import DrugAdministrationProcedure from './drugs_list/drug_form/DrugAdministrationProcedure'
import DrugInfoContainer from './drugs_list/drug_form/DrugInfoContainer'
import DrugInfoLabel from './drugs_list/drug_form/DrugInfoLabel'
import { FormValues } from './drugs_list/drug_form/hooks/useDrugForm'
import SourceChanger from './drugs_list/drug_form/source_changer/SourceChanger'
import ExcelUploader from './ExcelUploader'

type DrugItemModalProps = {
	closeModal: () => void
}

const AddDrugForm: React.FC<DrugItemModalProps> = ({ closeModal }) => {
	const { drugRepository, setDrugsNames, drugsInitialData } = useAppState()
	const { showBoundary } = useErrorBoundary()
	const [source, setSource] = useState<string>('form')

	const {
		isConfirmationOpen,
		openConfirmationNotification,
		closeConfirmationNotification,
	} = useConfirmationNotification()

	const { showNotification } = useNotification()

	const validate = (values: FormValues): FormikErrors<FormValues> => {
		let errors: FormikErrors<FormValues> = {}

		if (!values.name.trim()) {
			errors.name = 'El nombre es requerido.'
		}
		if (!values.presentation.trim()) {
			errors.presentation = 'La presentación es requerida.'
		}
		if (!values.description.trim()) {
			errors.description = 'La descripción es requerida.'
		}

		if (values.administrationProcedures.length === 0) {
			errors.administrationProcedures =
				'Debe definir al menos un procedimiento de administración para un método.'
		} else {
			values.administrationProcedures.forEach(
				(administrationProcedure) => {
					if (
						administrationProcedure
							.getProcedure()
							.replace(' ', '') !== ''
					)
						return

					errors.administrationProcedures =
						'Debe definir los procedimientos para los métodos de administración elegidos.'
				}
			)
		}

		const ramsErrors: string[] = []
		values.rams.forEach((ram) => {
			if (!ram.getReaction().trim()) {
				ramsErrors.push('Debe definir la reacción adversa.')
			} else {
				ramsErrors.push('')
			}
		})

		if (ramsErrors.some((error) => error !== '')) {
			errors.rams = ramsErrors
		}

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
		onSubmit: () => openConfirmationNotification(),
		validate: validate,
	})

	const confirmSubmit = () => {
		console.log(formik.values)
		const drug = new Drug(
			formik.values.name,
			formik.values.presentation,
			formik.values.description,
			formik.values.rams,
			formik.values.administrationProcedures
		)

		drugRepository
			.add(drug)
			.then(() => {
				console.log('Fármaco agregado correctamente')
				setDrugsNames([
					...drugsInitialData,
					{ name: drug.getName(), favorite: false },
				])
				showNotification('Fármaco agregado correctamente')
				closeModal()
			})
			.catch((error) => showBoundary(error))
	}

	return (
		<ModalContainer>
			<div className="relative bg-card rounded-lg p-6 shadow-lg sm:max-w-[32rem] w-full mx-4 overflow-hidden max-h-[35rem]">
				<div>
					<div className="mb-4 text-2xl font-bold flex items-center gap-2">
						<Pill className="h-6 w-6 text-primary" />
						<h2 className="font-bold tracking-wide text-primary-intense">
							Agregar fármaco
						</h2>
					</div>

					{source === 'excel' ? (
						<DrugInfoContainer>
							<SourceChanger
								source={source}
								setSource={setSource}
							/>
							<ExcelUploader closeModal={closeModal} />
						</DrugInfoContainer>
					) : (
						<form onSubmit={formik.handleSubmit}>
							<DrugInfoContainer>
								<SourceChanger
									source={source}
									setSource={setSource}
								/>
								<Input
									name="name"
									label="Nombre"
									value={formik.values.name}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									error={
										formik.touched.name
											? formik.errors.name
											: undefined
									}
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
								{formik.touched.administrationProcedures &&
									formik.errors.administrationProcedures && (
										<p className="text-xs text-red-500 italic">
											{formik.errors.administrationProcedures.toString()}
										</p>
									)}

								<div>
									<DrugInfoLabel>
										Reacciones adversas a medicamentos
									</DrugInfoLabel>
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
												formik.errors.rams[0]
													? 'border-red-500'
													: 'border-gray-300'
											}`}
										/>
										{formik.touched.rams &&
											formik.touched.rams[0] &&
											formik.errors.rams &&
											formik.errors.rams[0] &&
											formik.errors.rams[0] && (
												<p className="text-xs text-red-500 italic">
													{formik.errors.rams[0].toString()}
												</p>
											)}
									</div>
								</div>
								<button
									type="button"
									onClick={closeModal}
									className="absolute top-2 right-2 p-2 text-primary hover:text-primary-intense transition-all"
								>
									<X className="h-6 w-6" />
								</button>
								<Button type="submit" className="w-full">
									Guardar
								</Button>
							</DrugInfoContainer>
						</form>
					)}
				</div>
			</div>
			{isConfirmationOpen && (
				<ConfirmationNotification
					onConfirm={confirmSubmit}
					closeNotification={closeConfirmationNotification}
				>
					¿Está seguro que desea agregar este fármaco?
				</ConfirmationNotification>
			)}
		</ModalContainer>
	)
}

export default AddDrugForm
