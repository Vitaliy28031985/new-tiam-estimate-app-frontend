'use client'
import { ProjectItem } from "@/app/interfaces/projects";
import { getProject } from "@/app/utils/projects";
import { PlusIcon } from "@heroicons/react/16/solid";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import { PiFloppyDisk } from "react-icons/pi";
import AddAdvanceModal from "../../Modal/AddAdvanceModal";
import { updateAdvance } from "@/app/utils/advances";
import DeleteModal from "../../Modal/DeleteModal/DeleteModal";
import Notification from "@/app/UI/Notifications/Notifications";
import { forbiddenFormatMessage } from "@/app/utils/formatFunctions";

interface AdvancesProps {
    projectId: string;
}

const AdvancesItem: React.FC<AdvancesProps> = ({ projectId }) => {
    const [data, setData] = useState<ProjectItem | null>(null);
    const [currentData, setCurrentData] = useState<{ id: string | undefined, projectId: string | undefined; title: string | undefined} | null>(null);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);
    const [isRender, setIsRender] = useState<boolean>(false);
    const [toggleModal, setToggleModal] = useState<boolean>(false);
   

    const [message, setMessage] = useState('');
    const [notificationIsOpen, setNotificationIsOpen] = useState(false);
    const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Оновлення' | 'Додавання' | 'Видалення' | 'Знижка' | 'Доступ' | 'Знижений кошторис'>('Оновлення');

   
    const toggleRender = (): void | undefined => setIsRender(prev => !prev);
    const isShowModal = () => setToggleModal(toggle => !toggle);
    const toggleDelete = () => setIsShowDeleteModal(prev => !prev); 

    useEffect(() => {getAdvances()}, [isRender])

      async function getAdvances() {
            const estimate = await getProject(projectId);
            if (estimate) {
                const newMaterials = estimate.advances?.map(item => ({ ...item, isShow: false, isDelete: false, }));
                estimate.advances = newMaterials;
                setData(estimate);
            }
        } 

    
    const addIsToggle = (id: string, currentIsShow: boolean, name: string) => {
    setData((prevData) => {
      const newData = { ...prevData };
      const newMaterials = newData.advances?.map((advance) => {
        if (advance.id === id) {
          if (name === "update") {
            return { ...advance, isShow: currentIsShow };
          }
          if (name === "delete") {
            return { ...advance, isDelete: currentIsShow };
          }
        }
        return advance;
      });
      newData.advances = newMaterials;
      return newData;
    });
    };
    
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, id } = e.currentTarget;
    setData((prevData) => {
      const newData = { ...prevData };
      const newMaterials = newData.advances?.map((advance) => {
        if (advance.id === id) {
          switch (name) {
            case name:
              return { ...advance, [name]: value };
            default:
              return advance;
          }
        }
        return advance;
      });
      newData.advances = newMaterials;
      return newData;
    });
  }
    
    
    return (
        <div>
        <table className="bg-white rounded-lg shadow-pricesTablet">
                <tbody className="table-auto">
                <tr className="w-full">
                   <td className=" border border-gray-20 p-3"><p className="font-bold text-sm">№ з/п.</p></td>
                        <td className="w-96 flex items-center gap-4 border border-gray-20 p-3"><p className="font-bold text-sm">Коментар</p>
                        <button onClick={isShowModal} type="button" className="bg-blue-30 p-1 rounded-full hover:bg-blue-25 focus:bg-blue-25"><PlusIcon className="size-6 text-white"/></button>
                        </td>
                        <td className="w-32 border border-gray-20 p-3"><p className="font-bold text-sm text-center">Дата</p></td>
                        <td className="w-32 border border-gray-20 p-3"><p className="font-bold text-sm text-center">Сума в грн.</p></td>
                   <td className="w-40 border border-gray-20 p-3"><p className="font-bold text-sm text-center">Редагувати</p></td>
                    </tr>      
                
                     {data && data.advances?.map(({id, comment, date, sum, isShow, isDelete}, index) => (
                        <tr key={id} className={`full ${isShow && 'bg-gray-25'}`}>
                            <td className=" border border-gray-20 p-3"><p className="text-xs font-normal text-center">{index + 1}</p></td>
                           
                            <td className=" border border-gray-20 p-3">
                                 {isShow ? ( <input type="text"
                                className="w-full h-full bg-transparent text-white text-xs font-normal focus:outline-none"
                                id={id} name='title' value={comment}  
                                onChange={onChange}
                                />) : (<p className="text-xs font-normal">{comment}</p>)}
                                </td>
            
                            <td className=" border border-gray-20 p-3">
                                {isShow ? (<input type="text"
                                className="w-full h-full bg-transparent text-center text-white text-xs font-normal focus:outline-none"
                                id={id} name='date' value={date}  
                                onChange={onChange}
                                />) : (<p className="text-xs font-normal text-center">{date}</p>)}
                            </td>
                            <td className=" border border-gray-20 p-3">
                                {isShow ? (<input type="number"
                                className="w-full h-full bg-transparent text-white text-center text-xs font-normal focus:outline-none"
                                id={id} name='sum' value={sum}  
                                onChange={onChange}
                                />) : (<p className="text-xs font-normal text-center">{sum}</p>)}
                                
                            </td>
                             <td className="border border-gray-20 p-3 flex items-center justify-center gap-6">
                            <button
                            onClick={async () => {
                                        if(id)
                                        addIsToggle(id, !isShow, 'update');
                                         if (isShow) {
                                      const data =  await updateAdvance({id, projectId, comment, date: date, sum: Number(sum)})
                                        if(!data.status) {
                                        await toggleRender();
                                        setMessage('Позицію авансу успішно оновлено!');
                                        setType('info');
                                        setNotificationTitle('Оновлення');
                                        setNotificationIsOpen(true);   
                                       } else {
                                          setMessage('Помилка: ' + (forbiddenFormatMessage(data.data?.message) || 'Не вдалося оновити позицію авансу!'));
                                          setType('error');
                                          setNotificationTitle('Помилка');
                                          setNotificationIsOpen(true);
                                       } 
                                            }
                               }}
                                type="button"> 
                                {isShow ? (<PiFloppyDisk className="size-5 text-white" />) : (<PencilSquareIcon className="size-5 text-gray-25" />)}
                            </button>
                            <button
                            onClick={() => {
                              if(id)
                                addIsToggle(id, !isDelete, 'delete');
                                setCurrentData({ id, projectId: projectId ?? '', title: comment });
                                toggleDelete();
                                }}
                                type="button"> {isShow ? (<TrashIcon className="size-5 text-white" />) : ((<TrashIcon className="size-5 text-red-0" />))}
                            </button>
                        </td>
                        </tr>
                    ))}

                      <tr className="bg-gray-30 border border-gray-20 p-3">
                            <td className="p-3 border border-b-gray-20 border-l-gray-20" ><p className="font-bold text-sm text-white">Всього:</p></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20" ></td>
                            <td className="p-3 border border-b-gray-20 border-r-gray-20 text-center"><p className="font-bold text-sm text-white">{data?.advancesTotal &&  data.advancesTotal}</p></td>
                    </tr>

                </tbody>
        </table>
            
        
        {notificationIsOpen && (
          <Notification  
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />
      )}

        {toggleModal && (<AddAdvanceModal
          id={projectId}
          toggle={isShowModal}
          isShow={toggleRender}
          setMessage={setMessage}
          setType={setType}
          setNotificationIsOpen={setNotificationIsOpen}
          setNotificationTitle={setNotificationTitle}
        />)}
        {isShowDeleteModal && (<DeleteModal
          data={currentData}
          toggle={toggleDelete}
          nameComponent='advance'
          toggleData={toggleRender}
           setMessage={setMessage}
          setType={setType}
          setNotificationIsOpen={setNotificationIsOpen}
          setNotificationTitle={setNotificationTitle}
        />)}
        </div>
    )
}
 
export default AdvancesItem;