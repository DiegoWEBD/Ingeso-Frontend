import useAppState from '../../../../global_states/appState'
import { themePrevisualizationColorMap } from '../../../../utils/theme_previsualization_map'

type ThemeOptionProps = {
	themeName: string
	themeId: string
}

const ThemeOption: React.FC<ThemeOptionProps> = ({ themeName, themeId }) => {
	const { setTheme } = useAppState()

	return (
		<button
			type="button"
			onClick={() => setTheme(themeId)}
			className="flex flex-col items-center gap-2 border border-[var(--border-color)] py-4 px-10 rounded-md hover:font-bold transition-all"
		>
			<div
				className="w-[1.4rem] h-[1.4rem] rounded-full"
				style={{
					background: themePrevisualizationColorMap.get(themeId),
				}}
			></div>
			<p className="text-secondary">{themeName}</p>
		</button>
	)
}

export default ThemeOption
