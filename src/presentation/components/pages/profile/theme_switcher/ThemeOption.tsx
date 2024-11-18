type ThemeOptionProps = {
	themeName: string
	themeId: string
}

const ThemeOption: React.FC<ThemeOptionProps> = ({ themeName, themeId }) => {
	const setTheme = () => {
		document.querySelector('body')?.setAttribute('data-theme', themeId)
	}

	return (
		<button
			type='button'
			onClick={setTheme}
			className='hover:text-[var(--primary-color)]'
		>
			{themeName}
		</button>
	)
}

export default ThemeOption
