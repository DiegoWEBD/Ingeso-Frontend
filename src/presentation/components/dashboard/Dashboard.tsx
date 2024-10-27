import { Menu } from 'lucide-react'
import React, { useState, useEffect, useRef } from 'react'
import DashboardTab from './DashboardTab'
import AppTitle from '../AppTitle'
import { PRIMARY_COLOR } from '../../colors'

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
				} z-20 flex items-center px-4 w-[20rem] xl:w-[23rem]`}
			>
				<button
					ref={buttonRef}
					className='p-2 rounded-md'
					onClick={toggleMenu}
					aria-label='Toggle menu'
				>
					<Menu
						className={`h-6 w-6 text-gray-600 hover:text-[${PRIMARY_COLOR}]`}
					/>
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
          bg-white px-4 flex flex-col items-center gap-6 shadow-md shadow-gray-500/50
          w-[20rem] xl:w-[23rem] z-10 h-full
          mt-14 lg:mt-0 lg:pt-8
        `}
			>
				<img src='logo_ucn.png' className='w-[8rem]' />
				<AppTitle
					className='text-[1.7rem] font-extrabold'
					style={{
						color: PRIMARY_COLOR,
					}}
				/>
				<div className='flex flex-col w-full gap-2'>
					<DashboardTab title='Inicio' to='/' />
					<DashboardTab title='Fármacos' to='/farmacos' />
				</div>
			</div>
		</div>
	)
}

export default Dashboard
