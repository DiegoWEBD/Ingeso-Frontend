import { Pill, X } from 'lucide-react'
import React from 'react'
import ModalInfoContainer from './ModalInfoContainer'

type DrugItemModalProps = {
	closeModal: () => void
	drug: any
}

const DrugItemModal: React.FC<DrugItemModalProps> = ({ closeModal, drug }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '>
			<div className='relative bg-white rounded p-5 shadow-lg sm:max-w-[32rem]'>
				<div className='mb-4 text-2xl font-bold flex items-center gap-2'>
					<Pill className='h-6 w-6 text-blue-500' />
					<h2>Detalles del fármaco</h2>
				</div>

				<ModalInfoContainer>
					<div>
						<p className='font-semibold text-blue-700 text-lg '>Nombre:</p>
						<p className='text-gray-700 '>{drug.name}</p>
					</div>

					<div>
						<p className='font-semibold text-blue-700 text-lg '>Descripción:</p>
						<p className='text-gray-700 break-words'>{drug.description}</p>
					</div>

					<div>
						<p className='font-semibold text-blue-700 text-lg '>
							Procedimientos de administración:
						</p>
						<div className=''>
							{drug.administration_procedures.map(
								(administrationProcedure: any) => (
									<div
										key={administrationProcedure.method}
										className='text-gray-700 flex gap-2'
									>
										<p className='whitespace-nowrap'>
											{administrationProcedure.method}:
										</p>
										<p>{administrationProcedure.procedure}</p>
									</div>
								)
							)}
						</div>
					</div>

					<div>
						<p className='font-semibold text-blue-700 text-lg '>
							Clasificaciones:
						</p>
						<div className='flex flex-wrap gap-2 '>
							{drug.drug_classifications.map(
								(drugClassification: any, index: number) => (
									<p
										key={drugClassification.classification}
										className='text-gray-700'
									>
										{drugClassification.classification}
										{/** Poner comas entre tipos */}
										{index === drug.drug_classifications.length - 1 ? '' : ','}
									</p>
								)
							)}
						</div>
					</div>
				</ModalInfoContainer>

				<button
					onClick={closeModal}
					className='absolute top-2 right-2 hover:text-blue-700 transition-all'
				>
					<X />
				</button>
			</div>
		</div>
	)
}

export default DrugItemModal
