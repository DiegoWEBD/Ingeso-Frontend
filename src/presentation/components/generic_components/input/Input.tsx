import React, { ChangeEvent } from 'react'
import DrugInfoLabel from '../../pages/drugs/drugs_list/drug_form/DrugInfoLabel'
import InputSkeleton from './InputSkeleton'

type DrugPresentationProps = {
	name: string
	loading?: boolean
	value: string
	label: string
	disabled?: boolean
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

const Input: React.FC<DrugPresentationProps> = ({
	loading,
	value,
	label,
	name,
	disabled,
	onChange,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<DrugInfoLabel>{label}</DrugInfoLabel>
			{loading ? (
				<InputSkeleton />
			) : (
				<input
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
					className="rounded-md w-full input border border-[var(--input-border-color)] px-2 py-1"
					style={{
						background: disabled
							? 'var(--disabled-input-background-color)'
							: '',
					}}
				/>
			)}
		</div>
	)
}

export default Input
