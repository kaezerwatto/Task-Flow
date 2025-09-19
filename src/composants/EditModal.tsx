import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { TodoProps, Priorite, statut } from './Todo'; // Assurez-vous d'importer vos types
import { TbShoppingBagEdit } from 'react-icons/tb';
import { MdOutlineArrowBackIosNew,MdArrowForwardIos } from 'react-icons/md';
import { BsCheckAll } from 'react-icons/bs';

interface EditModalProps {
    isOpen: boolean;
    onClose: () => void;
    todoToEdit: TodoProps | null;
    onSave: (updatedTodo: TodoProps) => void;
}

const statusOrder = ["En attente", "En cours", "Terminee"];

export default function EditModal({ isOpen, onClose, todoToEdit, onSave }: EditModalProps) {
    const [editedTodo, setEditedTodo] = useState<TodoProps | null>(null);
    const [step, setStep] = useState<number>(0);
    const [load ,setLoad]=useState<boolean>(false)

    useEffect(() => {
        if (todoToEdit) {
            setEditedTodo({ ...todoToEdit });
            setStep(0); // Reset le stepper à l'ouverture de la modale
        }
    }, [todoToEdit]);

   const handleSave = () => {
  if (editedTodo) {
    setLoad(true);

    // Simulation d’un appel API (2 secondes)
    setTimeout(() => {
      onSave(editedTodo);  // sauvegarde la tâche
      setLoad(false);      // enlève le spinner
      onClose();           // ferme la modale
    }, 2000);
  }
};


    const handleCancel = () => {
        if (window.confirm("Êtes-vous sûr d'annuler les modifications ?")) {
            onClose();
        }
    };

    const handleNextStep = () => {
        setStep(prev => prev + 1);
    };

    const handlePrevStep = () => {
        setStep(prev => prev - 1);
    };

    if (!editedTodo) return null;

    const currentStatusIndex = statusOrder.indexOf(editedTodo.statut);
    const availableStatus = statusOrder.filter((s, index) => {
        if (editedTodo.statut === "En attente") {
            return index >= currentStatusIndex; // peut passer à "En cours" ou "Terminee"
        }
        if (editedTodo.statut === "En cours") {
            return index >= currentStatusIndex; // peut passer à "Terminee"
        }
        return s === editedTodo.statut; // "Terminee" ne peut pas changer
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]  bg-base-100 border-none shadow-sm shadow-neutral">
                <DialogHeader>
                    <DialogTitle> <TbShoppingBagEdit className='text-blue-500 absolute top-5 mr-10  left-2' size={25}/><span className='ml-5'>Update Task</span></DialogTitle>
                    
                </DialogHeader>

                {/* Stepper (simulé avec des conditions) */}
                <div className="flex justify-center items-center w-full my-8 steps gap-4">
                    
                        <div className={` step w-full  font-bold ${step >= 0 ? 'step-primary' : ''}`}>Details</div>
             
                        <div className={` step w-full   font-bold ${step >= 1 ? 'step-primary' : ''}`}>Statut</div>
                        
                        <div className={`step w-full  font-bold ${step >= 2 ? 'step-primary' : ''}`}>Valider</div>
                      
                </div>

                {/* Étape 1: Titre, Priorité, Deadline */}
                {step === 0 && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Titre</Label>
                            <Input
                                id="title"
                                value={editedTodo.titre}
                                onChange={(e) => setEditedTodo({ ...editedTodo, titre: e.target.value })}
                                className="col-span-3"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="priority" className="text-right">Priorité</Label>
                            <Select
                                value={editedTodo.priorite}
                                onValueChange={(value) => setEditedTodo({ ...editedTodo, priorite: value as Priorite })}
                            >
                                <SelectTrigger className="col-span-3 glass w-2/3 ">
                                    <SelectValue placeholder="Choisir la priorité" />
                                </SelectTrigger>
                                <SelectContent className='glass'>
                                    <SelectItem value="Basse" className='focus:bg-blue-400'>Basse</SelectItem>
                                    <SelectItem value="Moyenne" className='focus:bg-blue-400'>Moyenne</SelectItem>
                                    <SelectItem value="Haute" className='focus:bg-blue-400'>Haute</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="deadline" className="text-right">Date Limite</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className="col-span-3 hover:bg-blue-400 justify-start text-left font-normal  focus:bg-blue-400"
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4 " />
                                        {editedTodo.deadline ? editedTodo.deadline : "Choisir une date"}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar className='glass'
                                        mode="single"
                                        selected={new Date(editedTodo.deadline.split('-').reverse().join('-'))}
                                        onSelect={(date) => setEditedTodo({ ...editedTodo, deadline: date ? format(date, "dd-MM-yyyy") : '' })}
                                        initialFocus
                                        disabled={(date) => date <= new Date()}
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>
                    </div>
                )}

                {/* Étape 2: Statut */}
                {step === 1 && (
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="status" className="text-right">Statut</Label>
                            <Select
                                value={editedTodo.statut}
                                onValueChange={(value) => setEditedTodo({ ...editedTodo, statut: value as statut })}
                            >
                                <SelectTrigger className="col-span-3 w-3/4">
                                    <SelectValue placeholder="Choisir le statut" />
                                </SelectTrigger>
                                <SelectContent className='glass'>
                                    {availableStatus.map(s => (
                                        <SelectItem key={s} value={s} className='focus:bg-blue-400'>{s}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                )}

                {/* Étape 3: Vérification */}
                {step === 2 && (
                    <div className="py-4">
                        <p className="mb-2">Veuillez vérifier les modifications avant de sauvegarder :</p>
                        <ul className="list-disc list-inside space-y-1">
                            <li className='gap-3 flex flex-row'><BsCheckAll className='text-blue-500' size={20} />Titre : {editedTodo.titre}</li>
                            <li className='gap-3 flex flex-row'><BsCheckAll className='text-blue-500' size={20}/>Priorité : {editedTodo.priorite}</li>
                            <li className='gap-3 flex flex-row'><BsCheckAll className='text-blue-500' size={20}/>Statut : {editedTodo.statut}</li>
                            <li className='gap-3 flex flex-row'><BsCheckAll className='text-blue-500'size={20} />Date Limite : {editedTodo.deadline}</li>
                        </ul>
                    </div>
                )}

                <DialogFooter className="flex flex-row justify-between items-betweeen  mt-4">
                    
                    <div className="flex gap-2 justify-between items-between w-full">

                        {step > 0 && <Button onClick={handlePrevStep} className='btn bg-base-100 hover:btn-primary w-8 h-8 rounded-full'><MdOutlineArrowBackIosNew /></Button>}
                        <Button  className='btn bg-red-500 hover:bg-base-100 hover:border-red-500 hover:border-1' onClick={handleCancel}>Annuler</Button>
                        {step < 2 && <Button onClick={handleNextStep} className='btn bg-base-100  w-8 h-8 hover:btn-primary rounded-full'><MdArrowForwardIos/></Button>}
                        {step === 2 && (
                        <button
                            onClick={handleSave}
                            
                            className={`btn btn-soft btn-primary flex items-center justify-center gap-2 transition-colors 
                            ${load ? " bg-primary/200  cursor-not-allowed text-white" : ""}`}
                        >
                            {load && <span className="loading loading-spinner loading-xs"></span>}
                            {load ? "Processing..." : "Enregistrer"}
                        </button>
                        )}

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}