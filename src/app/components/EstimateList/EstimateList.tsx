'use client'
import { useEffect, useState } from "react";
import Link from "next/link";
import { Projects, ProjectsData } from "@/app/interfaces/projects";
import ButtonDelete from "@/app/UI/Buttons/ButtonDeletePrices";
import { PlusIcon } from "@heroicons/react/16/solid";
import { ArrowRightIcon, PencilSquareIcon } from '@heroicons/react/24/outline';
import { getAllProjects, updatePrice } from "@/app/utils/projects";
import AddProjectModal from "../Modal/AddProjectModal";
import { PiFloppyDisk } from "react-icons/pi";
import DeleteModal from "../Modal/DeleteModal/DeleteModal";
import Notification from "@/app/UI/Notifications/Notifications";
import EstimatesPagination from "./EstimatesPagination";
import { forbiddenFormatMessage } from "@/app/utils/formatFunctions";




export default function EstimateList() {
    const [data, setData] = useState<ProjectsData[] | null | []>(null);
    const [projects, setProjects] = useState<Projects | null>(null)
    const [currentData, setCurrentData] = useState<{_id: string, title: string} | null>(null);
    const [page, setPage] = useState(1);
    const [toggleModal, setToggleModal] = useState<boolean | null | undefined>(false);
    const [toggleRender, setToggleRender] = useState<boolean | null | undefined>(false);
    const [isShowDeleteModal, setIsShowDeleteModal] = useState<boolean>(false);

    const [message, setMessage] = useState('');
    const [notificationIsOpen, setNotificationIsOpen] = useState(false);
    const [type, setType] = useState<'success' | 'error' | 'warning' | 'info'>('success');
    const [notificationTitle, setNotificationTitle] = useState<'Помилка' | 'Оновлення' | 'Додавання' | 'Видалення'>('Оновлення');

    
   
    const isToggle = () => setToggleModal(toggle => !toggle);
    const isRender = () => setToggleRender(toggle => !toggle);
    const toggleDelete = () => setIsShowDeleteModal(prev => !prev);


    // пагінація
    const changePage = (name?: string) => {
        if (name === "+") {
          setPage(prevState => prevState + 1);  
        }
        if (name === "-") {
          setPage(prevState => prevState - 1);   
        }
        
    }; 

    const changePageButton = (currentPage: number) => {
        setPage(currentPage);
    }
// console.log(page); 

  // рендер даних
    async function getProjects() {
        const projectsItems = await getAllProjects(page, 8);
        if (projectsItems) {
            
           const addElementsData = projectsItems?.projects?.map(item => ({ ...item, isShow: false, isDelete: false }))
            if (projectsItems.total === 0) setPage(page - 1);
            if (page === 0) setPage(1);
            
                setData(addElementsData);
                setProjects(projectsItems);
        }
      
    }

    // console.log(data); 
    useEffect(() => { getProjects() }, [page, toggleRender])



    const addIsToggle = (id: string, currentIsShow: boolean, name: 'update' | 'delete'): void => {
        setData(prevData => {
        if (prevData === null) return [];
        const newData = prevData.map((project: ProjectsData) => {
            if (project._id === id) {
                if (name === 'update') {
                    return { ...project, isShow: currentIsShow };
                }
                if (name === 'delete') {
                    return { ...project, isDelete: currentIsShow };
                }
            }
            return project;
        });

        return newData;
    });
};


const onChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value, id } = e.currentTarget;

    setData(prevData => {
        if (prevData === null) return [];
        const newData = prevData.map((project: ProjectsData) => {
            if (project._id === id) {
                return { ...project, [name]: value };
            }
            return project;
        });

        return newData;
    });
};

    
    return (
        <section>
            <div className='flex items-center justify-center gap-1 mb-16'>
                <h3 className="font-bold font-alternates text-5xl">Список кошторисів</h3>
                <button className=''
                    onClick={isToggle}
                >
                 <PlusIcon className='size-10 text-black'/>   
                </button>
            </div>


            <ul className={data && data?.length <= 1 ? "mb-6 flex flex-wrap gap-8 justify-center" : "mb-6 flex flex-wrap gap-8"}>
                {Array.isArray(data) && data?.map(({ _id, title, description, isShow, isDelete }) => (
                  <li className="w-[608px] px-8 py-8 bg-white rounded-3xl shadow-base" key={_id}>
                    <div className="mb-6 flex items-center gap-6">

                           <button
                                onClick={async () => {
                                      if(_id)
                                        addIsToggle(_id, !isShow, 'update')
                                    if (isShow) {
                                      
                                        const data = await updatePrice({ _id, title, description })
                                        if (!data.status) {
                                        isRender()
                                        setMessage('Кошторис успішно оновлено!');
                                        setType('info');
                                        setNotificationTitle('Оновлення');
                                        setNotificationIsOpen(true);     
                                        } else {
                                            
                                          setMessage('Помилка: ' + (forbiddenFormatMessage(data.data?.message) || 'Не вдалося оновити кошторис!'));
                                          setType('error');
                                          setNotificationTitle('Помилка');
                                          setNotificationIsOpen(true);
                                        }
                                        }
                                    }
                                    }
                                  className={isShow ? `w-12 h-12 bg-blue-5 rounded-full hover:bg-blue-15 focus:bg-blue-15` :
                                  `w-12 h-12 border border-blue-20 rounded-full hover:bg-blue-5 focus:bg-blue-5
                                  hover:border-0 focus:border-0`
                                   }
                            type='button'>
                                {isShow ? (<PiFloppyDisk className='size-6 text-gray-30 mx-auto'/>) : (<PencilSquareIcon className='size-6 text-gray-30 mx-auto'/>)}
                                 
                        </button>
                        
                            <ButtonDelete
                                click={() => {
                            if (_id) {
                             addIsToggle(_id, !isDelete, 'delete');
                            setCurrentData({ _id, title });
                            toggleDelete();    
                            }
                                   
                        }} isActive={isShow}
                            />

                    </div>
                    
                        <span className="flex items-center gap-4 mb-7">
                            <p className="font-semibold text-2xl">Назва кошторису:</p>
                            {!isShow ? (<p className="font-normal text-base">{title}</p>) : 
                           (<input id={_id} maxLength={10} name='title' className="font-normal text-base focus:outline-none"  value={title} disabled={!isShow} onChange={onChange} />)}
                            
                        </span>
                        <span className="flex items-center gap-10 mb-7">
                            <p className="font-semibold text-2xl">Адреса об’єкту:</p>
                            {!isShow ? ( <p className="font-normal text-base">{description}</p>) : 
                            (<input id={_id} maxLength={30} name='description' className="font-normal text-base focus:outline-none" value={description} disabled={!isShow} onChange={onChange} />)}
                           
                        </span>
                    
                       <Link className="flex items-center gap-2 font-medium text-xl text-blue-30 hover:text-blue-25 focus:text-blue-25" href={`/estimates/${_id}`} >Детальніше <ArrowRightIcon className="size-6 text-blue-30"/></Link>
                </li>  
                ))}
                
            </ul>
            
            <div className="flex items-center justify-center">
                <EstimatesPagination changePage={changePage} changePageButton={changePageButton} amountPages={projects?.amountPages} page={page} />
            </div>
           
     {notificationIsOpen && (
          <Notification     
          type={type}
          title={notificationTitle}
          text={message}
          onClose={() => setNotificationIsOpen(false)}
        />

      )}

            {toggleModal && (<AddProjectModal
                toggle={isToggle}
                isShow={isRender}
                setMessage={setMessage}
                setNotificationIsOpen={setNotificationIsOpen}
                setType={setType}
                setNotificationTitle={setNotificationTitle}
            />)}
            {isShowDeleteModal && (<DeleteModal
                data={currentData}
                toggle={toggleDelete}
                nameComponent='project'
                toggleData={isRender}
                setMessage={setMessage}
                setNotificationIsOpen={setNotificationIsOpen}
                setType={setType}
                setNotificationTitle={setNotificationTitle}
            />)}
        </section>
    )
}