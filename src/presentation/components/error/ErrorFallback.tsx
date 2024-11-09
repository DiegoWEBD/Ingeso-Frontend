import React from 'react'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback: React.FC<FallbackProps> = ({
	error,
	resetErrorBoundary,
}) => {
	return (
		<div>
			<p>Something went wrong: {error.message}</p>
			<button onClick={resetErrorBoundary}>Try again</button>
		</div>
	)
}

export default ErrorFallback
