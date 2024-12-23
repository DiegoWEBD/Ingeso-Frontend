import React, { ReactNode } from 'react'

type ButtonProps = {
	type?: 'submit' | 'reset' | 'button'
	children: ReactNode
	className?: string
	backgroundColor?: string
	disabledBackgroundColor?: string
	disabled?: boolean
	onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
	type,
	children,
	onClick,
	className,
	backgroundColor,
	disabledBackgroundColor,
	disabled,
}) => {
	return (
		<button
			type={type || 'button'}
			onClick={onClick}
			disabled={disabled}
			className={`px-4 py-2 text-white rounded-lg w-fit transition-all ${className} ${
				backgroundColor ||
				'bg-primary-weak hover:bg-[var(--primary-color)]'
			}`}
			style={{
				background: disabled ? disabledBackgroundColor : '',
			}}
		>
			{children}
		</button>
	)
}

export default Button
