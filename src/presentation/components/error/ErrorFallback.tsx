import { AlertCircle } from 'lucide-react'
import React from 'react'
import { FallbackProps } from 'react-error-boundary'

const ErrorFallback: React.FC<FallbackProps> = ({
	error,
	resetErrorBoundary,
}) => {
	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50'>
			<div className='text-center bg-white border flex flex-col items-center gap-4 px-5 py-7 rounded-md shadow-md md:w-[25rem]'>
				<div className='bg-primary-extra-weak rounded-full w-fit p-3'>
					<AlertCircle className='text-primary w-12 h-12' />
				</div>
				<p className='text-2xl font-bold'>Ha ocurrido un error</p>
				{error && (
					<p className='text-gray-600'>
						{error.message !== undefined ? error.message : ''}
					</p>
				)}
				<button
					onClick={resetErrorBoundary}
					className='flex items-center bg-primary-weak hover:bg-[var(--primary-color)] transition-all rounded text-white font-bold tracking-wide py-2 px-5'
				>
					Volver
				</button>
			</div>
		</div>
	)
}

export default ErrorFallback
