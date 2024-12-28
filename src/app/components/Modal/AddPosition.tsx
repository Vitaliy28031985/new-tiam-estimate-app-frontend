'use client'

import { Position, Price } from "@/app/interfaces/positions";
import Unit from "@/app/interfaces/unitInterface";
import { getProject } from "@/app/utils/projects";
import { getUnits } from "@/app/utils/unit";
import { useEffect, useState } from "react";

interface AddPositionProps {
    projectId: string;
    isGetData: (data: Position) => Promise<void>;
}

const AddPosition: React.FC<AddPositionProps> = ({  isGetData, projectId }) => {
    
    const [prices, setPrices] = useState<Price[] | null | undefined>(null);
    const [data, setData] = useState<Unit[] | null | undefined>(null);
    const [title, setTitle] = useState('');
    const [unit, setUnit] = useState('');
    const [number, setNumber] = useState('');
    const [price, setPrice] = useState('');
    const [priceShow, setPriceShow] = useState(false);

     const defaultData = {
          _id: "6735cf9bd38738b09dbrwerwer",
        title: "Вибери для видалення",
        owner: "6735c438d38738b09db4950b",
        createdAt: "2024-11-14T10:23:23.208Z",
        updatedAt: "2024-11-14T10:23:23.208Z"
    }

     const getAllData = async () => {
         const units = await getUnits();
          const estimate = await getProject(projectId);
        if (units) {
            const newData: Unit[] = [defaultData];
            units.map(item => newData.push(item))
            setData(newData);   
         } 
         if (estimate) {
             setPrices(estimate.prices);
         }
    }

    useEffect(() => { getAllData() }, []);

  const normalizeFilter = title.toLowerCase();
     
    const filteredPrices = prices?.filter(item =>
        item.title.toLowerCase().includes(normalizeFilter)) ?? [];    
     const showMiddleList = priceShow && filteredPrices.length !== 0;


    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
       const { name, value } = e.currentTarget;
        
        switch (name) {
          case 'title':
            setTitle(value);
            if (value !== '') {
            setPriceShow(true); 
            setPrice('');   
            } else {
            setPriceShow(false); 
            }
                break;
            
             case 'unit':
            setUnit(value);
                break;
            
             case 'number':
            setNumber(value);
                break;
            
            case 'price':
            setPrice(value);
            break;
               default:
               return;  
        }
         
    };

    const onSubmit = async () => {
        
        if (title !== '' && unit !== '' && number !== '' && price !== '') {
            if(isGetData)
            isGetData({ title, unit, number: Number(number), price: Number(price) })
        }
      
    }
  

    return (
        
        <tr>
            <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center"></p></td>
            <td className="border border-gray-20 p-3"><input onChange={onChange} value={title} name="title" className="w-full text-xs font-normal focus:outline-none"/></td>                 
            <td className="border border-gray-20 p-3">
                  <select
                     className="w-full text-xs text-center font-normal focus:outline-none"
                     name="unit"
                     id="delete"
                     onChange={onChange}>
                     {data?.map(({title, _id}) => (
                       <option key={_id} value={title}>
                         {title}
                         </option>
                          ))}    
                </select>
            </td>
            <td className="border border-gray-20 p-3"><input type="number" onChange={onChange} value={number} name="number"  className="w-full text-center text-xs font-normal focus:outline-none"/></td>
            <td className="border border-gray-20 p-3"><input type="number" onChange={onChange} value={price} name="price" className="w-full text-center text-xs font-normal focus:outline-none"/></td>   
            <td className="border border-gray-20 p-3"></td>
            <td className="border border-gray-20 p-3"></td>
            {showMiddleList && (
                <ul className='w-64 absolute bottom-9 py-3  left-20 z-40 bg-white shadow-middlePrices rounded-b-3xl'>
                { filteredPrices && filteredPrices.map(({ _id, title, price }) => (
                <li className='border border-b-gray-25 border-x-white border-t-white 
                 py-2 px-1 text-sm font-normal hover:bg-gray-5 focus:bg-gray-5 cursor-default'
                onClick={() => { setTitle(title); setPrice(price.toString()); setPriceShow(false) }}
                key={_id}>{title}</li>      
                ))}     
                </ul>     
                       )}
            <button
                className="absolute bottom-0 right-0 z-10 p-4 bg-blue-30 rounded-full text-sm text-white font-bold hover:bg-blue-20 focus:bg-blue-20"
                type="button" onClick={onSubmit}>Зберегти зміни
            </button>
        </tr>
       
    );
}

export default AddPosition;