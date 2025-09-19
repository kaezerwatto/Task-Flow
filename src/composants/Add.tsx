import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
   
} from '@/components/ui/select'

import type  {Priorite} from "./Todo"



function Add(valeur:Priorite){
    return(
        <Select value={valeur}>
            <SelectTrigger className='w-1/3'>
                <SelectValue placeholder='Select A Priority'/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Priorite</SelectLabel>
                    <SelectItem value='Haute'>Haute</SelectItem>
                     <SelectItem value='Moyenne'>Moyenne</SelectItem>
                      <SelectItem value='Basse'>Basse</SelectItem>
                    
                </SelectGroup>
            </SelectContent>
        </Select>

    )
}

export default Add