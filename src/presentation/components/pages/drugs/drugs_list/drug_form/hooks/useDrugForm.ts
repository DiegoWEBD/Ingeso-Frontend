import { FormikErrors, useFormik } from 'formik'
import { useErrorBoundary } from 'react-error-boundary'
import AdministrationProcedure from '../../../../../../../domain/administration_procedure/AdministrationProcedure'
import Drug from '../../../../../../../domain/drug/Drug'
import Ram from '../../../../../../../domain/ram/Ram'
import useAppState from '../../../../../../global_states/appState'
import { useNotification } from '../../../../../generic_components/notifications/contexts/InformativeNotificationContext'

export interface FormValues {
	name: string
	presentation: string
	description: string
	administrationProcedures: Array<AdministrationProcedure>
	rams: Array<Ram>
}

const useDrugForm = (drug: Drug | null, closeModal: () => void) => {
	const { drugRepository, setDrugsNames, drugsInitialData } = useAppState()
	const { showBoundary } = useErrorBoundary()
	const { showNotification } = useNotification()

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
				showNotification('Fármaco modificado correctamente')
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
				closeModal()
			})
			.catch((error) => showBoundary(error))
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

	return formik
}

export default useDrugForm
