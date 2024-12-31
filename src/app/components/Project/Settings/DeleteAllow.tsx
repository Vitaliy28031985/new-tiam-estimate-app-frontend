'use client'
import { ProjectItem } from "@/app/interfaces/projects";
import { User } from "@/app/interfaces/user";
import { deleteAllow } from "@/app/utils/settingsProject";
import { getUsers } from "@/app/utils/user";
import { useEffect, useState } from "react";


interface AddEstimateModalProps {
    project: ProjectItem | null
    id?: string | undefined;
     toggle?: () => void;
   }
const DeleteAlow: React.FC<AddEstimateModalProps> = ({ id, toggle, project,  }) => {
    const [userData, setUserData] = useState<User[] | null>(null);
    const [email, setEmail] = useState('');
    

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
    
   
    const onSubmit = async () => {
        if (id) {
            const newData: {
                email: string,
                projectId: string,
            } =
            {
                email,
                projectId: id,
                
            };
            await deleteAllow(newData);
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
                        <label className="block font-normal text-base mb-2" htmlFor="email">Email користувача якому потрібно забрати доступ</label>
                    <select name="email" id="email" onChange={onChange}
                    className="w-[580px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none">
                        {userEmailList?.map(email =>
                           (<option key={id} value={email} >{email}</option>))}
                           {email === '' && (<option value="" selected>Вибери email для видалення доступу</option>)}
                     </select>
                </div>
                
               
                    <button className="w-[580px] h-[49px] bg-blue-30 py-4 rounded-full text-white text-center text-sm font-bold  focus:bg-blue-25 hover:bg-blue-25">Забрати доступ</button>
                </form>
        </div>
    )
}

export default DeleteAlow;

