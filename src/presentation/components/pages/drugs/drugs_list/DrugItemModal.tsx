import React from 'react'

type DrugItemModalProps = {
	closeModal: () => void
	drug: any
}

const DrugItemModal: React.FC<DrugItemModalProps> = ({ closeModal, drug }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50'>
			<div className='relative bg-white rounded p-4 shadow-lg w-[35rem]'>
				<h2 className='text-2xl font-bold pb-4 text-center'>
					Detalles del fármaco
				</h2>

				<div className='flex gap-2'>
					<p className='font-semibold w-[35%]'>Nombre:</p>
					<p className='text-gray-600 w-[65%]'>{drug.name}</p>
				</div>

				<div className='flex gap-2'>
					<p className='font-semibold w-[35%]'>Descripción:</p>
					<p className='text-gray-600 w-[65%] break-words'>
						{drug.description}
					</p>
				</div>

				<div className='flex gap-2'>
					<p className='font-semibold w-[35%]'>
						Procedimientos de administración:
					</p>
					<div className='flex gap-2 w-[65%]'>
						{drug.administration_procedures.map(
							(administrationProcedure: any) => (
								<div
									key={administrationProcedure.method}
									className='text-gray-600 flex gap-2'
								>
									<p>{administrationProcedure.method}:</p>
									<p>{administrationProcedure.procedure}</p>
								</div>
							)
						)}
					</div>
				</div>

				<div className='flex gap-2'>
					<p className='font-semibold w-[35%]'>Clasificaciones:</p>
					<div className='flex flex-wrap gap-2 w-[65%]'>
						{drug.drug_classifications.map(
							(drugClassification: any, index: number) => (
								<p
									key={drugClassification.classification}
									className='text-gray-600'
								>
									{drugClassification.classification}
									{/** Poner comas entre tipos */}
									{index === drug.drug_classifications.length - 1 ? '' : ','}
								</p>
							)
						)}
					</div>
				</div>

				<button
					onClick={closeModal}
					className='absolute top-2 right-2 bg-red-500 text-white font-bold rounded py-1 px-3 hover:shadow-md hover:shadow-red-600/50 transition-all'
				>
					X
				</button>
			</div>
		</div>
	)
}

export default DrugItemModal
