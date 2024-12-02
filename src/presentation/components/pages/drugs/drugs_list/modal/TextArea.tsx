import React, { ChangeEvent } from 'react'
import Skeleton from 'react-loading-skeleton'
import DrugInfoLabel from './DrugInfoLabel'

type TextAreaProps = {
	loading?: boolean
	value: string
	label: string
	name: string
	onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void
}

const TextArea: React.FC<TextAreaProps> = ({
	loading,
	value,
	label,
	onChange,
	name,
}) => {
	return (
		<div className="flex flex-col gap-2">
			<DrugInfoLabel>{label}</DrugInfoLabel>
			{loading ? (
				<div>
					<Skeleton
						className="h-4 w-full mb-2"
						baseColor="var(--secondary-color)"
						highlightColor="var(--secondary-color-intense)"
					/>
					<Skeleton
						className="h-4 w-full mb-2"
						baseColor="var(--secondary-color)"
						highlightColor="var(--secondary-color-intense)"
					/>
					<Skeleton
						className="h-4 w-5/6"
						baseColor="var(--secondary-color)"
						highlightColor="var(--secondary-color-intense)"
					/>
				</div>
			) : (
				<textarea
					name={name}
					value={value}
					onChange={onChange}
					className="text-secondary-weak border border-gray-300 rounded-md px-2 py-1 w-full h-[7rem] resize-none"
				/>
			)}
		</div>
	)
}

export default TextArea
