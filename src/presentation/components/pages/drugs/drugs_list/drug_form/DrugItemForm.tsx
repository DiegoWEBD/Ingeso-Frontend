import { motion } from 'framer-motion'
import { Pill, X } from 'lucide-react'
import React from 'react'
import Drug from '../../../../../../domain/drug/Drug'
import useAppState from '../../../../../global_states/appState'

import ProtectedComponent from '../../../../protected/ProtectedComponent'
import DeleteDrugButton from './buttons/DeleteDrugButton'
import DrugAdministrationProcedure from './DrugAdministrationProcedure'
import DrugInfoContainer from './DrugInfoContainer'
import DrugInfoLabel from './DrugInfoLabel'
import useDrugForm from './hooks/useDrugForm'
import Input from '../../../../generic_components/input/Input'
import TextArea from '../../../../generic_components/text_area/TextArea'
import TextAreaSkeleton from '../../../../generic_components/text_area/TextAreaSkeleton'
import TextAreaWithSkeleton from '../../../../generic_components/text_area/TextAreaWithSkeleton'
import SaveChangesButton from './buttons/SaveChangesButton'

type DrugItemFormProps = {
	closeModal: () => void
	drug: Drug | null
	loading: boolean
}

const DrugItemForm: React.FC<DrugItemFormProps> = ({
	closeModal,
	drug,
	loading,
}) => {
	const { isTeacher } = useAppState()
	const formik = useDrugForm(drug, closeModal)

	return (
		<motion.form
			initial={{ scale: 0 }}
			animate={{ scale: 1 }}
			onSubmit={formik.handleSubmit}
			className="relative bg-card rounded-lg p-6 shadow-lg sm:max-w-[32rem] w-full mx-4 overflow-hidden"
		>
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
					disabled={!isTeacher()}
					value={formik.values.name}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				<Input
					name="presentation"
					label="Presentación"
					loading={loading}
					disabled={!isTeacher()}
					value={formik.values.presentation}
					onChange={formik.handleChange}
					onBlur={formik.handleBlur}
				/>

				<TextAreaWithSkeleton
					name="description"
					label="Descripción"
					disabled={!isTeacher()}
					value={formik.values.description}
					onChange={formik.handleChange}
					loading={loading}
					onBlur={formik.handleBlur}
				/>

				<DrugAdministrationProcedure
					loading={loading}
					disabled={!isTeacher()}
					formik={formik}
				/>

				<div className="flex flex-col gap-2">
					<DrugInfoLabel>
						Reacciones adversas a medicamentos
					</DrugInfoLabel>
					{loading ? (
						<TextAreaSkeleton />
					) : (
						<div className="space-y-2">
							{formik.values.rams.map((_, index: number) => (
								<TextArea
									key={index}
									name={`rams[${index}].reaction`}
									disabled={!isTeacher()}
									value={formik.values.rams[
										index
									].getReaction()}
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
								/>
							))}
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

			<ProtectedComponent>
				<div className="space-y-3 mt-3">
					<DeleteDrugButton drug={drug} closeModal={closeModal} />
					<SaveChangesButton />
				</div>
			</ProtectedComponent>
		</motion.form>
	)
}

export default DrugItemForm
