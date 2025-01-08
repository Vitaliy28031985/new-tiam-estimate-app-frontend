'use client'
import { ProjectItem } from "@/app/interfaces/projects";
import { User } from "@/app/interfaces/user";
import Checkbox from "@/app/UI/Inputs/Checkbox";
import { forbiddenFormatMessage } from "@/app/utils/formatFunctions";
import { updateAllow } from "@/app/utils/settingsProject";
import { getUsers } from "@/app/utils/user";
import { useEffect, useState } from "react";


interface AddEstimateModalProps {
    project: ProjectItem | null
    id?: string | undefined;
    toggle?: () => void;
    setMessage?: React.Dispatch<React.SetStateAction<string>>;
    setNotificationIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    setType?: React.Dispatch<React.SetStateAction<'success' | 'error' | 'warning' | 'info'>>;
    setNotificationTitle?: React.Dispatch<React.SetStateAction<'Помилка' | 'Оновлення' | 'Додавання' | 'Знижка' | 'Доступ' | 'Знижений кошторис'>>;
   }
const UpdateAlow: React.FC<AddEstimateModalProps> = ({
    id,
    toggle,
    project,
    setMessage,
    setNotificationIsOpen,
    setType,
    setNotificationTitle
}) => {
    const [userData, setUserData] = useState<User[] | null>(null);
    const [email, setEmail] = useState('');
    const [data, setData] = useState('read');
    const [dataLookAt, setDataLookAt] = useState('large')
    const [allowLevel, setAllowLevel] = useState('read');
    const [totals, setTotals] = useState('show')
    const [lookAt, setLookAt] = useState('large');
    const [lookAtTotals, setLookAtTotals] = useState('show');

    useEffect(() => {
      getAllUsers()  
    }, [])
 
    async function getAllUsers() {
        const users = await getUsers();
        
        if (users && Array.isArray(users)) {
        setUserData(users);
       } else {
        setUserData(null);
        }
     }
    
     const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>): void => {
        const { name, value } = e.currentTarget;
        
        switch (name) {
               case 'email':
                setEmail(value);
                break;
               default:
               return;  
        }
    }
    
    
    
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
   
    const onSubmit = async () => {
        if (id) {
            const newData: {
                email: string,
                projectId: string,
                allowLevel: string,
                lookAt: string,
                lookAtTotals: string
            } =
            {
                email,
                allowLevel,
                projectId: id,
                lookAt,
                lookAtTotals
            };
            const data = await updateAllow(newData);
            if (data.message) {
            if(setMessage)
                setMessage(data.message);
            if(setType)
                setType('info');
            if(setNotificationTitle)
                setNotificationTitle('Доступ');
            if(setNotificationIsOpen)
                setNotificationIsOpen(true);
        } else {
            if(setMessage)
                setMessage('Помилка: ' + (forbiddenFormatMessage(data.data.message) || 'Не вдалося оновити доступ цьому користувачу!'));
            if(setType)           
                 setType('error');
                if(setNotificationTitle)
                setNotificationTitle('Помилка');
                if(setNotificationIsOpen)
                 setNotificationIsOpen(true);
         }
        }
       
        try {
            if (toggle) toggle();
        } catch {
            console.error('Щось пішло не так!');
        }
       
    }


    const userIdList = project?.allowList;
    const userEmailList: string[] = [];

    const renderData = () => {
        if (!userIdList || userIdList.length === 0) {
            return;
        }

        for (let i = 0; i < userIdList.length; i++) {
            const userWithProject = userData?.filter(({_id}) => _id === userIdList[i]) 

      if (userWithProject && userWithProject.length > 0) {
        userEmailList.push(userWithProject[0].email);
      }
        }

    };


    renderData()
    

    return (
        <div className="flex justify-center">
               <form action={onSubmit}>
                    <div className="mb-6">
                        <label className="block font-normal text-base mb-2" htmlFor="email">Email користувача якому потрібно обновити дозвіл</label>
                    <select name="email" id="email" onChange={onChange}
                    className="w-[580px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none">
                        {userEmailList?.map(email =>
                           (<option key={id} value={email} >{email}</option>))}
                           {email === '' && (<option value="" selected>Вибери email для обновлення даних</option>)}
                     </select>
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

                    <button className="w-[580px] h-[49px] bg-blue-30 py-4 rounded-full text-white text-center text-sm font-bold  focus:bg-blue-25 hover:bg-blue-25">Обновити доступ</button>
                </form>
        </div>
    )
}

export default UpdateAlow;

