import React from 'react'
import Skeleton from 'react-loading-skeleton'

const TextAreaSkeleton: React.FC = () => {
	return (
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
	)
}

export default TextAreaSkeleton
