import { Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { PRIMARY_COLOR } from '../../colors'
import AppTitle from '../AppTitle'
import DashboardNav from './DashboardNav'

const Dashboard: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const closeNav = () => {
		if (isBigScreen()) return
		setIsOpen(false)
	}

	useEffect(() => {
		const handleResize = () => {
			setIsOpen(isBigScreen())
		}
		handleResize()
		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, [])

	const isBigScreen = (): boolean => window.innerWidth >= 1024

	return (
		<div
			style={{ background: PRIMARY_COLOR }}
			className='fixed left-0 right-0 top-0 z-40 flex flex-col items-center gap-4 p-4 lg:p-5 lg:bottom-0 lg:w-[25rem]'
		>
			<div className='flex items-center gap-5 w-full justify-between'>
				<div className='flex items-center gap-5 lg:flex-col'>
					<img
						src='logo_ucn.png'
						alt='UCN Logo'
						className='w-12 md:w-16 lg:w-32'
					/>
					<AppTitle className='text-white text-xl sm:text-3xl md:text-4xl' />
				</div>
				<button
					className=' p-2 text-white transition-all hover:text-slate-200 lg:hidden'
					type='button'
					onClick={() => setIsOpen(!isOpen)}
				>
					<Menu size='1.8rem' />
				</button>
			</div>
			{isOpen && <DashboardNav isOpen={isOpen} closeNav={closeNav} />}
		</div>
	)
}

export default Dashboard
