'use client'
import { Estimate, EstimatePosition, PriceItem } from "@/app/interfaces/projects";
import { PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import ButtonBlue from "@/app/UI/Buttons/ButtonBlueProject";
import ButtonDelete from "@/app/UI/Buttons/ButtonDelete";
import ButtonUpdate from "@/app/UI/Buttons/ButtonUpdate";
import ButtonPrint from "@/app/UI/Buttons/ButtonPrint";
import { useEffect, useState } from "react";
import AddEstimateModal from "../../Modal/AddEstimateModal";

interface EstimateProps {
    project: PriceItem | null;
    isRender: () => void;
}

const EstimateItem: React.FC<EstimateProps> = ({ project, isRender }) => {
    if (!project) {
    return <div>No project available</div>;
    } 

    const [data, setData] = useState<Estimate | null>(null);
    const [toggleModal, setToggleModal] = useState<boolean>(false);

    
   
    const isShowModal = () => setToggleModal(toggle => !toggle);

    useEffect(() => {
    
    if (project?.estimates) {
        const newEstimates: Estimate[] | any = project?.estimates.map(item => ({
            ...item,
            isShow: false,
            isDelete: false,
        }));

        if (newEstimates?.length > 0) {
    
            for (let i = 0; i < newEstimates.length; i++) {
                if (Array.isArray(newEstimates[i].positions)) {

                    newEstimates[i].positions = newEstimates[i].positions.map((position: EstimatePosition) => ({
                        ...position,
                        isShow: false,
                        isDelete: false,
                    }));
                } 
            }
        }
        setData(newEstimates)   
    }
        
}, [project]);


   

    // console.log(data);
    
    return (
        <div>
            <ul className="mb-8 flex items-center gap-4 justify-center">
                <li><ButtonBlue click={isShowModal} type="button" title="Додати таблицю" /></li>
                <li><ButtonBlue type="button" title="Створити таблицю Excel" /></li>
                <li><ButtonBlue type="button" title="Створити PDF файл" /></li>
            </ul>
            
            <section>
                <div className="flex items-center gap-6 mt-6">
                   <div> <button className="block font-medium text-sm px-3 py-1 text-blue-25" >Основний</button><div className="w-full h-[1px] bg-blue-25"></div></div>
                     <div><button className="block font-medium text-sm px-3 py-1 text-blue-25" >Знижений</button><div className="w-full h-[1px] bg-blue-25"></div></div>
                </div>
                {data && data?.map((item) => (
                    <div className="mb-6" key={item?._id}>
                  <div className="flex items-center gap-6 justify-center mb-8"> 
                        <p className="font-semibold text-xl">{ item?.title}</p>
                            <ButtonUpdate/>
                            <ButtonDelete />
                        </div>

                     <tbody className="table-auto ]">
                  <tr className="w-full">
                   <td className="w-14 border border-gray-20 p-3"><p className="font-bold text-sm">№ з/п.</p></td>
                   <td className="w-64 border border-gray-20 p-3"><p className="font-bold text-sm">Назва</p> </td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Одиниця</p></td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Кількість</p></td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Ціна в грн.</p></td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Сума в грн.</p></td>
                   <td className="w-36 border border-gray-20 p-3"><p className="font-bold text-sm">Редагувати</p></td>
               </tr>    
                       
                {item?.positions && item?.positions?.map((item: EstimatePosition, index: number) => (         
                <tr key={item.id || index} className="">
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{index + 1}</p></td>
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal">{item.title}</p></td>                 
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{item.unit}</p></td>
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{item.number}</p></td>
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{item.price}</p></td>   
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{item.result}</p></td>
                        <td className="border border-gray-20 p-3 flex items-center justify-center gap-6">
                            <button type="button"><PencilSquareIcon className="size-5 text-gray-25"/></button>
                            <button type="button"><TrashIcon className="size-5 text-red-0"/></button>
                        </td>
                        </tr>

                ))}
                             <tr className="bg-gray-0 border border-gray-20 p-3">
                                <td className="p-3 border border-b-gray-20 border-l-gray-20" ><p className="font-bold text-sm">Всього:</p></td>
                                <td className="p-3 border border-b-gray-20" ></td>
                                <td className="p-3 border border-b-gray-20" ></td>
                                <td className="p-3 border border-b-gray-20" ></td>
                                <td className="p-3 border border-b-gray-20" ></td>
                                <td className="p-3 border border-b-gray-20" ></td>
                      <td className="p-3 border border-b-gray-20 border-r-gray-20 text-center"><p className="font-bold text-sm">{item.total &&  item.total}</p></td>
                    </tr>
                        </tbody>
                        
                        <div className="flex items-center justify-between mt-8">
                            <button type="button" className="py-4 px-12 border border-blue-30 rounded-full text-sm text-blue-30 font-bold">Додати</button>
                            <button type="button" className="p-4 bg-blue-30 rounded-full text-sm text-white font-bold">Зберегти зміни</button>
                        </div>
                    </div>  
                ))}
               
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-lg font-normal">Загальна сума:</p>
                        <p className="text-lg font-normal">{project?.total}</p>
                    </div>  

                    <div className="flex items-center justify-between mb-8">
                        <p className="text-lg font-normal text-green">Знижка:</p>
                        <p className="text-lg font-normal text-green">{project?.discount}</p>
                    </div> 

                     <div className="flex items-center justify-between mb-8">
                        <p className="text-lg font-normal">Аванс:</p>
                        <p className="text-lg font-normal">{project?.advancesTotal}</p>
                    </div>
                    
                      <div className="flex items-center justify-between mb-8">
                        <p className="text-lg font-normal">Витрачено на матеріали:</p>
                        <p className="text-lg font-normal">{project?.materialsTotal}</p>
                    </div>

                     <div className="flex items-center justify-between p-6 bg-gray-5 rounded-full">
                        <p className="text-xl font-semibold">До сплати:</p>
                        <p className="text-xl font-semibold">{project?.general}</p>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-end gap-8 mt-8">
                <ButtonBlue title="Відправити кошторис" /> 
                <ButtonPrint/>
            </div>
            {toggleModal && (<AddEstimateModal id={project?._id} toggle={isShowModal} isShow={isRender} />)}
        </div>
    )
}

export default EstimateItem;