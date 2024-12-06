import React, { ChangeEvent } from 'react'

type TextAreaProps = {
	value: string
	name: string
	disabled?: boolean
	className?: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: React.FC<TextAreaProps> = ({
	value,
	onChange,
	disabled,
	name,
	className,
}) => {
	return (
		<textarea
			name={name}
			value={value}
			onChange={onChange}
			disabled={disabled}
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
