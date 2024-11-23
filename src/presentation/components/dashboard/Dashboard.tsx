import { Menu } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppTitle from '../AppTitle'
import DashboardNav from './DashboardNav'

const Dashboard: React.FC = () => {
	const [isOpen, setIsOpen] = useState(false)

	const closeNav = () => {
		if (isBigScreen()) return
		setIsOpen(false)
	}

	const isAppInstaled = (): boolean => {
		return window.matchMedia('(display-mode: standalone)').matches
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
			className={`fixed left-0 right-0 top-0 z-40 flex flex-col items-center gap-8 px-4 pb-4 ${
				isAppInstaled() ? 'pt-10' : 'pt-4'
			}  lg:pt-5 lg:px-5 lg:pb-5 lg:bottom-0 lg:w-[25rem] bg-primary`}
		>
			<div className='flex items-center gap-5 w-full justify-between'>
				<div className='flex items-center gap-5 lg:flex-col w-full'>
					<Link to='/'>
						<img
							src='logo_ucn.png'
							alt='UCN Logo'
							className='w-12 md:w-16 lg:w-32'
						/>
					</Link>
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
