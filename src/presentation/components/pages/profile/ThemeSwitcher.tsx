import { PaintBucket } from 'lucide-react'
import ThemeOption from './theme_switcher/ThemeOption'

const ThemeSwitcher: React.FC = () => {
	return (
		<div className="bg-card text-primary shadow-md flex flex-col gap-3 sm:w-[25rem] rounded-md p-5 break-words">
			<div className="text-xl font-bold text-primary-intense pb-3 flex gap-2 items-center">
				<PaintBucket />
				<p>Tema</p>
			</div>

			<div className="flex flex-col items-start gap-2">
				<ThemeOption themeName="Verde" themeId="" />
				<ThemeOption themeName="Indigo" themeId="indigo" />
				<ThemeOption themeName="Violeta" themeId="violet" />
				<ThemeOption themeName="Dark" themeId="dark" />
				<ThemeOption themeName="Grey" themeId="grey" />
				<ThemeOption themeName="Pink" themeId="pink" />
			</div>
		</div>
	)
}

export default ThemeSwitcher
