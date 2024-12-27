'use client'
import { Estimate, EstimatePosition, PriceItem } from "@/app/interfaces/projects";
import { PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import ButtonBlue from "@/app/UI/Buttons/ButtonBlueProject";
import ButtonDelete from "@/app/UI/Buttons/ButtonDelete";
import ButtonUpdate from "@/app/UI/Buttons/ButtonUpdate";
import ButtonPrint from "@/app/UI/Buttons/ButtonPrint";
import { useEffect, useState } from "react";
import AddEstimateModal from "../../Modal/AddEstimateModal";
import { updateEstimate } from "@/app/utils/Estimates";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import { Position } from "@/app/interfaces/positions";
import AddPosition from "../../Modal/AddPosition";

interface EstimateProps {
    project: PriceItem | null;
    isRender: () => void;
}


const EstimateItem: React.FC<EstimateProps> = ({ project, isRender }) => {
    if (!project) {
    return <div>No project available</div>;
    } 

    const [data, setData] = useState<Estimate[] | null>(null);
    const [currentData, setCurrentData] = useState<{ id: string | undefined, estimateId: string | undefined; title: string | undefined} | null>(null);
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
    const [isAddPosition, setIsAddPosition] = useState<boolean>(false);

const toggleAddPosition = () => {
    setIsAddPosition(toggle => !toggle);
  
    };
    
  

    
   
    const isShowModal = () => setToggleModal(toggle => !toggle);
    const toggleDelete = () => setIsShowDeleteModal(prev => !prev);
    

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


    
    const addIsToggle = (id: string | undefined, currentIsShow: boolean, name: 'update' | 'delete', type: "estimate" | "position"): void => {
        if (type === 'estimate') {
           
         setData(prevData => {
            if (prevData === null) return []; 
            const newData = prevData.map(item => {
                if (item.id === id) {
                    if (name === 'update') {
                        return { ...item, isShow: currentIsShow };
                    }
                    if (name === 'delete') {
                        return { ...item, isDelete: currentIsShow };
                    }
                }
                return item;
            });
            return newData;
        });    
         }
        
    };


    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.currentTarget;

    setData(prevData => {
        if (prevData === null) return []; 

        const newData = prevData.map(estimate => {
            if (estimate.id === id) {
                switch (name) {
                    case 'title': 
                        return { ...estimate, title: value };
                    default:
                        return estimate;
                }
            }
  
            const newPositions: EstimatePosition[] = estimate.positions?.map(position => {
                if (position._id === id) {
                    return { ...position, [name]: value };
                }
                return position;
            }) || [];

            return { ...estimate, positions: newPositions };
        });

        return newData;
    });
};


   

    console.log(project?.prices);
    
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
                    <div className="mb-6 relative" key={item?.id}>
                        <div className={`${!item?.isShow ? 'mt-2 flex items-center gap-6 justify-center mb-8' : 'mt-2 flex items-center gap-6 justify-center mb-8 bg-blue-5 rounded-md'} `}>
                            {item?.isShow ?
                                (<input onChange={onChange} className="w-28  font-semibold text-xl bg-transparent focus:outline-none"
                                   id={item?.id} name="title" value={item?.title} />) :
                                (<p className="font-semibold text-xl">{ item?.title}</p>)
                            }        
                        
                            <ButtonUpdate type="button" click={async () => {
                                addIsToggle(item.id, !item.isShow, "update", "estimate");
                                if (item.isShow) {
                                   await updateEstimate({projectId: project?._id, estimateId: item?.id, title: item?.title}) 
                                    if (isRender) isRender();
                                }
                            } }/>
                            <ButtonDelete type="button" isActive={item.isShow} click={async () => {
                                addIsToggle(item.id, !item.isDelete, "delete", "estimate");
                                setCurrentData({ id: project?._id, estimateId: item?.id, title: item?.title })
                                toggleDelete();
                                
                            }} />
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
                    
                         

                ))}        {isAddPosition && (<AddPosition isShow={isRender} toggle={toggleAddPosition} prices={project?.prices} />)}
                            
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
                        
                        <div className=" mt-8">
                            <button onClick={() =>toggleAddPosition()} type="button" className="py-4 px-12 border border-blue-30 rounded-full text-sm text-blue-30 font-bold hover:bg-blue-30 focus:bg-blue-30 hover:text-white focus:text-white">Додати</button>
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
             {isShowDeleteModal && (<DeleteModal data={currentData} toggle={toggleDelete} nameComponent='estimate' toggleData={isRender}/>)}
        </div>
    )
}

export default EstimateItem;