import React from 'react'
import Skeleton from 'react-loading-skeleton'

const InputSkeleton: React.FC = () => {
	return (
		<Skeleton
			className="h-6"
			baseColor="var(--secondary-color)"
			highlightColor="var(--secondary-color-intense)"
		/>
	)
}

export default InputSkeleton
