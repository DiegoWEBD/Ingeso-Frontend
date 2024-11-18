import React from 'react'
import Skeleton from 'react-loading-skeleton'

type UserDataItemProps = {
	item?: string
}

const UserDataItem: React.FC<UserDataItemProps> = ({ item }) => {
	return item ? (
		<p className='border rounded-md py-1 px-2 text-sm text-gray-500'>{item}</p>
	) : (
		<Skeleton />
	)
}

export default UserDataItem
