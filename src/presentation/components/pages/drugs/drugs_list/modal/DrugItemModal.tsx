import { Delete, Pill, Trash, X } from 'lucide-react'
import React from 'react'
import Drug from '../../../../../../domain/drug/Drug'
import { PRIMARY_COLOR, PRIMARY_COLOR_INTENSE } from '../../../../../colors'
import ModalInfoContainer from './ModalInfoContainer'
import RestApiDrugRepository from '../../../../../../infrastrucure/drug/RestApiDrugRepository'

type DrugItemModalProps = {
	closeModal: () => void
	drug: Drug
}

const labelStyle = {
	color: PRIMARY_COLOR,
}

const DrugItemModal: React.FC<DrugItemModalProps> = ({ closeModal, drug }) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 '>
			<div className='relative bg-white rounded p-5 shadow-lg sm:max-w-[32rem]'>
				<div className='mb-4 text-2xl font-bold flex items-center gap-2'>
					<Pill className='h-6 w-6' style={labelStyle} />
					<h2
						className='font-bold tracking-wide'
						style={{ color: PRIMARY_COLOR_INTENSE }}
					>
						Detalles del fármaco
					</h2>
				</div>

				<ModalInfoContainer>
					<div>
						<p className='font-bold text-lg' style={labelStyle}>
							Nombre:
						</p>
						<p className='text-gray-700 '>{drug.getName()}</p>
					</div>

					<div>
						<p className='font-bold text-lg' style={labelStyle}>
							Descripción:
						</p>
						<p className='text-gray-700 break-words'>{drug.getDescription()}</p>
					</div>

					<div>
						<p className='font-bold text-lg' style={labelStyle}>
							Procedimientos de administración:
						</p>
						<div className=''>
							{drug
								.getAdministrationProcedures()
								.map((administrationProcedure: any) => (
									<div
										key={administrationProcedure.method}
										className='text-gray-700 flex gap-2'
									>
										<p className='whitespace-nowrap'>
											{administrationProcedure.method}:
										</p>
										<p>{administrationProcedure.procedure}</p>
										{/* Botón para eliminar*/}
										<button
											onClick={async () => {
												const repository = new RestApiDrugRepository();
												try {
													await repository.update("",drug);
													alert('Procedimiento eliminado con éxito.');
												} catch (error) {
													console.error('Error al eliminar el procedimiento:', error);
													alert('No se pudo eliminar el procedimiento.');
												}
											}}
											className="px-100 py-200 text-red-500 rounded focus:outline-none">
											<Trash/>
											
										</button>
										
									</div>
								))}
						</div>
					</div>
				</ModalInfoContainer>

				<button
					onClick={closeModal}
					className='absolute top-2 right-2 hover:text-[#047857] transition-all'
				>
					<X />
				</button>
			</div>
		</div>
	)
}

export default DrugItemModal
