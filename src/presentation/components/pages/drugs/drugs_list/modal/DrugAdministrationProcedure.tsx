import { Trash, Plus } from 'lucide-react'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import AdministrationProcedure from '../../../../../../domain/administration_procedure/AdministrationProcedure'
import DrugInfoLabel from './DrugInfoLabel'
import { FormikProps } from 'formik'
import { FormValues } from './DrugItemModal'

type DrugAdministrationProcedureProps = {
	loading?: boolean
	formik: FormikProps<FormValues>
}

const DrugAdministrationProcedure: React.FC<
	DrugAdministrationProcedureProps
> = ({ loading, formik }) => {
	const allMethods = [
		'bolo directo',
		'bolo intermitente',
		'infusión continua',
	]

	const usedMethods = (): string[] => {
		return formik.values.administrationProcedures
			.filter((ap) =>
				allMethods.find((method) => ap.getMethod() === method)
			)
			.map((ap) => ap.getMethod())
	}

	const availableMethods = (): string[] => {
		const available = allMethods.filter(
			(method) => !usedMethods().find((m) => method === m)
		)
		return available
	}

	return (
		<div>
			<DrugInfoLabel>Procedimientos de administración</DrugInfoLabel>
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
					<Skeleton
						className="h-4 w-4/6"
						baseColor="var(--secondary-color)"
						highlightColor="var(--secondary-color-intense)"
					/>
				</>
			) : (
				<div className="space-y-2">
					{formik.values.administrationProcedures.map(
						(administrationProcedure: any, index: number) => {
							const availableMethodsForCurrent =
								allMethods.filter(
									(method) =>
										!formik.values.administrationProcedures
											.filter((_, i) => i !== index)
											.map((ap: any) => ap.getMethod())
											.includes(method)
								)

							return (
								<div
									key={administrationProcedure.getMethod()}
									className="text-secondary-weak flex gap-2 items-start flex flex-col md:flex-row"
								>
									<select
										name={`administrationProcedures[${index}].method`}
										value={administrationProcedure.getMethod()}
										onChange={(e) => {
											formik.setFieldValue(
												`administrationProcedures[${index}].method`,
												e.target.value
											)
										}}
										className="whitespace-nowrap font-medium border border-gray-300 rounded-md px-2 py-1"
									>
										{availableMethodsForCurrent.map(
											(method) => (
												<option
													key={method}
													value={method}
												>
													{method}
												</option>
											)
										)}
									</select>
									<textarea
										name={`administrationProcedures[${index}].procedure`}
										value={formik.values.administrationProcedures[
											index
										].getProcedure()}
										onChange={formik.handleChange}
										className="text-secondary-weak border border-gray-300 rounded-md px-2 py-1 w-full"
									/>
									<button
										disabled={
											formik.values
												.administrationProcedures
												.length <= 1
										}
										onClick={() =>
											formik.setValues({
												...formik.values,
												administrationProcedures:
													formik.values.administrationProcedures.filter(
														(ap) =>
															ap.getMethod() !==
															administrationProcedure.getMethod()
													),
											})
										}
									>
										<Trash className="text-red-500 hover:bg-red-500 hover:text-white hover:rounded-full p-[3px] transition-all" />
									</button>
								</div>
							)
						}
					)}

					{availableMethods().length > 0 && (
						<div className="flex justify-center">
							<button
								type="button"
								className="bg-primary-extra-weak rounded-full p-1 text-[var(--primary-color-weak)] hover:text-[var(--primary-color)] transition-all"
								onClick={() => {
									formik.setValues({
										...formik.values,
										administrationProcedures: [
											...formik.values
												.administrationProcedures,
											new AdministrationProcedure(
												availableMethods()[0],
												''
											),
										],
									})
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
