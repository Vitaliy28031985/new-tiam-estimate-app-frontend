'use client'
import { useEffect, useState } from "react";
import EstimateItem from "./Estimate";
import { useUser } from "@/app/context/UserContext";
import { ProjectItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";

 
 interface EstimateToggleProps {
  projectId: string;
}

const EstimateToggle: React.FC<EstimateToggleProps> = ({ projectId }) => {
    const { user } = useUser();
    const [project, setProject] = useState<ProjectItem | null>(null);
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
        
   

    // console.log(isAllow);

    

    return (
        <div>
            {user?._id === project?.owner && (
            <div className="flex items-center justify-end gap-6 mt-6 mb-6">
                <div> <button className="block font-medium text-sm px-3 py-1 text-blue-25" >Основний</button><div className="w-full h-[1px] bg-blue-25"></div></div>
                <div><button className="block font-medium text-sm px-3 py-1 text-blue-25" >Знижений</button><div className="w-full h-[1px] bg-blue-25"></div></div>
            </div>    
            )}

            {isAllow && isAllow[0]?.lookAt === 'all' && (
              <div className="flex items-center justify-end gap-6 mt-6 mb-6">
                <div> <button className="block font-medium text-sm px-3 py-1 text-blue-25" >Основний</button><div className="w-full h-[1px] bg-blue-25"></div></div>
                <div><button className="block font-medium text-sm px-3 py-1 text-blue-25" >Знижений</button><div className="w-full h-[1px] bg-blue-25"></div></div>
            </div>    
            )}

           
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