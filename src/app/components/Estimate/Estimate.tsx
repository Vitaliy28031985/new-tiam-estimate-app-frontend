'use client'
import { useEffect, useState } from "react";
import { PriceItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";


interface EstimateProps {
  projectId: string;
}

const Estimate: React.FC<EstimateProps> = ({ projectId }) => {
    const [data, setData] = useState<PriceItem | null>(null);

    async function getEstimate() {
       const estimate = await getProject(projectId);
        if (estimate) setData(estimate);
    }

    useEffect(() => { getEstimate() }, [])
    
    console.log(data?.title)

  return (
      <section>
          <div className="flex justify-center">
             
              <span>
                  <p className="block mb-8 font-semibold text-2xl">Назва кошторису: <span className="font-normal text-base ml-3">{data?.title}</span> </p>
                  <p className="block mb-8 font-semibold text-2xl">Адреса об’єкту: <span className="font-normal text-base ml-3">{ data?.description}</span> </p>
              </span>
          
          </div>
      </section>
  );
}

export default Estimate;