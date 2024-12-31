'use client'
import { useEffect, useState } from "react";
import PricesItem from "./PricesList";
import { ProjectItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";
import ChangeProject from "@/app/UI/ChangeProject";
import PricesItemSmall from "./PriceListSmall";
import { getCurrentUser } from "@/app/utils/user";
import { User } from "@/app/interfaces/user";

 
 interface PricesToggleProps {
   projectId: string;
}

const PricesToggle: React.FC<PricesToggleProps> = ({ projectId }) => {
    const [user, setUser] = useState<User | null>(null);
    const [project, setProject] = useState<ProjectItem | null>(null);
    const [data, setData] = useState('large');
    const [sizeEstimate, setSizeEstimate] = useState(true);
   
    
      useEffect(() => {
             getEstimate()
             fetchUser()
           }, []);
           
             async function getEstimate() {
             if (projectId !== null) {  
                 const estimate = await getProject(projectId);
                 if (estimate) {
                 setProject(estimate); 
                 }
             }
       }
       
            const fetchUser = async () => {
                   try {
                     const userData = await getCurrentUser();
                       setUser(userData);
                   } catch (error) {
                       console.error('Failed to fetch user', error);
                       setUser(null);
                   }
               };

    const isAllow = user?.projectIds?.filter(({ id }) => id === projectId);
        
   

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value, } = e.currentTarget;
    switch (name) {
      case 'project':
            if (value === 'large') {
                setData(value);
                setSizeEstimate(true);
        } else {
                setSizeEstimate(false);
                setData(value)
        }
        break;

      default:
        return;
    }

  }
    return (
     
         <div>
            {user?._id === project?.owner && (
           <ChangeProject changeCheckbox={handleChange} data={data} />    
            )}

            {isAllow && isAllow[0]?.lookAt === 'all' && (<ChangeProject changeCheckbox={handleChange} data={data} /> )}

           
            {user?._id === project?.owner && (
                <div> {sizeEstimate ? (<PricesItem user={user} projectId={projectId} />) : (<PricesItemSmall user={user} projectId={projectId}/>)}</div>
            )}
            
            {isAllow && isAllow[0]?.lookAt === 'all' && (
                 <div> {sizeEstimate ? (<PricesItem user={user} projectId={projectId} />) : (<PricesItemSmall user={user} projectId={projectId}/>)}</div>
            )}

            {isAllow && isAllow[0]?.lookAt === 'small' && (
                <PricesItemSmall user={user} projectId={projectId}/>
            )}
           
             {isAllow && isAllow[0]?.lookAt === 'large' && (
                <PricesItem user={user} projectId={projectId} />
            )}

        </div>
    )
 }

export default PricesToggle;