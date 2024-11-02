import { Home, Menu, Pill } from 'lucide-react'
import React, { useState } from 'react'
import { PRIMARY_COLOR } from '../../colors'
import DashboardTab from './DashboardTab'

export default function Dashboard() {
	const [isOpen, setIsOpen] = useState(false)

	const closeDashboard = () => {
		setIsOpen(false)
	}

	return (
		<div
			style={{ background: PRIMARY_COLOR }}
			className='fixed left-0 right-0 top-0 z-40 flex flex-col items-center gap-4 p-4 lg:bottom-0 lg:w-[25rem]'
		>
			<img src='logo_ucn.png' alt='UCN Logo' className='w-24 lg:w-32' />
			<button
				className='absolute right-4 top-4 p-2 text-white transition-all hover:text-slate-200 lg:hidden'
				type='button'
				onClick={() => setIsOpen(!isOpen)}
			>
				<Menu size='1.8rem' />
			</button>
			<nav
				className={`flex w-full flex-col gap-2 transition-all duration-300 ease-in-out ${
					isOpen
						? 'max-h-[1000px] opacity-100'
						: 'max-h-0 opacity-0 lg:max-h-[1000px] lg:opacity-100'
				} overflow-hidden`}
			>
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
			</nav>
		</div>
	)
}
