type SourceChangerProps = {
	source: string
	setSource: (source: string) => void
}

const SourceChanger: React.FC<SourceChangerProps> = ({ source, setSource }) => {
	return (
		<div className=" flex gap-6 items-center">
			<p className="font-bold text-[1.1rem] text-primary">
				Agregar desde:
			</p>
			<button
				onClick={() => setSource('form')}
				className="text-sm border px-3 py-1 rounded-md border-2 font-semibold italic transition-all"
				style={{
					background:
						source === 'form'
							? 'var(--primary-color)'
							: 'var(--card-bg-color)',
					color:
						source === 'form'
							? 'white'
							: 'var(--primary-color-weak)',
					borderColor:
						source === 'form'
							? 'var(--primary-text-color)'
							: 'var(--primary-color-weak)',
				}}
			>
				Formulario
			</button>
			<button
				onClick={() => setSource('excel')}
				className="text-sm border px-3 py-1 rounded-md border-2 font-semibold italic"
				style={{
					background:
						source === 'excel'
							? 'var(--primary-color)'
							: 'var(--card-bg-color)',
					color:
						source === 'excel'
							? 'white'
							: 'var(--primary-color-weak)',
					borderColor:
						source === 'excel'
							? 'var(--primary-text-color)'
							: 'var(--primary-color-weak)',
				}}
			>
				Excel
			</button>
		</div>
	)
}

export default SourceChanger
