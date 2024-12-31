'use client'
import { useEffect, useState } from "react";
import EstimateItem from "./Estimate";
import { ProjectItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";
import ChangeProject from "@/app/UI/ChangeProject";
import EstimateSmallItem from "./EstimateSmall";
import { getCurrentUser } from "@/app/utils/user";
import { User } from "@/app/interfaces/user";
import SettingsModal from "../../Modal/SettingsModal";
import { Cog8ToothIcon } from "@heroicons/react/24/outline";

 
interface EstimateToggleProps {
   projectId: string;
}

const EstimateToggle: React.FC<EstimateToggleProps> = ({ projectId, }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isShowModal, setIsShowModal] = useState(false);
  const [project, setProject] = useState<ProjectItem | null>(null);
  const [data, setData] = useState('large');
  const [sizeEstimate, setSizeEstimate] = useState(true);

   const toggleShow = () => setIsShowModal(toggle => !toggle);
      
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
      <div className="relative">
         <button type="button" onClick={toggleShow}  className="absolute right-0 top-[-200px] z-50"><Cog8ToothIcon className="size-6 text-gray-25 "/></button>
            {user?._id === project?.owner && project?.lowEstimates?.length !== 0 && (
           <ChangeProject changeCheckbox={handleChange} data={data} />    
            )}

            {isAllow && isAllow[0]?.lookAt === 'all' && project?.lowEstimates?.length !== 0 && (<ChangeProject changeCheckbox={handleChange} data={data} /> )}

                    
            
           {user?._id === project?.owner && (
                <div> {sizeEstimate ? (<EstimateItem user={user} projectId={projectId} />) : (<EstimateSmallItem user={user} projectId={projectId}/>)}</div>
            )}
            
            {isAllow && isAllow[0]?.lookAt === 'all' && (
                 <div> {sizeEstimate ? (<EstimateItem user={user} projectId={projectId} />) : (<EstimateSmallItem user={user} projectId={projectId}/>)}</div>
            )}

            {isAllow && isAllow[0]?.lookAt === 'small' && (
                <EstimateSmallItem user={user} projectId={projectId}/>
            )}
           
             {isAllow && isAllow[0]?.lookAt === 'large' && (
                <EstimateItem user={user} projectId={projectId} />
            )}
        {isShowModal && (<SettingsModal project={project} toggle={toggleShow} id={projectId} />)} 
        </div>
    )
 }

export default EstimateToggle;