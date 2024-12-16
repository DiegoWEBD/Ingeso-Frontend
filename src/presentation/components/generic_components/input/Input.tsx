import React, { ChangeEvent, FocusEvent } from 'react'
import DrugInfoLabel from '../../pages/drugs/drugs_list/drug_form/DrugInfoLabel'
import InputSkeleton from './InputSkeleton'

type DrugPresentationProps = {
	name: string
	loading?: boolean
	value: string
	label: string
	disabled?: boolean
	error?: string
	onChange: (event: ChangeEvent<HTMLInputElement>) => void
	onBlur: (event: FocusEvent) => void
}

const Input: React.FC<DrugPresentationProps> = ({
	loading,
	value,
	label,
	name,
	disabled,
	error,
	onChange,
	onBlur,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<DrugInfoLabel>{label}</DrugInfoLabel>
			{loading ? (
				<InputSkeleton />
			) : (
				<>
					<input
						name={name}
						value={value}
						onChange={onChange}
						onBlur={onBlur}
						disabled={disabled}
						className={`rounded-md w-full input border border-[var(--input-border-color)] px-2 py-1 ${
							error ? 'border-red-500' : 'border-[var(--input-border-color)]'
						}`}
						style={{
							background: disabled
								? 'var(--disabled-input-background-color)'
								: '',
						}}
					/>
					{error && <p className="text-xs text-red-500 italic">{error}</p>}
				</>
			)}
		</div>
	)
}

export default Input
