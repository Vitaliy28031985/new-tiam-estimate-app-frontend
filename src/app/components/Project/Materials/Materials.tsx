'use client'

import { Material, ProjectItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { PiFloppyDisk } from "react-icons/pi";

interface EstimateProps {
    projectId: string;
}

const MaterialsItem: React.FC<EstimateProps> = ({ projectId }) => { 
    const [data, setData] = useState<ProjectItem | null>(null);

useEffect(() => {getMaterial()}, [])

    async function getMaterial() {
        const estimate = await getProject(projectId);
        if (estimate) {

            const newMaterials = estimate.materials?.map(item => ({ ...item, isShow: false, isDelete: false, }));
            estimate.materials = newMaterials;

            setData(estimate);
        }
    } 
// console.log(data)
    return (
        <div className="flex justify-center">
        <table className="bg-white rounded-lg shadow-pricesTablet">
                <tbody className="table-auto">
                <tr className="w-full">
                   <td className=" border border-gray-20 p-3"><p className="font-bold text-sm">№ з/п.</p></td>
                   <td className="w-52 border border-gray-20 p-3"><p className="font-bold text-sm">Назва</p> </td>
                   <td className="w-52  border border-gray-20 p-3"><p className="font-bold text-sm text-center">№ рахунку</p></td>
                        <td className="w-28 border border-gray-20 p-3"><p className="font-bold text-sm text-center">Дата</p></td>
                        <td className="w-28 border border-gray-20 p-3"><p className="font-bold text-sm text-center">Сума в грн.</p></td>
                   <td className="w-40 border border-gray-20 p-3"><p className="font-bold text-sm text-center">Редагувати</p></td>
                    </tr> 
                    {data && data.materials?.map(({id, title, order, date, sum}, index) => (
                        <tr className="w-full" key={id}>
                            <td className=" border border-gray-20 p-3"><p className="text-xs font-normal text-center">{index + 1}</p></td>
                            <td className=" border border-gray-20 p-3"><p className="text-xs font-normal">{title}</p></td>
                            <td className=" border border-gray-20 p-3"><p className="text-xs font-normal text-center">{order}</p></td>
                             <td className=" border border-gray-20 p-3"><p className="text-xs font-normal text-center">{date}</p></td>
                            <td className=" border border-gray-20 p-3"><p className="text-xs font-normal text-center">{sum}</p></td>
                             <td className="border border-gray-20 p-3 flex items-center justify-center gap-6">
                            <button
                              
                                type="button"> 
                                {false ? (<PiFloppyDisk className="size-5 text-white" />) : (<PencilSquareIcon className="size-5 text-gray-25" />)}
                            </button>
                            <button
                                
                                type="button"> {false ? (<TrashIcon className="size-5 text-white" />) : ((<TrashIcon className="size-5 text-red-0" />))}
                            </button>
                        </td>
                        </tr>
                    ))}
                    <tr className="bg-gray-30 border border-gray-20 p-3">
                            <td className="p-3 border border-b-gray-20 border-l-gray-20" ><p className="font-bold text-sm text-white">Всього:</p></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20 border-r-gray-20 text-center"><p className="font-bold text-sm text-white">{data?.materialsTotal &&  data.materialsTotal}</p></td>
                    </tr>
                </tbody>
                </table>
        </div>
    )
}

export default MaterialsItem;