import useAppState from '../../../../global_states/appState'

type ThemeOptionProps = {
	themeName: string
	themeId: string
}

const ThemeOption: React.FC<ThemeOptionProps> = ({ themeName, themeId }) => {
	const { setTheme } = useAppState()

	return (
		<button
			type='button'
			onClick={() => setTheme(themeId)}
			className='hover:text-[var(--primary-text-color-intense)] transition-all hover:font-bold'
		>
			{themeName}
		</button>
	)
}

export default ThemeOption
