import { Pill, X, Trash} from 'lucide-react'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Drug from '../../../../../../domain/drug/Drug'
import ModalContainer from '../../../../containers/ModalContainer'
import DrugInfoContainer from './DrugInfoContainer'
import useAppState from '../../../../../global_states/appState'

type DrugItemModalProps = {
	closeModal: () => void
	drug: Drug | null
	loading: boolean
}

const DrugItemModal: React.FC<DrugItemModalProps> = ({
	closeModal,
	drug,
	loading,
}) => {
	const { drugRepository  } = useAppState()
	return (
		<ModalContainer>
			<div className='relative bg-card rounded-lg p-6 shadow-lg sm:max-w-[32rem] w-full mx-4'>
				<div className='mb-4 text-2xl font-bold flex items-center gap-2'>
					<Pill className='h-6 w-6 text-primary' />
					<h2 className='font-bold tracking-wide text-primary-intense'>
						Detalles del fármaco
					</h2>
				</div>

				<DrugInfoContainer>
					<div>
						<p className='font-bold text-lg text-primary'>Nombre</p>
						{loading ? (
							<Skeleton
								className='h-6 w-3/4'
								baseColor='var(--secondary-color)'
								highlightColor='var(--secondary-color-intense)'
							/>
						) : (
							<p className='text-secondary-weak'>{drug?.getName()}</p>
						)}
					</div>

					<div>
						<p className='font-bold text-lg text-primary'>Descripción</p>
						{loading ? (
							<>
								<Skeleton
									className='h-4 w-full mb-2'
									baseColor='var(--secondary-color)'
									highlightColor='var(--secondary-color-intense)'
								/>
								<Skeleton
									className='h-4 w-full mb-2'
									baseColor='var(--secondary-color)'
									highlightColor='var(--secondary-color-intense)'
								/>
								<Skeleton
									className='h-4 w-5/6'
									baseColor='var(--secondary-color)'
									highlightColor='var(--secondary-color-intense)'
								/>
							</>
						) : (
							<p className='text-secondary-weak break-words'>
								{drug?.getDescription()}
							</p>
						)}
					</div>

					<div>
						<p className='font-bold text-lg text-primary'>
							Procedimientos de administración
						</p>
						{loading ? (
							<>
								<Skeleton
									className='h-4 w-full mb-2'
									baseColor='var(--secondary-color)'
									highlightColor='var(--secondary-color-intense)'
								/>
								<Skeleton
									className='h-4 w-5/6 mb-2'
									baseColor='var(--secondary-color)'
									highlightColor='var(--secondary-color-intense)'
								/>
								<Skeleton
									className='h-4 w-4/6'
									baseColor='var(--secondary-color)'
									highlightColor='var(--secondary-color-intense)'
								/>
							</>
						) : (
							<div className='space-y-2'>
								{drug
									?.getAdministrationProcedures()
									.map((administrationProcedure: any) => (
										<div
											key={administrationProcedure.method}
											className='text-secondary-weak flex gap-2'
										>
											<p className='whitespace-nowrap font-medium'>
												{administrationProcedure.method}:
											</p>
											<p>{administrationProcedure.procedure}</p>
											{/* Botón para eliminar*/}
											<button
												onClick={async () => {
													const nuevo = drug.getAdministrationProcedures().filter(
													(procedure) => procedure.getMethod() !== administrationProcedure.getMethod())
													
													drug.setAdministrationProcedures(nuevo)
												
												}}
												className="px-100 py-200 text-red-500 rounded focus:outline-none">
												<Trash/>
												
											</button>


										</div>
									))}
									{/* Botón "Guardar" dentro de esta sección */}
									<div className="mt-4 flex justify-center w-full">
										<button
											onClick={async () => {
												if(drug != null){
													drugRepository.update(drug.getName(),drug)
													alert('Cambios guardados')
												}
												else{
													alert('Cambios no guardados')
												}
												
											}}
											className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-all focus:outline-none"
										>
											Guardar
										</button>
									</div>

							</div>
						)}
					</div>
				</DrugInfoContainer>

				<button
					onClick={closeModal}
					className='absolute top-2 right-2 p-2 text-primary hover:text-[var(--primary-text-color-intense)] transition-all'
				>
					<X className='h-6 w-6' />
				</button>
			</div>
		</ModalContainer>
	)
}

export default DrugItemModal
