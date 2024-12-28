'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { EstimatePosition, ProjectItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";
import EstimateItem from "./Estimate/Estimate";



interface ProjectProps {
  projectId: string;
}

const Project: React.FC<ProjectProps> = ({ projectId }) => {
    const [data, setData] = useState<ProjectItem| null>(null);
    
useEffect(() => { getEstimate() }, [])

    async function getEstimate() {
       const estimate = await getProject(projectId);
        if (estimate) {
            const newEstimates = estimate?.estimates?.map(item => ({
                        ...item,
                        isShow: false,
                        isDelete: false,
                        isAdd: false,
                        positions: item.positions?.map((position: EstimatePosition) => ({
                            ...position,
                            isShow: false,
                            isDelete: false,
                        })) || [],
            }));

            estimate.estimates = newEstimates;            
            setData(estimate); 
        }
           
    }

    

   
    


  return (
      <section>
          <div className="flex justify-center">
             
              <span>
                  <p className="block mb-8 font-semibold text-2xl">Назва кошторису: <span className="font-normal text-base ml-3">{data?.title}</span> </p>
                  <p className="block mb-8 font-semibold text-2xl">Адреса об’єкту: <span className="font-normal text-base ml-3">{ data?.description}</span> </p>
              </span>
          
          </div>

           <ul className="flex items-center justify-center gap-8 mb-8">
                  <li><Link className="font-medium text-xl px-3 py-1 text-blue-25" href={`/`}>Кошторис</Link><div className="w-full h-[1px] bg-blue-25"></div></li>
                  <li><Link className="font-medium text-xl px-3 py-1 text-blue-25" href={`/`}>Прайс</Link><div className="w-full h-[1px] bg-blue-25"></div></li>
                  <li><Link className="font-medium text-xl px-3 py-1 text-blue-25" href={`/`}>Матеріали</Link><div className="w-full h-[1px] bg-blue-25"></div></li>
                  <li><Link className="font-medium text-xl px-3 py-1 text-blue-25" href={`/`}>Аванс</Link><div className="w-full h-[1px] bg-blue-25"></div></li>
          </ul>
          
          <EstimateItem projectId={projectId} />
      </section>
  );
}

export default Project;