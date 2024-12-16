import React, { ChangeEvent, FocusEventHandler } from 'react'

type TextAreaProps = {
	value: string
	name: string
	disabled?: boolean
	className?: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
	onBlur: FocusEventHandler<HTMLTextAreaElement>
}

const TextArea: React.FC<TextAreaProps> = ({
	value,
	onChange,
	disabled,
	name,
	className,
	onBlur,
}) => {
	return (
		<textarea
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
			onBlur={onBlur}
			className={`input border border-[var(--input-border-color)] px-2 py-1 rounded-md w-full h-[7rem] resize-none ${className}`}
			style={{
				background: disabled
					? 'var(--disabled-input-background-color)'
					: '',
			}}
		/>
	)
}

export default TextArea
