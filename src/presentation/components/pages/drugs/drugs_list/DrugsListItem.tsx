import axios from 'axios'
import React, { useState } from 'react'
import { API_URL } from '../../../../../utils'
import DrugItemModal from './modal/DrugItemModal'

type DrugsListItemProps = {
	drugName: string
}

const DrugsListItem: React.FC<DrugsListItemProps> = ({ drugName }) => {
	const [modalVisible, setModalVisible] = useState<boolean>(false)
	const [drug, setDrugInfo] = useState<any>(null)

	const onClick = () => {
		getDrug()
			.then((data) => {
				setDrugInfo(data)
				setModalVisible(true)
			})
			.catch(console.error)
	}

	const getDrug = async (): Promise<any> => {
		const { data } = await axios.get(`${API_URL}/drugs/${drugName}`)
		return data
	}

	const closeModal = () => {
		setModalVisible(false)
	}

	return (
		<>
			<button
				onClick={onClick}
				className='w-full rounded border font-semibold rounded-[7px] shadow-sm shadow-black/30 py-[0.9rem] px-[0.8rem] hover:shadow-md hover:shadow-black/30 transition-all'
			>
				{drugName}
			</button>

			{modalVisible && <DrugItemModal closeModal={closeModal} drug={drug} />}
		</>
	)
}

export default DrugsListItem
