import React, { ReactNode } from 'react'

type ButtonProps = {
	type?: 'submit' | 'reset' | 'button'
	children: ReactNode
	className?: string
	backgroundColor?: string
	onClick?: () => void
}

const Button: React.FC<ButtonProps> = ({
	type,
	children,
	onClick,
	className,
	backgroundColor,
}) => {
	return (
		<button
			type={type || 'button'}
			onClick={onClick}
			className={`px-4 py-2 text-white rounded-lg w-fit transition-all ${className} ${
				backgroundColor ||
				'bg-primary-weak hover:bg-[var(--primary-color)]'
			}`}
		>
			{children}
		</button>
	)
}

export default Button
