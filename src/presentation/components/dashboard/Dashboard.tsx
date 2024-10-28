import { Home, Menu, Pill } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { PRIMARY_COLOR } from '../../colors'
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

	const closeDashboard = () => {
		setIsOpen(false)
	}

	return (
		<div className='relative'>
			<div
				className={`lg:hidden fixed top-0 left-0 right-0 h-14 ${
					isOpen ? 'bg-[#047857] border-r shadow-gray-500/50' : 'bg-background'
				} z-20 flex items-center px-4 w-[20rem] xl:w-[23rem]`}
			>
				<button
					ref={buttonRef}
					className='p-2 rounded-md'
					onClick={toggleMenu}
					aria-label='Toggle menu'
				>
					<Menu
						className={`h-6 w-6 hover:text-slate-200`}
						style={{
							color: isOpen ? 'white' : PRIMARY_COLOR,
						}}
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
          px-4 flex flex-col items-center gap-8 shadow-md shadow-gray-500/50
          w-[20rem] xl:w-[23rem] z-10 h-full
          mt-14 lg:mt-0 lg:pt-8
        `}
				style={{ background: PRIMARY_COLOR }}
			>
				<img src='logo_ucn.png' className='w-[10rem]' />
				{/* <AppTitle className='text-[1.7rem] font-extrabold text-white' /> */}
				<div className='flex flex-col w-full gap-2'>
					<DashboardTab
						icon={<Home />}
						title='Inicio'
						to='/'
						closeDashboard={closeDashboard}
					/>
					<DashboardTab
						icon={<Pill />}
						title='Fármacos'
						to='/farmacos'
						closeDashboard={closeDashboard}
					/>
				</div>
			</div>
		</div>
	)
}

export default Dashboard
