
import { FaRegHandPeace } from 'react-icons/fa6'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { SiWheniwork } from 'react-icons/si'

import { useUser, UserButton } from '@clerk/clerk-react'
import ThemeSwitcher from './ThemeSwitcher'

const Header2 = () => {
    const { user, isLoaded } = useUser();

    if (!isLoaded) {
        return (
            <div className="flex w-[95%] justify-center">
                <div className="flex-flex-col gap-5 p-5 glass sm:p-4 lg:p-8 rounded-[16px] w-full shadow-sm shadow-neutral">
                    <div className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-700 h-10 w-10"></div>
                        <div className="flex-1 space-y-6 py-1">
                            <div className="h-2 bg-slate-700 rounded"></div>
                            <div className="space-y-3">
                                <div className="grid grid-cols-3 gap-4">
                                    <div className="h-2 bg-slate-700 rounded col-span-2"></div>
                                    <div className="h-2 bg-slate-700 rounded col-span-1"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className='flex w-[95%] justify-center'> 
            <div className='flex-flex-col gap-5 p-5 glass sm:p-4 lg:p-8 lg:flex lg:flex-row sm:gap-2 sm:justify-around sm:items-stretch md:flex md:flex-col md:p-5 md:gap-5 md:justify-between mt-10 md:items-center rounded-[16px] w-full light:bg-white dark:bg-neutral shadow-sm shadow-neutral'>
              
                {/* Header */}
                <div className='justify-between w-full items-between flex flex-row gap-4 sm:flex-row sm:justify-between sm:items-between md:gap-6 md:justify-between md:items-between lg:gap-8 sm:gap-4'>
                    <div className='flex flex-row w-full gap-2 justify-start items-start sm:gap-4'>
                        <SiWheniwork color={'white'} className='w-9 h-9 lg:w-10 lg:h-10 sm:w-10 sm:h-10 animate-pulse p-2 bg-linear-to-r from-neutral-900 shadow-sm shadow-purple-500 to-purple-800 rounded-xl' style={{
                            boxShadow: '0 0 8px #6A4A9EFF'
                        }}/>
                        <span className='text-[20px] sm:text-[25px] lg:text-4xl md:text-3xl text-white'>Task Flow Pro</span>
                    </div>
                    
                    {/* Avatar Mobile */}
                    <div className='flex justify-end items-end gap-1 sm:gap-4 lg:hidden'>
                        <button className="btn btn-square btn-ghost rounded-full hover:bg-neutral hover:border-0">
                            <MdOutlineNotificationsActive className="h-6 w-6 sm:h-9 sm:w-9" color={'grey'} />
                        </button>

                        {/* Theme Switcher */}
                        <ThemeSwitcher />
                        
                        {/* Clerk UserButton pour mobile */}
                        <div className="flex items-center">
                            <UserButton 
                                afterSignOutUrl="/"
                                appearance={{
                                    elements: {
                                        avatarBox: "w-9 h-9",
                                        userButtonPopoverCard: "bg-neutral border-gray-600",
                                        userButtonPopoverActions: "text-white",
                                        userButtonPopoverActionButton: "text-white hover:bg-gray-700",
                                        userButtonPopoverActionButtonText: "text-white",
                                        userButtonPopoverFooter: "hidden"
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Message de Bienvenue */}
                <div className="w-full mt-2 sm:mt-1 justify-start items-start">
                    <span className='text-white text-base sm:text-sm md:text-lg lg:text-xl flex flex-row gap-2'>
                        Hello, <FaRegHandPeace color={'#d7df66'}/> 
                        <span className='text-blue-400'>
                            {user?.firstName || user?.username || 'Utilisateur'}
                        </span>
                    </span>
                    <p className='text-white text-base sm:text-sm md:text-lg lg:text-xl'>
                        Welcome to your task management app
                    </p>
                </div>

                {/* Avatar Desktop */}
                <div className='hidden lg:visible lg:flex gap-5 items-center'>
                    <button className="btn btn-square btn-ghost rounded-full hover:bg-neutral hover:border-0">
                        <MdOutlineNotificationsActive className="" color={'grey'} size={30}/>
                    </button>

                    {/* Theme Switcher */}
                    <ThemeSwitcher />
                    
                    {/* Clerk UserButton pour desktop */}
                    <div className="flex items-center">
                        <UserButton 
                            afterSignOutUrl="/"
                            appearance={{
                                elements: {
                                    avatarBox: "w-15 h-15",
                                    userButtonPopoverCard: "bg-neutral border-gray-600",
                                    userButtonPopoverActions: "text-white",
                                    userButtonPopoverActionButton: "text-white hover:bg-gray-700",
                                    userButtonPopoverActionButtonText: "text-white",
                                    userButtonPopoverFooter: "hidden"
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header2