
import { RiStackOverflowFill } from 'react-icons/ri'
import Card from './Card'
import { TbCalendarStats } from 'react-icons/tb'
import {motion} from  "framer-motion"

import type { TodosList,filtre } from './Todo'

const Stat = ({todos} : TodosList) => {
     function getNumTask(filter: filtre): number {
        return todos.filter((ta) => ta.priorite === filter || ta.statut === filter ).length
    }

  return (

        <div className="flex flex-col justify-start  w-full">
              
              {/* Priorite */}
    
              <motion.div
              initial={{opacity:0,x:50}}
             
             whileInView={{opacity:1 ,x:0}}
             viewport={{once:false,amount:0.3}}
             transition={{duration:0.8 ,ease:"easeOut"}}
              className='flex flex-col justify-center w-full'>
                  <div className="flex flex-row justify-start  w-full gap-4 py-5" >
                  <div className=" ml-10 mt-15 text-4xl   flex  gap-5 items-end text-end mr-5 mb-5 md:mb-10 md:text-5xl">Priotity <RiStackOverflowFill  className='w-9 h-9 md:w-10 md:h-10' color={'#8257f7'}/></div>
              </div>
    
                {/* Cards */ }
    
             <motion.div
             
             className='flex flex-col gap-8 justify-center items-center w-[98%] md:justify-center md:items-center md:grid md:grid-cols-2 md:mx-2   lg:flex lg:flex-row lg:justify-between lg:mx-5 md:gap-5 '>
    
                    {/* badge badge-soft badge-error h-24 px-5 mb-10 rounded-full */}
                      <Card tendance={8} nombre={getNumTask("Basse")} priorites='Basse'/>
                      <Card tendance={4} nombre={getNumTask("Moyenne")} priorites='Moyenne'/>
                      <Card tendance={24} nombre={getNumTask("Haute")} priorites='Haute'/>
                  </motion.div>
              </motion.div>
    
              
    
              <motion.div
              initial={{opacity:0,x:50}}
             
             whileInView={{opacity:1 ,x:0}}
             viewport={{once:false,amount:0.3}}
             transition={{duration:0.8 ,ease:"easeOut"}}
              className='flex flex-col mb-5 justify-center w-full'>
                  <div className="flex flex-row justify-end  w-full gap-4 py-5" >
                  <div className=" mt-25  mr-10  text-4xl md:text-5xl   flex  gap-3 md:gap-5 items-end text-end  mb-10">Status <TbCalendarStats className='w-10 h-10 md:h-15 md:w-15' color={'#8257f7'}/></div>
            </div>

                {/* Cards */ }
    
             <motion.div
             
               
             className='flex flex-col gap-8 justify-center items-center w-[9*%] md:grid md:grid-cols-2 md:mx-5 md:justify-center md:items-center   lg:flex lg:flex-row lg:justify-between lg:mx-5 '>
                  

                    {/* badge badge-soft badge-error h-24 px-5 mb-10 rounded-full */}
                      <Card tendance={16} nombre={getNumTask("En attente")} priorites='En attente'/>
                      <Card tendance={7} nombre={getNumTask("En cours")} priorites='En cour'/>
                      <Card tendance={24} nombre={getNumTask("Terminee")} priorites='Termine'/>
                  </motion.div>
              </motion.div>
            </div>
        
  )
}

export default Stat