'use client'
import { useEffect, useState } from "react";
import EstimateItem from "./Estimate";
import { useUser } from "@/app/context/UserContext";
import { ProjectItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";
import ChangeProject from "@/app/UI/ChangeProject";

 
 interface EstimateToggleProps {
  projectId: string;
}

const EstimateToggle: React.FC<EstimateToggleProps> = ({ projectId }) => {
    const { user } = useUser();
    const [project, setProject] = useState<ProjectItem | null>(null);
    const [data, setData] = useState('large');
    const [sizeEstimate, setSizeEstimate] = useState(true);
   
    
      useEffect(() => {
        getEstimate()
      }, []);
      
        async function getEstimate() {
        if (projectId !== null) {  
            const estimate = await getProject(projectId);
            if (estimate) {
            setProject(estimate); 
            }
        }
    }

    const isAllow = user?.projectIds.filter(({ id }) => id === projectId);
        
   

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
                <div> {sizeEstimate ? (<EstimateItem projectId={projectId} />) : (<div>SMALL</div>)}</div>
            )}
            
            {isAllow && isAllow[0]?.lookAt === 'all' && (
                 <div> {sizeEstimate ? (<EstimateItem projectId={projectId} />) : (<div>SMALL</div>)}</div>
            )}

            {isAllow && isAllow[0]?.lookAt === 'small' && (
                <div>Small</div>
            )}
           
             {isAllow && isAllow[0]?.lookAt === 'large' && (
                <div>Large</div>
            )}

        </div>
    )
 }

export default EstimateToggle;