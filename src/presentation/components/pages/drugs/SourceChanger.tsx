type SourceChangerProps = {
	setSource: (source: string) => void
}

const SourceChanger: React.FC<SourceChangerProps> = ({ setSource }) => {
	return (
		<select onChange={(e) => setSource(e.target.value)}>
			<option value="form">Formulario</option>

			<option value="excel">Excel</option>
		</select>
	)
}

export default SourceChanger
