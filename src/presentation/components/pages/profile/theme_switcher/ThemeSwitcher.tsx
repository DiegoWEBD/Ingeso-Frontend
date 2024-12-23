import { PaintBucket } from 'lucide-react'
import ThemeOption from './ThemeOption'
import StudentComponent from '../../../protected/StudentComponent'

const ThemeSwitcher: React.FC = () => {
	return (
		<div className="bg-card shadow-md flex flex-col gap-4 w-[18rem] sm:w-[25rem] rounded-md p-6 break-words">
			<div className="text-xl font-bold text-primary-intense flex gap-2 items-center pb-4">
				<PaintBucket className="text-primary" />
				<p>Tema</p>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
				<ThemeOption themeName="Verde" themeId="" />
				<ThemeOption themeName="Azul" themeId="blue" />

				<StudentComponent>
					<ThemeOption themeName="Violeta" themeId="violet" />
					{/*<ThemeOption themeName="Dark" themeId="dark" />*/}
					{/*<ThemeOption themeName="Grey" themeId="grey" />*/}
					<ThemeOption themeName="Pink" themeId="pink" />
				</StudentComponent>
			</div>
		</div>
	)
}

export default ThemeSwitcher
