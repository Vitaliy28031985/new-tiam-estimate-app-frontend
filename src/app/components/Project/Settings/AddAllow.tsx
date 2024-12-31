'use client'
import Checkbox from "@/app/UI/Inputs/Checkbox";
import { saveProject } from "@/app/utils/actionsProject";
import { addAllow } from "@/app/utils/settingsProject";
import { useState } from "react";


interface AddEstimateModalProps {
    id?: string | undefined;
     toggle?: () => void;
   }
const AddAlow: React.FC<AddEstimateModalProps> = ({ id, toggle }) => {
    const [data, setData] = useState('read');
    const [dataLookAt, setDataLookAt] = useState('large')
    const [allowLevel, setAllowLevel] = useState('read');
    const [totals, setTotals] =useState('show')
    const [lookAt, setLookAt] = useState('large');
    const [lookAtTotals, setLookAtTotals] = useState('show')

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, } = e.currentTarget;
        switch (name) {
            case 'allowLevel':
                if (value === 'read') {
                    setData(value);
                    setAllowLevel(value);
        
                }
                if (value === 'write') {
                    setData(value);
                    setAllowLevel(value);
                }
           
                break;
            
            case 'lookAt':
                if (value === 'large') {
                    setDataLookAt(value);
                    setLookAt(value);
        
                }
                if (value === 'small') {
                    setDataLookAt(value);
                    setLookAt(value);
                }
                if (value === 'all') {
                    setDataLookAt(value);
                    setLookAt(value);
                }
           
                break;
            
              case 'lookAtTotals':
                if (value === 'show') {
                    setTotals(value);
                    setLookAtTotals(value);
        
                }
                if (value === 'notShow') {
                    setTotals(value);
                    setLookAtTotals(value);
                }
               
           
                break;

            default:
                return;
        }
    }
   
    const onSubmit = async (formData: FormData) => {
         const result = await saveProject(formData);
        if (id) {
            const newData: {
                email: string,
                projectId: string,
                allowLevel: string,
                lookAt: string,
                lookAtTotals: string
            } =
            {
                email: result.email.toString(),
                allowLevel,
                projectId: id,
                lookAt,
                lookAtTotals
            };
            await addAllow(newData);
        }
       
        try {
            if (toggle) toggle();
        } catch {
            console.error('Щось пішло не так!');  
      }
       
    }

    return (
        <div className="flex justify-center">
               <form action={onSubmit}>
                    <div className="mb-6">
                        <label className="block font-normal text-base mb-2" htmlFor="email">Email користувача якому потрібно надати дозвіл</label>
                        <input name="email" autoComplete="off" defaultValue="" className="w-[580px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none" type="estimate" id="email" placeholder="Введіть email" />
                </div>
                
                <div className="mb-6">
                    <p className="block font-normal text-base mb-2">Рівень доступу:</p>
                    <div className="flex items-center gap-3 mt-3">
                        <Checkbox title="Читати" type="radio" name="allowLevel" data={data} value="read" changeCheckbox={handleChange} />   
                        <Checkbox title="Редагувати" type="radio" name="allowLevel" data={data} value="write" changeCheckbox={handleChange} />   
                    </div>
                </div>

                  <div className="mb-6">
                    <p className="block font-normal text-base mb-2">Які коштористи може бачити користувач:</p>
                    <div className="flex items-center gap-3 mt-3">
                        <Checkbox title="Основний" type="radio" name="lookAt" data={dataLookAt} value="large" changeCheckbox={handleChange} />   
                        <Checkbox title="Знижений" type="radio" name="lookAt" data={dataLookAt} value="small" changeCheckbox={handleChange} />
                        <Checkbox title="Всі" type="radio" name="lookAt" data={dataLookAt} value="all" changeCheckbox={handleChange} /> 
                    </div>
                </div>

                <div className="mb-6">
                    <p className="block font-normal text-base mb-2">Показ звіту:</p>
                    <div className="flex items-center gap-3 mt-3">
                        <Checkbox title="Показувати" type="radio" name="lookAtTotals" data={totals} value="show" changeCheckbox={handleChange} />   
                        <Checkbox title="Не показувати" type="radio" name="lookAtTotals" data={totals} value="notShow" changeCheckbox={handleChange} />   
                    </div>
                </div>

                    <button className="w-[580px] h-[49px] bg-blue-30 py-4 rounded-full text-white text-center text-sm font-bold  focus:bg-blue-25 hover:bg-blue-25">Надати доступ</button>
                </form>
        </div>
    )
}

export default AddAlow;

