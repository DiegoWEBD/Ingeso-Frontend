import React from 'react'

type DrugItemModalProps = {
	closeModal: () => void
	drug: any
}

const DrugItemModal: React.FC<DrugItemModalProps> = ({ closeModal, drug }) => {
	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
			<div className="bg-white rounded p-4 shadow-lg w-[35rem]">
				<h2 className="text-2xl font-bold pb-4 text-center">
					Detalles del fármaco
				</h2>

				<div className="flex gap-2">
					<p className="font-semibold w-[35%]">Nombre:</p>
					<p className="text-gray-600 w-[65%]">{drug.name}</p>
				</div>

				<div className="flex gap-2">
					<p className="font-semibold w-[35%]">Descripción:</p>
					<p className="text-gray-600 w-[65%] break-words">
						{drug.description}
					</p>
				</div>

				<div className="flex gap-2">
					<p className="font-semibold w-[35%]">Vías de administración:</p>
					<div className="flex gap-2 w-[65%]">
						{drug.administrationProcedures.map(
							(administrationProcedure: any, index: number) => (
								<p
									key={administrationProcedure.administrationRoute.route}
									className="text-gray-600"
								>
									{administrationProcedure.administrationRoute.route}
									{/** Poner comas entre vias */}
									{index === drug.administrationProcedures.length - 1
										? ''
										: ','}
								</p>
							)
						)}
					</div>
				</div>

				<div className="flex gap-2">
					<p className="font-semibold w-[35%]">Tipos de fármaco:</p>
					<div className="flex flex-wrap gap-2 w-[65%]">
						{drug.drugTypes.map((drugType: any, index: number) => (
							<p key={drugType.dtype} className="text-gray-600">
								{drugType.dtype}
								{/** Poner comas entre tipos */}
								{index === drug.drugTypes.length - 1 ? '' : ','}
							</p>
						))}
					</div>
				</div>

				<button
					onClick={closeModal}
					className="mt-4 bg-blue-500 text-white rounded py-2 px-4 w-full hover:shadow-md hover:shadow-black/50 transition-all"
				>
					Cerrar
				</button>
			</div>
		</div>
	)
}

export default DrugItemModal
