'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { ProjectsData } from "@/app/interfaces/projects";
import ButtonDelete from "@/app/UI/Buttons/ButtonDeletePrices";
import { PlusIcon } from "@heroicons/react/16/solid";
import { ArrowRightIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { getAllProjects } from "@/app/utils/projects";




export default function EstimateList() {
    const [data, setData] = useState<ProjectsData[] | null>(null);
    const [page, setPage] = useState(1);
    
const changePage = () =>  setPage(prevState => prevState +1);


    console.log(data);

    async function getProjects() {
        const projectsItems = await getAllProjects(page, 8);

      if (projectsItems && data !== null) {
      setData(state => [...(state || []), ...(projectsItems?.projects || [])]);
     } else {
      setData(projectsItems?.projects || []);
     }
    }

    useEffect(() => { getProjects() }, [page])
    return (
        <section>
            <div className='flex items-center justify-center gap-1 mb-16'>
                <h3 className="font-bold font-alternates text-5xl">Список кошторисів</h3>
                <button className=''
                    // onClick={isToggle}
                >
                 <PlusIcon className='size-10 text-black'/>   
                </button>
            </div>


            <ul className={data && data?.length <= 1 ? "mb-6 flex flex-wrap gap-8 justify-center" : "mb-6 flex flex-wrap gap-8"}>
                {Array.isArray(data) && data?.map(({ _id, title, description }) => (
                  <li className="w-[608px] px-8 py-8 bg-white rounded-3xl shadow-base" key={_id}>
                    <div className="mb-6 flex items-center gap-6">

                           <button
                                    // onClick={async () => {
                                    //     addIsToggle(id, !isShow, 'update')
                                    //     if (isShow) {
                                    //         await updatePrice({id, title, price})
                                    //         await toggleRender();  
                                    //     }
                                    // }
                                    // }
                                className={ `w-12 h-12 border  border-blue-20 rounded-full hover:bg-blue-5 focus:bg-blue-5 hover:border-0 focus:border-0` }
                          
                                //   className={isShow ? `w-12 h-12 bg-blue-5 rounded-full hover:bg-blue-15 focus:bg-blue-15` :
                                //   `w-12 h-12 border border-blue-20 rounded-full hover:bg-blue-5 focus:bg-blue-5
                                //   hover:border-0 focus:border-0`
                                //    }
                            type='button'>
                            <PencilSquareIcon className='size-6 text-gray-30 mx-auto'/>
                                {/* {isShow ? (<PiFloppyDisk className='size-6 text-gray-30 mx-auto'/>) : (<PencilSquareIcon className='size-6 text-gray-30 mx-auto'/>)} */}
                                 
                        </button>
                        
                        <ButtonDelete/>

                    </div>
                    
                        <span className="flex items-center gap-4 mb-7">
                        <p className="font-semibold text-2xl">Назва кошторису:</p>
                            <p className="font-normal text-base">{title}</p>
                        </span>
                        <span className="flex items-center gap-10 mb-7">
                            <p className="font-semibold text-2xl">Адреса об’єкту:</p>
                            <p className="font-normal text-base">{description}</p>
                        </span>
                    
                       <Link className="flex items-center gap-2 font-medium text-xl text-blue-30 hover:text-blue-25 focus:text-blue-25" href='/'>Детальніше <ArrowRightIcon className="size-6 text-blue-30"/></Link>
                </li>  
                ))}
                
            </ul>
            {data && data?.length > 7 &&
            ( <button onClick={changePage} className="font-medium text-xl text-blue-30 hover:text-blue-25 focus:text-blue-25" type="button">Дивитись ще...</button>)
            }
           
        </section>
    )
}