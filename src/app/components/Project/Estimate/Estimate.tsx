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
import { updateEstimate } from "@/app/utils/Estimates";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import { Position } from "@/app/interfaces/positions";
import AddPosition from "../../Modal/AddPosition";
import { addPosition, updatePosition } from "@/app/utils/positions";
import { getProject } from "@/app/utils/projects";
import { User } from "@/app/interfaces/user";
import { forbiddenFormatMessage, roundingNumber } from "@/app/utils/formatFunctions";
import { generateAndDownloadExcel } from "@/app/utils/excelGenerator";
import Notification from "@/app/UI/Notifications/Notifications";
import SendEstimatePdf from "./SendEstimate";
import { handlePrint } from "./printEstimate";
import SettingsModal from "../../Modal/SettingsModal";

interface EstimateProps {
    projectId: string;
    user: User | null;
    toggleShow?: () => void;
    isShowModalSettings?: boolean;
}


const EstimateItem: React.FC<EstimateProps> = ({ projectId, user, toggleShow, isShowModalSettings }) => {
   
    const [project, setProject] = useState<ProjectItem | null>(null);
    const [data, setData] = useState<Estimate[] | null | undefined>(null);
    const [currentData, setCurrentData] = useState<{ id: string | undefined, estimateId: string | undefined; positionId?: string | undefined; title: string | undefined} | null>(null);
    const [estId, setEstId] = useState<string | undefined>('');
    const [toggleModal, setToggleModal] = useState<boolean>(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
    const [isShowDeletePositionModal, setIsShowDeletePositionModal] = useState<boolean>(false);
    const [isRenderEstimate, setIsRenderEstimate] = useState<boolean | null | undefined>(false);
   
    const [message, setMessage] = useState('');
    const [notificationIsOpen, setNotificationIsOpen] = useState(false);
    const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Оновлення' | 'Додавання' | 'Знижка' | 'Доступ' | 'Знижений кошторис'>('Оновлення');
   

    


    const isRender = () => setIsRenderEstimate(render => !render);
     
    const isAllow = user?.projectIds?.filter(({ id }) => id === projectId);
    const owner = user?._id === project?.owner;

    const isShowTotals = owner || (isAllow && isAllow[0]?.lookAtTotals === "show");

    const isRead = user?.role !== "customer";

    useEffect(() => {
    getEstimate()
  }, [isRenderEstimate]);
    

    async function getEstimate() {
    if (projectId !== null) {  
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
            setProject(estimate);
            setData(estimate.estimates); 
        }
    }
}

    
  
    const getDataPosition = async (data: Position) => {
        
      const newData =  await addPosition({ projectId, estimateId: estId, title: data.title,
            unit: data.unit, number: data.number, price: data.price
        })
        if (!newData.status) {
            if (isRender) isRender();
            setMessage('Рядок успішно додано!');
            setType('info');
            setNotificationTitle('Оновлення');
            setNotificationIsOpen(true);      
        } else {
            setMessage('Помилка: ' + (forbiddenFormatMessage(newData.data?.message) || 'Не вдалося додати рядок!'));
            setType('error');
            setNotificationTitle('Помилка');
            setNotificationIsOpen(true);
            }      
        
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


       const handleExcelGeneration = () => {
        if (project && data) {
            generateAndDownloadExcel(project, data);
        } else {
            console.error('Project or estimate data is missing');
        }
    };

    
    return (
        <div className="mx-auto">
            <ul className="mb-8 flex items-center gap-4 justify-center">
                <li><ButtonBlue click={isShowModal} type="button" title="Додати таблицю" /></li>
                <li><ButtonBlue type="button" title="Створити таблицю Excel"
                    click={handleExcelGeneration}
                /></li>
                <li><ButtonBlue type="button" title="Створити PDF файл" /></li>
            </ul>
            
            <section>
                
                <ul className="flex flex-wrap justify-center ">  
                {data && data?.map((item) => (
                    <li className="mb-6 relative bg-gray-0 p-3 rounded-lg" key={item?.id}>
                        <div className={`${!item?.isShow ? 'mt-2 flex items-center gap-6 justify-center mb-3 p-2' : 'mt-2 flex items-center gap-6 justify-center mb-3 p-2 bg-white rounded-md'} `}>
                            {item?.isShow ?
                                (<input onChange={onChange} className="w-28  font-semibold text-xl bg-transparent focus:outline-none"
                                   id={item?.id} name="title" value={item?.title} />) :
                                (<p className="font-semibold text-xl">{ item?.title}</p>)
                            }        
                            {isRead && (
                            <ButtonUpdate type="button" click={async () => {
                                addIsToggle(item.id, !item.isShow, "update", "estimate");
                                if (item.isShow) {
                                    const data = await updateEstimate({ projectId: projectId, estimateId: item?.id, title: item?.title }) 
                                    if (!data.status) {
                                        if (isRender) isRender();
                                        setMessage('Назву таблиці успішно оновлено!');
                                        setType('info');
                                        setNotificationTitle('Оновлення');
                                        setNotificationIsOpen(true);     
                                    } else {
                                        setMessage('Помилка: ' + (forbiddenFormatMessage(data.data?.message) || 'Не вдалося оновити назву таблиці!'));
                                        setType('error');
                                        setNotificationTitle('Помилка');
                                        setNotificationIsOpen(true);
                                    }    
                                }
                            } }/>    
                           )}
                            {isRead && (
                              <ButtonDelete type="button" isActive={item.isShow} click={() => {
                                addIsToggle(item.id, !item.isDelete, "delete", "estimate");
                                setCurrentData({ id: projectId, estimateId: item?.id, title: item?.title })
                                toggleDelete();
                                                               
                            }} />   
                            )}
                           
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
                   {isRead && (<td className="w-36 border border-gray-20 p-3"><p className="font-bold text-sm">Редагувати</p></td>)}
                   
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

                        <td className="w-28 border border-gray-20 p-3"><p className={`${position.isShow ? "text-white text-xs font-normal text-center" : "text-black text-xs font-normal text-center"}`}>{roundingNumber(position.result)}</p>
                        </td>
                        {isRead && (
                         <td className="border border-gray-20 p-3 flex items-center justify-center gap-6">
                            <button
                                onClick={async () => {
                                addIsToggle(position.id, !position.isShow, "update", "position");
                                        if (position.isShow) {
                                        
                                            
                                     const data =   await updatePosition({
                                            projectId: projectId,
                                            estimateId: item.id,
                                            positionId: position.id,
                                            title: position.title,
                                            unit: position.unit,
                                            number: position.number,
                                            price: position.price,
                                     });
                                    if (!data?.status) {
                                         if (isRender) isRender(); 
                                        setMessage('Рядок змінено!');
                                        setType('info');
                                        setNotificationTitle('Оновлення');
                                        setNotificationIsOpen(true);      
                                    } else {
                                        setMessage('Помилка: ' + (forbiddenFormatMessage(data.data?.message) || 'Не вдалося оновити рядок!'));
                                        setType('error');
                                        setNotificationTitle('Помилка');
                                        setNotificationIsOpen(true);
                                    }
                                    
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
                        )}
                       
                        
                    </tr>
   
                ))}
                    {item.isAdd && (<AddPosition projectId={projectId} isGetData={getDataPosition} />)}
                            
                    <tr className="bg-gray-30 border border-gray-20 p-3">
                            <td className="p-3 border border-b-gray-20 border-l-gray-20" ><p className="font-bold text-sm text-white">Всього:</p></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            {isRead && (<td className="p-3 border border-b-gray-20" ></td>)}
                            
                            <td className="p-3 border border-b-gray-20 border-r-gray-20 text-center"><p className="font-bold text-sm text-white">{item.total &&  roundingNumber(item.total)}</p></td>
                    </tr>
                </tbody>
            </table>
                        {isRead && (
                         <div className=" mt-8">
                            <button onClick={() => {
                                addIsToggle(item.id, !item.isAdd, "add", "estimate");
                                setEstId(item.id);
                            }
                                
                                
                            } type="button" className="py-4 px-12 border border-blue-30 rounded-full text-sm text-blue-30 font-bold hover:bg-blue-30 focus:bg-blue-30 hover:text-white focus:text-white">{item.isAdd ? "Закрити" : "Додати" }</button>
                        </div>    
                      )}  
                       
                    </li>  
                ))}
              </ul> 
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <p className="text-lg font-normal">Загальна сума:</p>
                        <p className="text-lg font-normal">{project?.total && roundingNumber(project?.total)}</p>
                    </div>  

                    {isShowTotals && (
                        <>
                         {project?.discount !== 0 && (
                      <div className="flex items-center justify-between mb-8">
                        <p className="text-lg font-normal text-green">Знижка:</p>
                        <p className="text-lg font-normal text-green">{project?.discount && roundingNumber(project?.discount)}</p>
                    </div>    
                    )}
                   
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
                        <p className="text-xl font-semibold">{project?.general && roundingNumber(project?.general)}</p>
                    </div>
                        </>
                    )}
                   
                </div>
            </section>
            <div className="flex items-center justify-end mt-8">
                {/* <ButtonBlue title="Відправити кошторис" />  */}
                <SendEstimatePdf data={project}/>
                <ButtonPrint click={() => handlePrint(project)}/>
            </div>

    {notificationIsOpen && (
          <Notification     
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />

      )}

            {toggleModal && (<AddEstimateModal
                componentName="estimate"
                id={projectId}
                toggle={isShowModal}
                isShow={isRender}
                setMessage={setMessage}
                setNotificationIsOpen={setNotificationIsOpen}
                setType={setType}
                setNotificationTitle={setNotificationTitle}
            />)}

            {isShowDeleteModal && (<DeleteModal data={currentData} toggle={toggleDelete} nameComponent='estimate' toggleData={isRender}/>)}
            {isShowDeletePositionModal && (<DeleteModal data={currentData} toggle={toggleDeletePosition} nameComponent='position' toggleData={isRender}/>)}
            {isShowModalSettings && (<SettingsModal
                project={project}
                toggle={toggleShow}
                id={projectId}
                isShow={isRender}
                setMessage={setMessage}
                setNotificationIsOpen={setNotificationIsOpen}
                setType={setType}
                setNotificationTitle={setNotificationTitle}
            />)} 
        </div>
    )
}

export default EstimateItem;