
import { type TodoProps, type TodosList, Priorite } from './Todo';
import { TbEdit } from 'react-icons/tb';
import {  LuAlarmClockMinus, LuBadgeCheck, LuTrash2 } from 'react-icons/lu';
import { RiLoader2Line } from 'react-icons/ri';
import { BsArrowDown, BsArrowUp,BsArrowDownUp, BsCalendar2Check } from 'react-icons/bs';
import { CalendarIcon, ConstructionIcon } from 'lucide-react';

import { useState } from 'react';
import { FaRegFaceSmileWink } from 'react-icons/fa6';
import { IoBanOutline } from 'react-icons/io5';
import {PiSmileyMeltingFill} from 'react-icons/pi';
import EditModal from './EditModal';
import { toast } from 'react-toastify';
import { format } from 'date-fns';


// AJOUT: Interface pour recevoir la fonction de suppression
interface TableProps extends TodosList {
    onRemove: (id: number) => void;
    onChangeSet: (id: number) => void;
    termTodos: TodoProps[];
    onUpdate: (updatedTodo: TodoProps) => void; // Nouvelle prop pour la mise à jour
}

export default function Table ({todos, onRemove,onChangeSet,termTodos,onUpdate}: TableProps) {
    const [selectedTodos, setSelectTodos]=useState<Set<number>>(new Set())
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [todoToEdit, setTodoToEdit] = useState<TodoProps | null>(null);


        const handleEdit = (todo: TodoProps) => {
        setTodoToEdit(todo);
        setIsEditModalOpen(true);
    };

       const handleSaveEdit = (updatedTodo: TodoProps) => {
        let finalTodo = updatedTodo;

        // Check if the status has been changed to "Terminee"
        if (updatedTodo.statut === "Terminee") {
            // Update the completed_at field with the current date
            finalTodo = {
                ...updatedTodo,
                completed_at: format(new Date(), "dd-MM-yyyy")
            };
        }

        onUpdate(finalTodo); // Call the parent update function with the finalTodo
        toast.success("Tâche modifiée avec succès", { position: "top-right" });
        setIsEditModalOpen(false);
        setTodoToEdit(null);
    };


    // console.log(`filteredTodos : ${todos.length}`)
    
    
    function handleRemove(id: number){
        onRemove(id);  // Appel de la fonction du parent
    }

    
  function toggleSelect(id: number) {
    const tache = todos.find((todo) => todo.id === id); 
  setSelectTodos((prev) => {
    const newSet = new Set(prev);
    if (newSet.has(id)) {
        console.log(`Delete de ${id}`)
      newSet.delete(id); // si déjà coché → on retire
    } else {
        console.log(`Ajout de ${id}`)
      newSet.add(id); // sinon → on ajoute
    }
    return newSet;
  });

  onChangeSet((prev:any) => {
    const newSet = new Set(prev);   
    
    if (tache && tache.statut === "Terminee") {
        console.log(`La tâche ${id} est déjà terminée et ne sera pas modifiée dans termTodos.`);
        newSet.add(tache.id)
        return prev; // Ne rien faire si la tâche est déjà terminée
    }
    
    if (newSet.has(id)) {
        console.log(`Delete de ${id}`)
      newSet.delete(id); // si déjà coché → on retire
    } else {
        console.log(`Ajout de ${id}`)
      newSet.add(id); // sinon → on ajoute
    }
    return newSet;
  });
}

console.log(`Tache Terminee : ${termTodos}`)


    return (
        <div className='flex flex-col'>
            
            <div className="overflow-x-auto my-10">
                {todos.length > 0 ? (
                    <>
                    <table className="table">
                        <thead>
                            <tr>
                                <th>Finir</th> 
                                <th>Titre</th>
                                <th>Priorite</th>
                                <th>Status</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {todos.filter((todo)=> todo.statut!="Terminee").map((todo) => (

                                <tr key={todo.id} className='hover'>
                                    <th>
                                        <label>
                                            <input
                                                type="checkbox"
                                                className=" checkbox checkbox-md checkbox-primary"
                                                checked={(selectedTodos.has(todo.id) || todo.statut==="Terminee")}
                                                onChange={() => toggleSelect(todo.id)}
                                                />

                                        </label>
                                    </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="text-xl font-bold">{todo.titre}</div>
                                                <div className="badge badge-ghost rounded-lg flex flex-row whitespace-nowrap badge-sm mt-2 p-4 opacity-50">
                                                    <CalendarIcon size={15}/>
                                                    <span className='text-xs whitespace-nowrap'>Create at {todo.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>

                                            { todo.priorite === 'Basse' ? (
                                            <div className='flex flex-col  gap-4'>
                                                <span className='badge  badge-soft badge-error p-4 rounded-lg whitespace-nowrap' >
                                                    <BsArrowDown/>
                                                    {todo.priorite}
                                                </span>
                                            </div>
      
                                        ):
                                            todo.priorite=== 'Moyenne' ? (
                                        <span className='badge badge-soft   badge-success p-4 rounded-lg whitespace-nowrap'>
                                                    <BsArrowDownUp/>
                                                    {todo.priorite}
                                                </span>
                                        ):
                                            todo.priorite==='Haute' &&(
                                                <span className='badge badge-soft badge-warning p-4 rounded-lg whitespace-nowrap'>
                                                    <BsArrowUp/>
                                                    {todo.priorite}</span>
                                            )
                                        
                                    }
                                        

                                    </td>
                                    <td>
                                        
                                            {todo.statut==="En cours" ?(
                                            <span className='flex flex-row  whitespace-nowrap gap-3'>
                                                <RiLoader2Line size={22} className='text-yellow-500 animate-spin'/> 
                                                {todo.statut}
                                            </span>
                                            ) : todo.statut === "En attente" ? (
                                                <span className='flex flex-row  whitespace-nowrap gap-3'>
                                                    <LuAlarmClockMinus size={20} className='text-red-500 animate-pulse'/> 
                                                    {todo.statut}
                                                </span>
                                            ) : todo.statut === "Terminee" && (
                                                <span className='flex flex-row  whitespace-nowrap gap-3'>
                                                    <LuBadgeCheck size={20} className='text-green-500 animate-bounce'/> 
                                                    {todo.statut}
                                                </span>
                                            )
                                        }  
                                        
                                    </td> 
                                    <td>
                                        <span className='badge badge-ghost rounded-lg flex flex-row whitespace-nowrap badge-sm p-4 opacity-50'><CalendarIcon size={15}/>{todo.deadline}</span>
                                    </td>
                                    <th>
                                        <div className='flex flex-row gap-3'>
                                            <button
                                                className="btn btn-soft btn-success btn-sm"
                                                onClick={() => handleEdit(todo)} // <--- Mise à jour ici
                                            >
                                                <TbEdit size={20} color={'#51DF3FFF'}/>
                                            </button>
                                            <button 
                                                className="btn btn-soft btn-error btn-sm" 
                                                onClick={() => handleRemove(todo.id)}
                                            >
                                                <LuTrash2 size={20} color={'#f54040'} />
                                            </button>
                                        </div>
                                    </th>
                                    
                                </tr>
                            
                           ))}
                           

                          
                                {termTodos.length > 0 ? (
                                <>
                                

                                {/* <tr>
                                    <td colSpan={6}>
                                    <div className="divider divider-start w-full mt-10"><span className='text-2xl'>Tâches terminées</span></div>
                                    </td>
                                </tr> */}
                                {termTodos.map((todo) => (

                                    <tr key={todo.id} className='hover opacity-50 '>
                                         <th>

                                                <button disabled={true} className='cursor-not-allowed'><IoBanOutline size={25} className='text-red-500' /> </button>
                                        </th>
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <div>
                                                <div className="text-xl font-bold">{todo.titre}</div>
                                                <div className="badge badge-ghost rounded-lg flex flex-row whitespace-nowrap badge-sm mt-2 p-4 opacity-50">
                                                    <CalendarIcon size={15}/>
                                                    <span className='text-xs whitespace-nowrap'>Create at {todo.date}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>

                                            { todo.priorite === 'Basse' ? (
                                            <div className='flex flex-col  gap-4'>
                                                <span className='badge  badge-soft badge-error p-4 rounded-lg whitespace-nowrap' >
                                                    <BsArrowDown/>
                                                    {todo.priorite}
                                                </span>
                                            </div>
      
                                        ):
                                            todo.priorite=== 'Moyenne' ? (
                                        <span className='badge badge-soft   badge-success p-4 rounded-lg whitespace-nowrap'>
                                                    <BsArrowDownUp/>
                                                    {todo.priorite}
                                                </span>
                                        ):
                                            todo.priorite==='Haute' &&(
                                                <span className='badge badge-soft badge-warning p-4 rounded-lg whitespace-nowrap'>
                                                    <BsArrowUp/>
                                                    {todo.priorite}</span>
                                            )
                                        
                                    }
                                        

                                    </td>

                                    <td>
     
                                        <span className='flex flex-row  whitespace-nowrap gap-3'>
                                            <LuBadgeCheck size={20} className='text-green-500 animate-bounce'/> 
                                            {todo.statut}
                                        </span>
   
                                    </td> 

                                    <td>
                                        <span className='badge badge-ghost rounded-lg flex flex-row whitespace-nowrap badge-sm p-4 opacity-50'><BsCalendar2Check  size={15}/>Done at {todo.completed_at}</span>
                                    </td>
                                    
                                    <th>
                                        <div className='flex flex-row gap-3'>

                                            <button 
                                                className="btn btn-soft btn-error btn-sm" 
                                                onClick={() => handleRemove(todo.id)}
                                            >
                                                <LuTrash2 size={22} color={'#f54040'} />
                                            </button>
                                        </div>
                                    </th>
                                    </tr>
                                
                                ))}

                                </>) 
                                : null}
                                    
                        </tbody>
                    </table>
            
                
            </>

            ) : (
                    <div className='flex flex-col gap-5 justify-center items-center  '>
                        <div className='p-5'>
                            <ConstructionIcon strokeWidth={1} size={250} className='text-blue-500 ' />
                        </div>
                        <div className='flex flex-row gap-3 whitespace-nowrap justify-center items-center'>
                            <p className="italic whitespace-nowrap "> Aucunes taches pour le moment </p>
                            <PiSmileyMeltingFill  className='text-yellow-500' size={25}/>
                        </div>
                    </div>
                )}
            </div>

            <div className='flex flex-col'>
                {/* ... votre tableau */}
                <EditModal
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    todoToEdit={todoToEdit}
                    onSave={handleSaveEdit}
                />
            </div>
        </div>
    );
}