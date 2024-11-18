import { Pill, X } from 'lucide-react'
import React from 'react'
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import Drug from '../../../../../../domain/drug/Drug'
import { PRIMARY_COLOR, PRIMARY_COLOR_INTENSE } from '../../../../../colors'
import ModalInfoContainer from './ModalInfoContainer'

type DrugItemModalProps = {
	closeModal: () => void
	drug: Drug | null
	loading: boolean
}

const labelStyle = {
	color: PRIMARY_COLOR,
}

const DrugItemModal: React.FC<DrugItemModalProps> = ({
	closeModal,
	drug,
	loading,
}) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
			<div className='relative bg-white rounded-lg p-6 shadow-lg sm:max-w-[32rem] w-full mx-4'>
				<div className='mb-4 text-2xl font-bold flex items-center gap-2'>
					<Pill className='h-6 w-6 ' style={labelStyle} />
					<h2
						className='font-bold tracking-wide '
						style={{ color: PRIMARY_COLOR_INTENSE }}
					>
						Detalles del fármaco
					</h2>
				</div>

				<ModalInfoContainer>
					<div>
						<p className='font-bold text-lg ' style={labelStyle}>
							Nombre:
						</p>
						{loading ? (
							<Skeleton className='h-6 w-3/4' />
						) : (
							<p className='text-gray-700'>{drug?.getName()}</p>
						)}
					</div>

					<div>
						<p className='font-bold text-lg ' style={labelStyle}>
							Descripción:
						</p>
						{loading ? (
							<>
								<Skeleton className='h-4 w-full mb-2' />
								<Skeleton className='h-4 w-full mb-2' />
								<Skeleton className='h-4 w-5/6' />
							</>
						) : (
							<p className='text-gray-700 break-words'>
								{drug?.getDescription()}
							</p>
						)}
					</div>

					<div>
						<p className='font-bold text-lg ' style={labelStyle}>
							Procedimientos de administración:
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
											className='text-gray-700 flex gap-2'
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
				</ModalInfoContainer>

				<button
					onClick={closeModal}
					className='absolute top-2 right-2 p-2 hover: 
						style={labelStyle}
					transition-colors'
					aria-label='Close modal'
				>
					<X className='h-6 w-6' />
				</button>
			</div>
		</div>
	)
}

export default DrugItemModal
