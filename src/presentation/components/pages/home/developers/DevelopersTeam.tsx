import { Users } from 'lucide-react'
import React from 'react'

const DevelopersTeam: React.FC = () => {
	return (
		<div className="flex flex-wrap gap-2 sm:gap-4 items-center text-xs sm:text-sm border-t-2 text-tertiary pt-4 justify-center text-center px-4">
			<Users size={'1rem'} />
			<p>Desarrollado por:</p>
			<p>
				Matías Cortés Bórquez, Anibal González Veira, Diego Maldonado
				Zamorano, Sebastián Robles Robles
			</p>
		</div>
	)
}

export default DevelopersTeam
