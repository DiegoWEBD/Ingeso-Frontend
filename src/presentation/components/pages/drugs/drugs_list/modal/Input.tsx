import React, { ChangeEvent } from 'react'
import Skeleton from 'react-loading-skeleton'
import DrugInfoLabel from './DrugInfoLabel'

type DrugPresentationProps = {
	name: string
	loading?: boolean
	value: string
	label: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<DrugPresentationProps> = ({
	loading,
	value,
	label,
	name,
	onChange,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<DrugInfoLabel>{label}</DrugInfoLabel>
			{loading ? (
				<Skeleton
					className="h-6 w-3/4"
					baseColor="var(--secondary-color)"
					highlightColor="var(--secondary-color-intense)"
				/>
			) : (
				<input
					name={name}
					value={value}
					onChange={onChange}
					className="border rounded-md px-2 py-1 w-full input border-[var(--input-border-color)]"
				/>
			)}
		</div>
	)
}

export default Input
