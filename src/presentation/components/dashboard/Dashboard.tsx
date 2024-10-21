import { Menu } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import DashboardTab from './DashboardTab'

const Dashboard: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)
	const sidebarRef = useRef<HTMLDivElement>(null)
	const buttonRef = useRef<HTMLButtonElement>(null)

	const toggleMenu = (e: React.MouseEvent) => {
		e.stopPropagation()
		setIsOpen(!isOpen)
	}

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node) &&
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node) &&
				isOpen
			) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleClickOutside)
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [isOpen])

	return (
		<div className='relative'>
			<div
				className={`lg:hidden fixed top-0 left-0 right-0 h-14 ${
					isOpen ? 'bg-white border-r shadow-gray-500/50' : 'bg-background'
				} z-20 flex items-center px-4 w-64`}
			>
				<button
					ref={buttonRef}
					className='p-2 rounded-md'
					onClick={toggleMenu}
					aria-label='Toggle menu'
				>
					<Menu className='h-6 w-6 text-gray-600 hover:text-blue-700' />
				</button>
			</div>

			<div
				ref={sidebarRef}
				className={` 
          fixed inset-y-0 left-0 transform ${
						isOpen ? 'translate-x-0' : '-translate-x-full'
					}
          lg:relative lg:translate-x-0
          transition duration-200 ease-in-out
          bg-white px-3 flex flex-col gap-2 shadow-md shadow-gray-500/50
          w-64 lg:w-72 z-10 h-full
          mt-14 lg:mt-0 lg:pt-8
        `}
			>
				<DashboardTab title='Inicio' to='/' />
				<DashboardTab title='Fármacos' to='/drugs' />
				<DashboardTab title='Tipos de fármacos' to='/drug_types' />
				<DashboardTab
					title='Vías de administración'
					to='/administration_route'
				/>
			</div>
		</div>
	)
}

export default Dashboard
