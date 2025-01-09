'use client'
import Unit from "@/app/interfaces/unitInterface";
import { getUnits, addUnit, deleteUnit } from "@/app/utils/unit";
import { ChangeEvent, useEffect, useState } from "react";
import Notification from "@/app/UI/Notifications/Notifications";


 const UnitComponent = () => {
    const [data, setData] = useState<Unit[] | null | undefined>(null);
    const [id, setId] = useState('');
    const [unit, setUnit] = useState('');
    const [deleteUnitToggle, setDeleteUnitToggle] = useState('');
    const [changeRender, setChangeRender] = useState(false);
    const [message, setMessage] = useState('');
    const [notificationIsOpen, setNotificationIsOpen] = useState(false);
    const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Оновлення' | 'Додати' | 'Видалити' >('Оновлення');

    const toggleRender = (): void => setChangeRender(render => !render);

    const defaultData = {
         _id: "6735cf9bd38738b09dbrwerwer",
        title: "Вибери для видалення",
        owner: "6735c438d38738b09db4950b",
        createdAt: "2024-11-14T10:23:23.208Z",
        updatedAt: "2024-11-14T10:23:23.208Z"
    }

    const getAllUnits = async () => {
        const units = await getUnits();
        if (units) {
            const newData: Unit[] = [defaultData];
            units.map(item => newData.push(item))
            
         setData(newData);   
        } 
    }

    useEffect(() => { getAllUnits() }, [changeRender]);

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

      const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(id === "unit") {
            const data = await addUnit(unit);
            if (!data.status) {
                setMessage('Одиницю виміру користувача успішно додано!');
                setType('info');
                setNotificationTitle('Додати');
                setNotificationIsOpen(true);
            } else {
                setMessage('Помилка: ' + (data.data?.message));
                setType('error');
                setNotificationTitle('Помилка');
                setNotificationIsOpen(true); 
            }
            toggleRender();
            setUnit('');
            return;
        }
        if(deleteUnitToggle !== '') {
            const data = await deleteUnit(deleteUnitToggle);
              if (data?.status === 200) {
                setMessage('Одиницю виміру користувача успішно Видалено!');
                setType('info');
                setNotificationTitle('Видалити');
                setNotificationIsOpen(true);
            } else {
                setMessage('Помилка: ' + (data?.data?.message));
                setType('error');
                setNotificationTitle('Помилка');
                setNotificationIsOpen(true); 
            }
            setDeleteUnitToggle('');
             toggleRender();
            return;
        }
       }

    return(
        <div>
        <form onSubmit={handleSubmit} >
            <div className='mb-6'>
            <label className="inline-block font-normal text-base mb-3" htmlFor="unit">Додати одиницю</label>
                <input className="w-[520px] h-[61px] border border-gray-15 px-4 py-5 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none"
             placeholder="Введіть свою одиницю виміру"
                    type="text" name="unit" id="unit" onChange={handleChange} value={unit} />
            </div>
            <div className='mb-6'>
                <label className="inline-block font-normal text-base mb-3" htmlFor="delete">Видалити одиницю</label>
                

              <select
                     className="w-[520px] h-[61px] border border-gray-15 px-4 py-5 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none"
                     name="delete"
                     id="delete"
                     onChange={handleChange}>
                     {data?.map(({title, _id}) => (
                       <option key={_id} value={_id}>
                         {title}
                         </option>
                          ))}
                     
                </select>
                

                </div>
                <button className="w-[520px] h-[50px] text-center bg-blue-30 py-3 px-8 font-bold text-base text-white rounded-full hover:bg-blue-20 focus:bg-blue-20 disabled:text-gray-10" 
                type="submit" >{unit !== '' ? "Зберегти" : "Видалити"}
            </button>
                
            </form>
         {notificationIsOpen && (
          <Notification     
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />

      )}
        </div>
    )
}

export default UnitComponent
