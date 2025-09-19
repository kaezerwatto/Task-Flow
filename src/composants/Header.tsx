
import { ModeToggle } from '@/components/mode-toggle'
import { FaRegHandPeace } from 'react-icons/fa6'
import { MdOutlineNotificationsActive } from 'react-icons/md'
import { SiWheniwork } from 'react-icons/si'
import  {motion} from 'framer-motion'
import ThemeSwitcher from './ThemeSwitcher'


const Header = () => {
    return (

    // <motion.div  
    // initial={{ opacity: 0 }}
    //   animate={{ opacity: 1 }}
    //   transition={{ duration: 0.5 }}>
    <div className='flex w-[95%]  justify-center'> 
        <div className='flex-flex-col  gap-5 p-5 glass sm:p-4 lg:p-8 lg:flex lg:flex-row  sm:gap-2 sm:justify-around sm:items-stretch md:flex md:flex-col md:p-5 md:gap-5 md:justify-between mt-10 md:items-center rounded-[16px] w-full light:bg-white  dark:bg-neutral shadow-sm shadow-neutral'>
          
          {/* Header */}

          <div className='justify-between w-full items-between flex flex-row gap-4 sm:flex-row sm:justify-between sm:items-between  md:gap-6 md:justify-between md:items-between lg:gap-8 sm:gap-4  '>
            <div className='flex flex-row w-full gap-2  justify-start items-start sm:gap-4 '>
            <SiWheniwork  color={'white'} className='w-9 h-9  lg:w-10 lg:h-10 sm:w-10 sm:h-10 animate-pulse p-2 bg-linear-to-r from-neutral-900 shadow-sm shadow-purple-500 to-purple-800 rounded-xl ' style={{
              boxShadow: '0 0 8px #6A4A9EFF'
            }}/>
            <span className=' text-[20px] sm:text-[25px] lg:text-4xl md:text-3xl text-white'>Task Flow Pro</span>
          </div>
          {/* Avatar */}

          <div className='flex  justify-end items-end gap-1 sm:gap-4 lg:hidden  '>
            <button className="btn btn-square btn-ghost rounded-full hover:bg-neutral hover:border-0">
              <MdOutlineNotificationsActive className="h-6 w-6 sm:h-9 sm:w-9" color={'grey'} />
            </button>

            {/* Theme Switcher*/}

          <ThemeSwitcher />
                <div className="avatar avatar-online">
                  <div className="mask mask-squircle w-9">
                    <img src="./hacker.png" />
                  </div>
                </div>
             </div>

          </div>
          {/*Bienvenu MSG */}
          <div className="w-full mt-2  sm:mt-1 justify-start items-start">
            <span className='text-white text-base sm:text-sm md:text-lg lg:text-xl  flex flex-row gap-2'>Hello,<FaRegHandPeace color={'#d7df66'}/> <span className='text-blue-400'>Franck Kaezer</span></span>
            <p className='text-white text-base sm:text-sm md:text-lg lg:text-xl '>Welcome to your task management app</p>
          </div>

          {/* Avatar */}

          <div className='hidden lg:visible lg:flex gap-5 items-center'>
            <button className="btn btn-square btn-ghost rounded-full hover:bg-neutral hover:border-0">
              <MdOutlineNotificationsActive className="" color={'grey'} size={30}/>
            </button>

            {/* Theme Switcher*/}

          <ThemeSwitcher />
                <div className="avatar avatar-online">
                  <div className="mask mask-squircle w-15">
                    <img src="./hacker.png" />
                  </div>
                </div>
             </div>
            
        </div>
    </div>
    
    
    

    )
}

export default Header
