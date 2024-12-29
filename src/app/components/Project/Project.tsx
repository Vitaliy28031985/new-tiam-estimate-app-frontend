'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProjectItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";
import { usePathname } from "next/navigation";


interface ProjectProps {
  projectId: string;
}

const Project: React.FC<ProjectProps> = ({ projectId }) => {

    const pathname = usePathname();

    const [data, setData] = useState<ProjectItem | null>(null);
    const [scrollY, setScrollY] = useState(0);
    
    useEffect(() => {
        getEstimate()
            const handleScroll = () => {
      setScrollY(window.scrollY); 
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
        window.removeEventListener('scroll', handleScroll);
    };
     }, [])
    

   
    async function getEstimate() {
       const estimate = await getProject(projectId);
        if (estimate) {            
            setData(estimate); 
        }
    }

    

    return (
        <section className={`${scrollY > 80 ? "fixed w-[960px] left-1/2 transform -translate-x-1/2 top-0 bg-white z-50" : "fixed w-[960px] left-1/2 transform -translate-x-1/2 top-60 bg-white z-50"}` }>
          <div className="flex justify-center">
             
              <span>
                  <p className="block mb-8 font-semibold text-2xl">Назва кошторису: <span className="font-normal text-base ml-3">{data?.title}</span> </p>
                  <p className="block mb-8 font-semibold text-2xl">Адреса об’єкту: <span className="font-normal text-base ml-3">{ data?.description}</span> </p>
              </span>
          
          </div>

           <ul className="flex items-center justify-center gap-8 mb-8">
                <li>
                    <Link
                         className={`${pathname === `/estimates/${projectId}` ? "font-bold text-xl px-3 py-1 text-blue-30" : "font-medium text-xl px-3 py-1 text-blue-25"}` }
                        href={`/estimates/${projectId}`}>Кошторис</Link>
                    {pathname === `/estimates/${projectId}` && ( <div className="w-full h-[1px] bg-blue-30"></div>)}
                   </li>
                <li>
                    <Link
                        className={`${pathname === `/estimates/${projectId}/prices` ? "font-bold text-xl px-3 py-1 text-blue-30" : "font-medium text-xl px-3 py-1 text-blue-25"}` }
                        
                        href={`/estimates/${projectId}/prices`}>Прайс</Link>
                    {pathname === `/estimates/${projectId}/prices` && (<div className="w-full h-[1px] bg-blue-30"></div>)}
                    </li>
                <li>
                    <Link
                         className={`${pathname === `/estimates/${projectId}/materials` ? "font-bold text-xl px-3 py-1 text-blue-30" : "font-medium text-xl px-3 py-1 text-blue-25"}` }
                        href={`/estimates/${projectId}/materials`}>Матеріали</Link>
                    {pathname === `/estimates/${projectId}/materials` && (<div className="w-full h-[1px] bg-blue-30"></div>)}
                    </li>
                <li>
                    <Link
                         className={`${pathname === `/estimates/${projectId}/advances` ? "font-bold text-xl px-3 py-1 text-blue-30" : "font-medium text-xl px-3 py-1 text-blue-25"}` }
                        href={`/estimates/${projectId}/advances`}>Аванс</Link>
                    {pathname === `/estimates/${projectId}/advances` && (<div className="w-full h-[1px] bg-blue-30"></div>)}
                    </li>
          </ul>
          
      
      </section>
  );
}

export default Project;