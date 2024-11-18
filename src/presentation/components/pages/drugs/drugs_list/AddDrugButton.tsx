import { Plus } from 'lucide-react'
import React, { useState } from 'react'
import AddDrugPage from '../AddDrugPage'

const AddDrugButton: React.FC = () => {
	const [modalVisible, setModalVisible] = useState<boolean>(false)

	const onClick = () => {
		openModal()
	}

	const openModal = () => setModalVisible(true)
	const closeModal = () => setModalVisible(false)

	return (
		<>
			<button
				onClick={onClick}
				className='bg-primary-weak hover:bg-[var(--primary-color)] text-white flex items-center justify-center w-full border-[bg-primary] font-semibold rounded-[7px] shadow-sm shadow-black/30 py-[0.9rem] px-[0.8rem] hover:shadow-md hover:shadow-black/30 transition-all'
			>
				<Plus size={'1.5rem'} />
			</button>
			{modalVisible && <AddDrugPage closeModal={closeModal} />}
		</>
	)
}

export default AddDrugButton
