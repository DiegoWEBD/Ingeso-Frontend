import { FormikErrors, useFormik } from 'formik'
import { motion } from 'framer-motion'
import { Pill, X } from 'lucide-react'
import { useErrorBoundary } from 'react-error-boundary'
import Drug from '../../../../domain/drug/Drug'
import Ram from '../../../../domain/ram/Ram'
import useAppState from '../../../global_states/appState'
import ModalContainer from '../../containers/ModalContainer'
import Input from '../../generic_components/input/Input'
import TextAreaWithSkeleton from '../../generic_components/text_area/TextAreaWithSkeleton'
import DrugAdministrationProcedure from './drugs_list/drug_form/DrugAdministrationProcedure'
import DrugInfoContainer from './drugs_list/drug_form/DrugInfoContainer'
import DrugInfoLabel from './drugs_list/drug_form/DrugInfoLabel'
import { FormValues } from './drugs_list/drug_form/hooks/useDrugForm'

type DrugItemModalProps = {
	closeModal: () => void
}

const AddDrugForm: React.FC<DrugItemModalProps> = ({ closeModal }) => {
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
			name: '',
			presentation: '',
			description: '',
			administrationProcedures: [],
			rams: [new Ram('')],
		},
		onSubmit: (values) => {
			handleSubmit(values)
		},
		enableReinitialize: true,
		validate: validate,
	})

	const handleSubmit = (values: FormValues) => {
		const drug = new Drug(
			values.name,
			values.presentation,
			values.description,
			values.rams,
			values.administrationProcedures
		)

		drugRepository
			.add(drug)
			.then(() => {
				console.log('Fármaco agregado correctamente')
				setDrugsNames([
					...drugsInitialData,
					{ name: drug.getName(), favorite: false },
				])
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
							value={formik.values.name}
							onChange={formik.handleChange}
						/>

						<Input
							name="presentation"
							label="Presentación"
							value={formik.values.presentation}
							onChange={formik.handleChange}
						/>

						<TextAreaWithSkeleton
							name="description"
							label="Descripción"
							value={formik.values.description}
							onChange={formik.handleChange}
						/>

						<DrugAdministrationProcedure formik={formik} />
						{formik.errors.administrationProcedures && (
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
									className="text-secondary-weak border border-gray-300 rounded-md px-2 py-1 w-full"
								/>
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
			</motion.div>
		</ModalContainer>
	)
}

export default AddDrugForm
