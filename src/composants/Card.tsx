import React from 'react'
import { FaArrowTrendUp,FaArrowTrendDown,FaArrowDownUpAcrossLine, FaArrowDownWideShort, FaArrowUpWideShort  } from 'react-icons/fa6';
import {BsClockHistory,BsCalendar2Check} from 'react-icons/bs';
import {LuClockAlert} from 'react-icons/lu';
import { motion } from 'framer-motion';
type CardProps={
    priorites:string;
    nombre:number;
    tendance:number;
}



function Card({priorites, nombre, tendance}:CardProps) {
  return (
   
      <motion.div
      initial={{opacity:0,y:50}}
             
             whileInView={{opacity:1 ,y:0}}
             viewport={{once:false,amount:0.8}}
             transition={{duration:0.8 ,ease:"easeOut"}}
      className="w-[92%] flex flex-row justify-between rounded-xl  md:rounded-2xl items-center card light:bg-white dark:bg-neutral shadow-sm shadow-neutral  p-3 md:p-5 gap-2"> 
            <div className="flex flex-col justify-center gap-3 md:gap-5  px-3 md:px-5">
                <span className="text-lg md:text-2xl pl-4  ">{priorites +'s'} </span>
                <span className='text-4xl  font-bold text-slate'>{nombre}</span>
      
                    
                    {tendance < 15 ?(
                      <div className='flex flex-row items-center justify-center gap-4'>
                       
                        <div className="badge badge-soft badge-error gap-2 p-3 md:p-4"><FaArrowTrendDown color={'#f54040'}/> {tendance}%</div>
                        <div className="text-xs md:text-sm flex flex-row whitespace-nowrap ">Since Last Month</div>
                               
                      </div> )
                      :(<div className='flex flex-row items-center justify-center gap-4'>
                       
                        <div className="badge badge-soft badge-success gap-2 p-3 md:p-4"><FaArrowTrendUp color={'#51DF3FFF'}/> {tendance}%</div>
                        <div className="text-xs md:text-sm flex flex-row whitespace-nowrap "> Since Last Month</div>
                               
                      </div>) } 
                   
                </div>
                    {priorites ==='Basse' ?(

                    <div className=" px-3 md:px-5  ">
                      <div className="  pb-5" style={{
                        boxShadow:'0 8px 8px linear-gradient(45deg, #f86b6b,#ee3636)',
                      }}><FaArrowDownWideShort  className='w-13 h-13 md:w-15 md:h-15' color={'#f54040'}/>
                      </div>

                    </div>
                     
                    ): priorites==='Moyenne' ?(

                    <div className=" px-3 md:px-5 ">
                      <div className="  pb-5" style={{
                        boxShadow:'0 8px 8px linear-gradient(45deg, #f86b6b,#ee3636)',
                      }}>
                        <FaArrowDownUpAcrossLine className='w-13 h-13 md:w-15 md:h-15'  color={'#58B9F1FF'}/>
                      </div>
                    </div>
                    
                    ): priorites==='Haute' ? (
                    <div className=" px-3 md:px-5  ">
                      <div className="  pb-5" style={{
                        boxShadow:'0 8px 8px linear-gradient(45deg, #f86b6b,#ee3636)',
                      }}><FaArrowUpWideShort className='w-13 h-13 md:w-15 md:h-15'  color={'#51DF3FFF'}/>
                      </div>
                    </div>)
                    :priorites==='En cour' ? (
                    <div className=" px-3 md:px-5  ">
                      <div className="  pb-5" style={{
                        boxShadow:'0 8px 8px linear-gradient(45deg, #f86b6b,#ee3636)',
                      }}><BsClockHistory  className='w-13 h-13 md:w-15 md:h-15' color={'#36EBF8FF'}/>
                      </div>
                    </div>):
                    priorites==='En attente' ? (
                    <div className=" px-3 md:px-5 ">
                      <div className="  pb-5" style={{
                        boxShadow:'0 0px 10px linear-gradient(45deg, #f86b6b,#ee3636)',
                      }}><LuClockAlert  className='w-13 h-13 md:w-15 md:h-15'color={'#DFEC24FF'}/> 
                      </div>
                    </div>):
                    priorites==='Termine' && (
                    <div className=" px-3 md:px-5 ">
                      <div className="  pb-5" style={{
                        boxShadow:'0 8px 8px linear-gradient(45deg, #f86b6b,#ee3636)',
                      }}><BsCalendar2Check  className='w-13 h-13 md:w-15 md:h-15' color={'#F53427FF'}/>
                      </div>
                    </div>)}
                    
               
              
    </motion.div>
  )
}

export default Card
