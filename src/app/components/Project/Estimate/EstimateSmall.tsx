'use client'
import { Estimate, EstimatePosition, ProjectItem } from "@/app/interfaces/projects";
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { PiFloppyDisk } from "react-icons/pi";
import ButtonBlue from "@/app/UI/Buttons/ButtonBlueProject";
import ButtonDelete from "@/app/UI/Buttons/ButtonDelete";
import ButtonUpdate from "@/app/UI/Buttons/ButtonUpdate";
import ButtonPrint from "@/app/UI/Buttons/ButtonPrint";
import { useEffect, useState } from "react";
import AddEstimateModal from "../../Modal/AddEstimateModal";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import { Position } from "@/app/interfaces/positions";
import {updatePosition } from "@/app/utils/positions";
import { getProject } from "@/app/utils/projects";
import { updateLowEstimate } from "@/app/utils/lowEstimate";
import AddLowPosition from "../../Modal/AddLowPosition";
import { addLowPosition, updateLowPosition } from "@/app/utils/lowPosition";

interface EstimateProps {
    projectId: string;
}


const EstimateSmallItem: React.FC<EstimateProps> = ({ projectId }) => {
   
    const [project, setProject] = useState<ProjectItem| null>(null);
    const [data, setData] = useState<Estimate[] | null | undefined | []>(null);
    const [currentData, setCurrentData] = useState<{ id: string | undefined, estimateId: string | undefined; positionId?: string | undefined; title: string | undefined} | null>(null);
    const [estId, setEstId] = useState<string | undefined>('');
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
    const [isShowDeletePositionModal, setIsShowDeletePositionModal] = useState<boolean>(false);
    const [isRenderEstimate, setIsRenderEstimate] = useState<boolean | null | undefined>(false);
   
   
    const isRender = () => setIsRenderEstimate(render => !render);
     

    useEffect(() => {
    getEstimate()
  }, [isRenderEstimate]);
    

    async function getEstimate() {
    if (projectId !== null) {  
        const estimate = await getProject(projectId);
        if (estimate) {

            const newEstimates = estimate?.lowEstimates?.map(item => ({
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

            estimate.lowEstimates = newEstimates;
        
            setProject(estimate);
            if (estimate?.lowEstimates?.length !== 0) {
              setData(estimate.lowEstimates  as Estimate[]);   
            } 
            
        }
    }
}

    
  
    const getDataPosition = async (data: Position) => {
        await addLowPosition({ projectId, estimateId: estId, title: data.title,
            unit: data.unit, number: data.number, price: data.price})
        if (isRender) isRender();
 } 
    
    const isShowModal = () => setToggleModal(toggle => !toggle);
    const toggleDelete = () => setIsShowDeleteModal(prev => !prev);
    const toggleDeletePosition = () => setIsShowDeletePositionModal(toggle => !toggle);
    
        
    const addIsToggle = (
  id: string | undefined,
  currentIsShow: boolean,
  name: 'update' | 'delete' | 'add',
  type: 'estimate' | 'position'
): void => {
  setData(prevData => {
    if (prevData === null || prevData === undefined) return [];

    const newData = prevData.map(item => {
      
      if (type === 'estimate' && item.id === id) {
        if (name === 'update') {
          return { ...item, isShow: currentIsShow };
        }
        if (name === 'delete') {
          return { ...item, isDelete: currentIsShow };
        }
        if (name === 'add') {
          return { ...item, isAdd: currentIsShow };
        }
      }

      if (type === 'position' && item.positions) {
        const newPositions = item.positions.map(position => {
          if (position.id === id) {
            if (name === 'update') {
              return { ...position, isShow: currentIsShow };
            }
            if (name === 'delete') {
              return { ...position, isDelete: currentIsShow };
            }
          }
          return position;
        });

        return { ...item, positions: newPositions };
      }

      return item;
    });

    return newData;
  });
};



    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.currentTarget;

    setData(prevData => {
        if (prevData === null || prevData === undefined) return []; 

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
                if (position.id === id) {
                    return { ...position, [name]: value };
                }
                return position;
            }) || [];

            return { ...estimate, positions: newPositions };
        });

        return newData;
    });
};


   

    // console.log(project?.prices);
    
    return (
        <div className="mx-auto">
            <ul className="mb-8 flex items-center gap-4 justify-center">
                <li><ButtonBlue click={isShowModal} type="button" title="Додати таблицю" /></li>
                <li><ButtonBlue type="button" title="Створити таблицю Excel" /></li>
                <li><ButtonBlue type="button" title="Створити PDF файл" /></li>
            </ul>
            
            <section>
                
                <ul>  
                {data && data?.map((item) => (
                    <li className="mb-6 relative bg-gray-0 p-3 rounded-lg" key={item?.id}>
                        <div className={`${!item?.isShow ? 'mt-2 flex items-center gap-6 justify-center mb-3 p-2' : 'mt-2 flex items-center gap-6 justify-center mb-3 p-2 bg-white rounded-md'} `}>
                            {item?.isShow ?
                                (<input onChange={onChange} className="w-28  font-semibold text-xl bg-transparent focus:outline-none"
                                   id={item?.id} name="title" value={item?.title} />) :
                                (<p className="font-semibold text-xl">{ item?.title}</p>)
                            }        
                        
                            <ButtonUpdate type="button" click={async () => {
                                addIsToggle(item.id, !item.isShow, "update", "estimate");
                                if (item.isShow) {
                                   await updateLowEstimate({projectId: projectId, estimateId: item?.id, title: item?.title}) 
                                    if (isRender) isRender();  
                                }
                            } }/>
                            <ButtonDelete type="button" isActive={item.isShow} click={() => {
                                addIsToggle(item.id, !item.isDelete, "delete", "estimate");
                                setCurrentData({ id: projectId, estimateId: item?.id, title: item?.title })
                                toggleDelete();
                                                               
                            }} />
                        </div>

            <table className="bg-white rounded-lg shadow-pricesTablet">
                <tbody className="table-auto">
                <tr className="w-full">
                   <td className="w-10 border border-gray-20 p-3"><p className="font-bold text-sm">№ з/п.</p></td>
                   <td className="w-60 border border-gray-20 p-3"><p className="font-bold text-sm">Назва</p> </td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Одиниця</p></td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Кількість</p></td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Ціна в грн.</p></td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Сума в грн.</p></td>
                   <td className="w-36 border border-gray-20 p-3"><p className="font-bold text-sm">Редагувати</p></td>
               </tr>    
                       
                {item?.positions && item?.positions?.map((position: EstimatePosition, index: number) => (         
                    
                    <tr key={position.id || index} className={`${position.isShow && 'bg-gray-25'}`}>
                        
                        <td className="border border-gray-20 p-3"><p className={`${position.isShow ? "text-white text-xs font-normal text-center" : "text-black text-xs font-normal text-center"}`}>{index + 1}</p></td>

                        <td className="border border-gray-20 p-3">
                            {position.isShow ? (
                                <input type="text"
                                className="w-full h-full bg-transparent text-white text-xs font-normal focus:outline-none"
                                id={position.id} name='title' value={position.title}  
                                onChange={onChange}
                                />
                            ) : (<p className="text-xs font-normal">{position.title}</p>)}
                            
                        </td>
                        
                        <td className="border border-gray-20 p-3">
                            {position.isShow ? (
                             <input type="text"
                                className="w-full h-full bg-transparent text-white text-xs font-normal text-center focus:outline-none"
                                id={position.id} name='unit' value={position.unit}  
                                onChange={onChange}
                                />
                            ) : (
                             <p className="text-xs font-normal text-center">{position.unit}</p>       
                            )}
                            
                        </td>

                        <td className="border border-gray-20 p-3">
                            {position.isShow ? (
                            <input type="number"
                                className="w-full h-full bg-transparent text-white text-xs font-normal text-center focus:outline-none"
                                id={position.id} name='number' value={position.number}  
                                onChange={onChange}
                                />
                            ) : (
                             <p className="text-xs font-normal text-center">{position.number}</p>       
                            )} 
                        </td>

                        <td className="w-28 border border-gray-20 p-3">
                            {position.isShow ? (
                             <input type="number"
                                className="w-full h-full bg-transparent text-white text-xs font-normal text-center focus:outline-none"
                                id={position.id} name='price' value={position.price}  
                                onChange={onChange}
                                />
                            ) : (
                             <p className="text-xs font-normal text-center">{position.price}</p>       
                            )}
                        </td>   

                        <td className="w-28 border border-gray-20 p-3"><p className={`${position.isShow ? "text-white text-xs font-normal text-center" : "text-black text-xs font-normal text-center"}`}>{position.result}</p>
                        </td>
                        <td className="border border-gray-20 p-3 flex items-center justify-center gap-6">
                            <button
                                onClick={async () => {
                                addIsToggle(position.id, !position.isShow, "update", "position");
                                    if (position.isShow) {
                                        await updateLowPosition({
                                            projectId: projectId,
                                            estimateId: item.id,
                                            positionId: position.id,
                                            title: position.title,
                                            unit: position.unit,
                                            number: position.number,
                                            price: position.price,
                                        });
                                    if (isRender) isRender();
                                 }   
                            }}
                                type="button"> 
                                {position.isShow ? (<PiFloppyDisk className="size-5 text-white" />) : (<PencilSquareIcon className="size-5 text-gray-25" />)}
                            </button>
                            <button
                                onClick={async () => {
                                    addIsToggle(position.id, !position.isDelete, "delete", "position"); 
                                    setCurrentData({id: projectId, estimateId: item?.id, positionId: position.id, title: position.title})
                                    toggleDeletePosition()
                               }}
                                type="button"> {position.isShow ? (<TrashIcon className="size-5 text-white" />) : ((<TrashIcon className="size-5 text-red-0" />))}
                            </button>
                        </td>
                        
                    </tr>
   
                ))}
                    {item.isAdd && (<AddLowPosition projectId={projectId} isGetData={getDataPosition} />)}
                            
                    <tr className="bg-gray-30 border border-gray-20 p-3">
                            <td className="p-3 border border-b-gray-20 border-l-gray-20" ><p className="font-bold text-sm text-white">Всього:</p></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20 border-r-gray-20 text-center"><p className="font-bold text-sm text-white">{item.total &&  item.total}</p></td>
                    </tr>
                </tbody>
            </table>
                        
                        <div className=" mt-8">
                            <button onClick={() => {
                                addIsToggle(item.id, !item.isAdd, "add", "estimate");
                                setEstId(item.id);
                            }
                                
                                
                            } type="button" className="py-4 px-12 border border-blue-30 rounded-full text-sm text-blue-30 font-bold hover:bg-blue-30 focus:bg-blue-30 hover:text-white focus:text-white">{item.isAdd ? "Закрити" : "Додати" }</button>
                        </div>
                    </li>  
                ))}
              </ul> 
                <div>
                    {}
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-lg font-normal">Загальна сума:</p>
                        <p className="text-lg font-normal">{project?.lowTotal}</p>
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
                        <p className="text-xl font-semibold">{project?.lowGeneral}</p>
                    </div>
                </div>
            </section>
            <div className="flex items-center justify-end gap-8 mt-8">
                <ButtonBlue title="Відправити кошторис" /> 
                <ButtonPrint/>
            </div>
            {toggleModal && (<AddEstimateModal componentName="low-estimate" id={projectId} toggle={isShowModal} isShow={isRender} />)}
             {isShowDeleteModal && (<DeleteModal data={currentData} toggle={toggleDelete} nameComponent='low-estimate' toggleData={isRender}/>)}
              {isShowDeletePositionModal && (<DeleteModal data={currentData} toggle={toggleDeletePosition} nameComponent='low-position' toggleData={isRender}/>)}
        </div>
    )
}

export default EstimateSmallItem;