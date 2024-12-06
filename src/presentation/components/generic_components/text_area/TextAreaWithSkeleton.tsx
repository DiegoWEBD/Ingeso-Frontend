import React, { ChangeEvent } from 'react'
import DrugInfoLabel from '../../pages/drugs/drugs_list/drug_form/DrugInfoLabel'
import TextAreaSkeleton from './TextAreaSkeleton'
import TextArea from './TextArea'

type TextAreaProps = {
	loading?: boolean
	value: string
	label: string
	name: string
	disabled?: boolean
	className?: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const TextAreaWithSkeleton: React.FC<TextAreaProps> = ({
	loading,
	value,
	label,
	onChange,
	disabled,
	className,
	name,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<DrugInfoLabel>{label}</DrugInfoLabel>
			{loading ? (
				<TextAreaSkeleton />
			) : (
				<TextArea
					name={name}
					value={value}
					onChange={onChange}
					disabled={disabled}
					className={className}
				/>
			)}
		</div>
	)
}

export default TextAreaWithSkeleton
