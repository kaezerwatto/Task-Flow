

import {MdAddTask,MdOutlineLowPriority} from 'react-icons/md'

import { LuCircleFadingPlus,LuCircleFadingArrowUp } from "react-icons/lu";

import { FaCheckToSlot} from "react-icons/fa6";
import {BiStats,BiAdjust} from "react-icons/bi";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import { useState,useEffect} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
   
} from '@/components/ui/select'

import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import {CalendarIcon} from "lucide-react"
import { format } from "date-fns"
import Stat from "./Stat";
// import Header from "./Header";
import Table from "./Table" ;
import { motion } from 'framer-motion';
import Header2 from './Header2';
 

export type filtre="Basse" | "Moyenne" | "Haute" | "En attente" | "En cours" | "Terminee"
export type Priorite ="Basse" | "Moyenne" | "Haute"
export type Statut ="En attente" | "En cours" | "Terminee"
export type TodoProps={
  id:number;
  titre:string;
  date:string;
  priorite:Priorite;
  statut:Statut;
  deadline:string;
  completed_at:string;
}

export type TodosList={
  todos:TodoProps[],
}

function Todo({ todos }: TodosList) {

  
  const [selects, setSelect] = useState<Priorite>('Moyenne')
  const [erreur, setErreur] = useState(false)
  const [message, setMessage] = useState('')
  const [texte, setTexte] = useState('')
  const [count, setCount] = useState(0)
  const [optiontri, setOptionTri] = useState('Priorite')
  const [Todos, setTodos] = useState<TodoProps[]>(todos)
  const [filtered, setFilter] = useState<filtre | "Tous">("Tous")
  const [filterTodos, setFilterTodos] = useState<TodoProps[]>([])
  const [deadline, setDeadline] = useState<Date | undefined>(undefined)
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());
  const [todosTermines,setTodosTermine]=useState<TodoProps[]>([])

useEffect(() =>{
  setTodosTermine(Todos.filter((todo)=> todo.statut==="Terminee"))
},[Todos])

function handleUpdateTodo(updatedTodo: TodoProps) {
        setTodos(prevTodos =>
            prevTodos.map(todo =>
                todo.id === updatedTodo.id ? updatedTodo : todo
            )
        );
    }

// function finishTodos(){
//   const todosTermine=Todos.filter((todo)=>{
//     if(selectedTodos.has(todo.id)){
//       todo.statut="Terminee"
//       return true
      
//     }else{
//       return false
//     }

//   })
//   setTodosTermine((prev)=>[...prev,...todosTermine])

//   console.log(`todosTerminees ${todosTermine.length}`)
  


//   const newTodos=Todos.filter((todo)=>{
//     if(selectedTodos.has(todo.id)){
//       showSuccessToastMessage(`Tache "${todo.titre}" Terminee` )
//       return false
      
//     }else{
//       return true
//     }
//   })
//   setTodos(newTodos)
//   setSelectedTodos(new Set())
 
// }

function finishTodos() {
  const updatedTodos = Todos.map(todo =>
    selectedTodos.has(todo.id) ? { ...todo, statut: "Terminee" as Statut,completed_at : format(new Date(), "dd-MM-yyyy") } : todo
  );

  setTodos(updatedTodos);
  setSelectedTodos(new Set());
  showSuccessToastMessage(`${selectedTodos.size} tâche(s) terminée(s)`);
}

useEffect(() => {
  setTodosTermine(Todos.filter(todo => todo.statut === "Terminee"));
}, [Todos]);




function handleSetSelectFromTable(newSet: Set<number> | ((prev: Set<number>) => Set<number>)) {
  setSelectedTodos(newSet);
}

function handleRemoveTodo(id: number) {
    const updatedTodos = Todos.filter(todo => todo.id !== id);
    setTodos(updatedTodos);
    showSuccessToastMessage("Tâche supprimée avec succès");
}

//fonction de set de priorite choisie 
function handleSelectPriorite(value:Priorite){
  
  setSelect(value)
}

//toast de success
const showSuccessToastMessage = (mes:string) => {
    toast.success(`${mes}`, {
      position: "top-right"
    });
  };


  //toast d'erreur
const showErrorToastMessage = () => {
  toast.error("Erreur",{
  position:'top-right'
  });
}

function handleAjout() {
  if (texte.trim().length <= 4) {
    setErreur(true);
    setMessage('Minimum 5 caractères pour le titre');
    setCount(prev => prev + 1);
  } else if (!deadline) {
    setErreur(true)
    showErrorToastMessage();
    setMessage("Veuillez choisir une deadline valide (à partir de demain)");
  } else {
    const nouvTache: TodoProps = {
      id: Date.now(),
      titre: texte,
      date: format(new Date(), "dd-MM-yyyy"),
      priorite: selects,
      statut: "En attente" as Statut,
      deadline: format(deadline, "dd-MM-yyyy"), //  ajout deadline
      completed_at:'',
    };
    setTodos([...Todos, nouvTache]);

    setErreur(false);
    setMessage('');
    setTexte('');
    setDeadline(undefined);

    showSuccessToastMessage("Tâche ajoutée avec succès");
  }
}


//fonction de set du texte avec verification


function handleText(event: { target: { value: any; }; }) {
  
    const newValue = event.target.value;
    const text =newValue.charAt(0).toUpperCase() + newValue.slice(1);

    setTexte(text);
    
    // si erreur dej present
    if (count > 0) {
        if (newValue.trim().length >= 5) {
            setErreur(false);
            setMessage("")
   
            
        } else {
            setErreur(true);
            setMessage('Minimum 5 caractères pour le titre');
        }
    }
}

function handleOptionTri(value:string){
  setOptionTri(value)
}

useEffect (( ) =>{
  localStorage.setItem("todos",JSON.stringify(Todos))
},[Todos])

useEffect(() => {
  let result = Todos;

  if (filtered !== "Tous") {
    result = Todos.filter(
      (todo) => todo.priorite === filtered || todo.statut === filtered
    );
  }

  setFilterTodos(result);
  setTodosTermine(result.filter((todo) => todo.statut === "Terminee")); //  filtre aussi les terminées
}, [filtered, Todos]);

 function getNumTask(filter: filtre): number {
        return Todos.filter((ta) => ta.priorite === filter || ta.statut === filter ).length
    }






  return (
  <div className='flex flex-col gap-4 items-center max-w-full'>
        <Header2/>
        {/*Statistiques */}

        <Stat todos={Todos}/>


      <div className='flex flex-col justify-center w-full'>
      <motion.div
            initial={{opacity:0,x:50}}
             
             whileInView={{opacity:1 ,x:0}}
             viewport={{once:false,amount:0.3}}
             transition={{duration:0.8 ,ease:"easeOut"}}
       className=" mt-25 flex flex-row justify-start items-start mx-3  md:mx-10   gap-3 md:gap-5"> 
        <span className='text-4xl md:text-5xl whitespace-nowrap  justify-start mb-4 ml-7'>New Task</span>
        <LuCircleFadingPlus className='h-10 w-10 md:h-15 md:w-15' color={'#8257f7'}   />
      </motion.div>
        <div className=' divider divider-primary mx-3 md:mx-10'>
        </div>
      </div>

        <div className='grid  grid-rows-1 lg:flex lg:flex-row lg:justify-around lg:items-center gap-5  lg:gap-10 w-[95%]  md:mt-5 mb-8 p-4  bg-neutral rounded-[16px] shadow-sm shadow-neutral'>
            
            {!erreur   ?( 
              <div className='flex flex-col w-full lg:w-2/3 py-2.5'>
              <input value={texte} onChange={handleText} type="text" placeholder="Title Of New Task..."  className="input mt-3  glass w-full rounded-lg focus:outline-[2px] focus:outline-offset-1 focus:outline-blue-300  "/>
              
            <span className='text-sm text-green-400 mt-1'>{message}</span>
            </div>
            ):( <div className='flex flex-col w-full lg:w-2/3 py-2.5'>
              <input value={texte} onChange={handleText} type="text" placeholder="Title Of New Task..."  className="input mt-3.5 w-full rounded-lg  focus:outline-[2px] focus:outline-offset-1 focus:outline-red-300 border-red-300  "/>
              <span className='text-sm text-red-400 mt-1'>{message}</span>
            </div>)}
          

          
          <Select onValueChange={handleSelectPriorite}>
                      <SelectTrigger className='w-full lg:w-2/3  border-blue-300 glass'>
                          <SelectValue placeholder='Select A Priority'/>
                      </SelectTrigger>
                      <SelectContent className='border-gray glass bg-neutral focus:outline-1 focus:outline-blue-300 '>
                          <SelectGroup className=" rounded-lg focus:outline-1 focus:outline-blue-300 ">
                              <SelectLabel className='italic text-xs font-bold text-red items-center justify-center'>Priorite</SelectLabel>
                              <SelectItem value='Haute' className='focus:bg-blue-400'>Haute</SelectItem>
                                <SelectItem value='Moyenne' className='focus:bg-blue-400'>Moyenne</SelectItem>
                                <SelectItem value='Basse' className='focus:bg-blue-400'>Basse</SelectItem>
                              
                          </SelectGroup>
                      </SelectContent>
                  </Select>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={`w-full  lg:w-1/4 justify-start text-left font-normal hover:bg-neutral hover:border-primary hover:border-1 focus:bg-primary   ${
                    !deadline && "text-muted-foreground"
                  }`}
                >
                  {deadline ? format(deadline, "PPP") : <span> Renseigner le deadline</span>}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </PopoverTrigger>

              <PopoverContent className="w-auto p-0 glass" align="start">

                <Calendar
                 className='hover:bg-primary'
                  mode="single"
                  selected={deadline}
                  onSelect={setDeadline}
                  disabled={(date) =>
                    date <= new Date() //  interdit aujourd’hui et avant
                  }
                />
              </PopoverContent>
            </Popover>

            <button onClick={handleAjout} className="btn btn-primary text-black rounded-[10px] hover:bg-neutral hover:border-primary hover:border-1 hover:text-white">Add New Task <MdAddTask size={25}/> </button>
            < ToastContainer />
        </div>

        <div className='flex flex-col justify-center w-full mt-20 gap-5'>
            
            <motion.div 
            initial={{opacity:0,x:-50}}
             
             whileInView={{opacity:1 ,x:0}}
             viewport={{once:false,amount:0.3}}
             transition={{duration:0.8 ,ease:"easeOut"}}className='flex justify-end text-3xl md:text-5xl mr-10  gap-3 whitspace-nowrap md:gap-5' >Tasks Manage <BiStats className='h-10 w-10 md:h-15 md:w-15' color={'#8257f7'}/></motion.div>
                 <div className=' divider divider-primary mx-3 md:mx-10'>
                </div>
            </div>
          
        <div className='flex flex-col w-full justify-center items-center '>
          <div className='flex flex-col  bg-neutral rounded-[16px] w-[93%] shadow-sm shadow-base-300 p-5'>
           
           {/* option de tri */}
            
          
            <Select onValueChange={handleOptionTri}>
                      
                <SelectTrigger className='w-[90%]  lg:w-1/3 my-5 mx-5   border-blue-300 glass'>
                          <SelectValue placeholder='Option de tri'/>
                </SelectTrigger>

                <SelectContent className='border-gray glass bg-neutral focus:outline-1 focus:outline-blue-300 '>
                  <SelectGroup className=" rounded-lg focus:outline-1 focus:outline-blue-300 ">
                    <SelectLabel className='italic text-xs font-bold text-red items-center justify-center'>Tri Selon la :  </SelectLabel>
                      <SelectItem value='Priorite' className='focus:bg-blue-400'>Priorite</SelectItem>
                      <SelectItem value='Status' className='focus:bg-blue-400'>Status</SelectItem>
                              
                  </SelectGroup>
                </SelectContent>
              </Select>

              {/* Secttion de filtre */}
              <div className='grid grid-cols-1 md:grid-cols-1 lg:flex lg:flex-row gap-5 justify-center items-center w-full  '>
                <div className='place-items-center justify-self-center w-[95%] lg:w-1/4 p-4 lg:p-4 lg:flex lg:justify-start order-1'>
                  <button className={`btn btn-soft rounded-[10px] w-full px-4 py-2.5 gap-2 ${filtered === "Tous" ? "btn-primary" : " "} whitespace-nowrap`} onClick={() => setFilter("Tous")}> <FaCheckToSlot size={20}/>Tous ({Todos.length})</button>
              </div>
              {
              optiontri==='Priorite' ? (

                <div className='order-2 place-items-center justify-self-center flex flex-row w-[90%] justify-between lg:order-2 lg:flex lg:flex-row lg:justify-around lg:gap-4  md:flex md:flex-row  md:gap-4 md:justify-arround md:w-full  h-fit gap-3 md:order-2 '>
                  <button className={`btn btn-soft text-xs  w-1/4 md:text-sm md:p-2 md:w-1/4 rounded-[10px] gap-2  p-3  ${filtered === "Basse" ? "btn-primary" :" "} whitespace-nowrap`}   onClick={()=>setFilter("Basse")}><MdOutlineLowPriority size={20}  />Basses ({getNumTask("Basse")}) </button> 
                  <button className={`btn btn-soft text-[11px] w-1/4 md:text-sm md:p-3 md:w-1/4 rounded-[10px] p-2 ${filtered === "Moyenne" ? "btn-primary" : " "} whitespace-nowrap`} onClick={() => setFilter("Moyenne")}><BiAdjust size={20}/>Moyennes ({getNumTask("Moyenne")})</button>
                  <button className={`btn btn-soft text-xs w-1/4 md:text-sm md:p-3  md:w-1/4 rounded-[10px]  p-3  ${filtered === "Haute" ? "btn-primary" :" "} whitespace-nowrap`}   onClick={()=>setFilter("Haute")}><LuCircleFadingArrowUp size={20}/> Hautes ({getNumTask("Haute")})</button>
                </div>
                ):
              optiontri==='Status' &&(

                  <div className='order-2 flex flex-row w-[90%] justify-around lg:order-2 lg:flex lg:flex-row lg:justify-around lg:gap-4  md:flex md:flex-row  md:gap-4 md:justify-arround md:w-full  h-fit gap-3 md:order-2 '>
                    <button className={`btn btn-soft text-xs  w-1/4 md:text-sm md:p-2 md:w-1/4 rounded-[10px] gap-2  p-3  ${filtered === "En attente" ? "btn-primary" :" "} whitespace-nowrap`}   onClick={()=>setFilter("En attente")}>En attentes ({getNumTask("En attente")}) </button>
                    <button className={`btn btn-soft text-xs  w-1/4 md:text-sm md:p-2 md:w-1/4 rounded-[10px] gap-2  p-3  ${filtered === "En cours" ? "btn-primary" :" "} whitespace-nowrap`}   onClick={()=>setFilter("En cours")} >En cours ({getNumTask("En cours")})</button>
                    <button className={`btn btn-soft text-xs  w-1/4 md:text-sm md:p-2 md:w-1/4 rounded-[10px] gap-2  p-3  ${filtered === "Terminee" ? "btn-primary" :" "} whitespace-nowrap`}   onClick={()=>setFilter("Terminee")}  >Terminees ({getNumTask("Terminee")})</button>
                  </div>


              )}

                <div className='place-items-center justify-self-center mt-5  order-3 w-[90%] md:w-[90%] md:justify-center  md:order-3 lg:order-3 lg:w-1/4 lg:p-4 lg:flex lg:justify-center '>
                  <button className="btn btn-primary w-full whitespace-nowrap" disabled={selectedTodos.size < 1} onClick={finishTodos}>
                   {selectedTodos.size === 0 ?(
                    `Finir Selection `
                   ):(
                    `Finir Selection (${selectedTodos.size})`
                   )}
                  </button>
                </div>

              

              </div>
              <div className='gap-5 p-5'>
              <Table
                todos={filterTodos}
                onRemove={handleRemoveTodo}
                onChangeSet={handleSetSelectFromTable}
                termTodos={todosTermines}
                onUpdate={handleUpdateTodo} // <--- Ajoutez cette prop
            />  
              </div>
             </div>
          </div>
        </div>
     
  )
}

export default Todo
