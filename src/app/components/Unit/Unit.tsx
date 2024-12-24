'use client'
import { ChangeEvent, useState } from "react";

export default function Unit() {
    const [id, setId] = useState('');
    const [unit, setUnit] = useState('');
    const [deleteUnitToggle, setDeleteUnitToggle] = useState('');

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {

        const { name, value, id } = e.currentTarget;
        switch (name) {
        case 'unit':
            setUnit(value);
            setId(id);
            break;
        case 'delete':
            setDeleteUnitToggle(value);
             setId(id);
             break;
      
          default:
            return;
        }
      };

//       const handleSubmit = async (e) => {
//         e.preventDefault();
//         if(id === "unit") {
//             await addUnit({ title: unit });
        
//             setUnit('');
//             return;
//         } 
//         if(deleteUnitToggle !== '') {
//             await deleteUnit(deleteUnitToggle)
// ;
//             setDeleteUnitToggle('');
//             return;
//         }
//        }

//     //    console.log(deleteUnit)

//        const empty = unit === '' && deleteUnitToggle === '';

    return(
        
        <form >
            <div className='mb-6'>
            <label className="inline-block font-normal text-base mb-3" htmlFor="unit">Додати одиницю</label>
                <input className="w-[520px] h-[61px] border border-gray-15 px-4 py-5 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none"
             placeholder="Введіть свою одиницю виміру"
                    type="text" name="unit" id="unit" onChange={handleChange} value={unit} />
            </div>
            <div className='mb-6'>
                    <label className="inline-block font-normal text-base mb-3"  htmlFor="delete">Видалити одиницю</label>
                    <select className="w-[520px] h-[61px] border border-gray-15 px-4 py-5 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none"  name="delete" id="delete" onChange={handleChange} >
                        {/* {data?.map(({title, _id}) =>
                           (<option value={_id} >{title}</option>))}
                           {deleteUnitToggle === '' && (<option value="" selected>Вибери для видалення</option>)} */}
                     </select>
                </div>
                <button className="w-[520px] h-[50px] text-center bg-blue-30 py-3 px-8 font-bold text-base text-white rounded-full hover:bg-blue-20 focus:bg-blue-20 disabled:text-gray-10" type="submit" >Зберегти
                     {/* className={empty ? "button-disabled-unit" : "unit-Button"} type="submit">{unit !== '' ? "Зберегти" : "Видалити"} */}
                </button>
        
        </form>
    )
}

