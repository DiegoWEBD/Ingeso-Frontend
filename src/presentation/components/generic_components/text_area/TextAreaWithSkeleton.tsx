import React, { ChangeEvent, FocusEventHandler } from 'react'
import DrugInfoLabel from '../../pages/drugs/drugs_list/drug_form/DrugInfoLabel'
import TextArea from './TextArea'
import TextAreaSkeleton from './TextAreaSkeleton'

type TextAreaProps = {
	loading?: boolean
	value: string
	label: string
	name: string
	disabled?: boolean
	error?: string
	className?: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	onBlur: FocusEventHandler<HTMLTextAreaElement>
}

const TextAreaWithSkeleton: React.FC<TextAreaProps> = ({
	loading,
	value,
	label,
	onChange,
	disabled,
	error,
	className,
	name,
	onBlur,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<DrugInfoLabel>{label}</DrugInfoLabel>
			{loading ? (
				<TextAreaSkeleton />
			) : (
				<>
					<TextArea
						name={name}
						value={value}
						onChange={onChange}
						disabled={disabled}
						onBlur={onBlur}
						className={`input border px-2 py-1 rounded-md w-full h-[7rem] resize-none ${className} ${
							error
								? 'border-red-500'
								: 'border-[var(--input-border-color)]'
						}`}
					/>
					{error && (
						<p className="text-xs text-red-500 italic">{error}</p>
					)}
				</>
			)}
		</div>
	)
}

export default TextAreaWithSkeleton
