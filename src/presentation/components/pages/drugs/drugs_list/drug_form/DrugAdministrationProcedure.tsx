import { FormikProps } from 'formik'
import { Plus, Trash } from 'lucide-react'
import React from 'react'
import AdministrationProcedure from '../../../../../../domain/administration_procedure/AdministrationProcedure'
import TextAreaSkeleton from '../../../../generic_components/text_area/TextAreaSkeleton'
import ProtectedComponent from '../../../../protected/ProtectedComponent'
import DrugInfoLabel from './DrugInfoLabel'
import TextArea from '../../../../generic_components/text_area/TextArea'
import useAppState from '../../../../../global_states/appState'
import { FormValues } from './hooks/useDrugForm'

type DrugAdministrationProcedureProps = {
	loading?: boolean
	disabled?: boolean
	formik: FormikProps<FormValues>
}

const DrugAdministrationProcedure: React.FC<
	DrugAdministrationProcedureProps
> = ({ loading, disabled, formik }) => {
	const { isTeacher } = useAppState()

	const allMethods = ['bolo directo', 'bolo intermitente', 'infusión continua']

	const usedMethods = (): string[] => {
		return formik.values.administrationProcedures
			.map((ap) => ap.getMethod())
			.filter((method) => allMethods.includes(method))
	}

	const availableMethods = (): string[] => {
		return allMethods.filter((method) => !usedMethods().includes(method))
	}

	return (
		<div>
			<DrugInfoLabel>Procedimientos de administración</DrugInfoLabel>
			{loading ? (
				<TextAreaSkeleton />
			) : (
				<div className="space-y-0 md:space-y-2">
					{formik.values.administrationProcedures.map((ap, index) => (
						<div
							key={ap.getMethod()}
							className="flex flex-col md:flex-row gap-2 items-start"
						>
							{isTeacher() ? (
								<select
									name={`administrationProcedures[${index}].method`}
									value={ap.getMethod()}
									onChange={(e) =>
										formik.setFieldValue(
											`administrationProcedures[${index}].method`,
											e.target.value
										)
									}
									disabled={disabled}
									className="whitespace-nowrap font-medium border border-[var(--input-border-color)] rounded-md px-2 py-1 input"
								>
									{[ap.getMethod(), ...availableMethods()].map((method) => (
										<option key={method} value={method}>
											{method}
										</option>
									))}
								</select>
							) : (
								<label className="font-medium italic w-1/2">
									{ap.getMethod()}
								</label>
							)}
							<TextArea
								name={`administrationProcedures[${index}].procedure`}
								value={ap.getProcedure()}
								onChange={formik.handleChange}
								disabled={disabled}
								className="h-fit"
							/>
							<ProtectedComponent>
								<button
									type="button"
									onClick={() => {
										const updatedProcedures = [
											...formik.values.administrationProcedures,
										]
										updatedProcedures.splice(index, 1)
										formik.setFieldValue(
											'administrationProcedures',
											updatedProcedures
										)
									}}
									disabled={formik.values.administrationProcedures.length <= 1}
								>
									<Trash className="text-red-500 hover:bg-red-500 hover:text-white hover:rounded-full p-[3px] transition-all" />
								</button>
							</ProtectedComponent>
						</div>
					))}
					{isTeacher() && availableMethods().length > 0 && (
						<div className="flex justify-center">
							<button
								type="button"
								className="bg-primary-extra-weak rounded-full p-1 text-[var(--primary-color-weak)] hover:text-[var(--primary-color)] transition-all"
								onClick={() => {
									formik.setFieldValue('administrationProcedures', [
										...formik.values.administrationProcedures,
										new AdministrationProcedure(availableMethods()[0], ''),
									])
								}}
							>
								<Plus size={'1.3rem'} />
							</button>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default DrugAdministrationProcedure
