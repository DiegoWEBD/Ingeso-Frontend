import { Pill, X } from 'lucide-react'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import Drug from '../../../../../../domain/drug/Drug'
import ModalContainer from '../../../../containers/ModalContainer'
import DrugInfoContainer from './DrugInfoContainer'

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
							<Skeleton className='h-6 w-3/4' />
						) : (
							<p className='text-secondary-weak'>{drug?.getName()}</p>
						)}
					</div>

					<div>
						<p className='font-bold text-lg text-primary'>Descripción</p>
						{loading ? (
							<>
								<Skeleton className='h-4 w-full mb-2' />
								<Skeleton className='h-4 w-full mb-2' />
								<Skeleton className='h-4 w-5/6' />
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
								<Skeleton className='h-4 w-full mb-2' />
								<Skeleton className='h-4 w-5/6 mb-2' />
								<Skeleton className='h-4 w-4/6' />
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
										</div>
									))}
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
