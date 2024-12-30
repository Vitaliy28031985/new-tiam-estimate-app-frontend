import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import Message from './Message';
import { deletePrice } from '@/app/utils/prices';
import { deleteProject } from '@/app/utils/projects';
import { deleteEstimate } from '@/app/utils/Estimates';
import { deletePosition } from '@/app/utils/positions';
import { deleteProjectPrice } from '@/app/utils/projectPrice';
import { deleteMaterial } from '@/app/utils/materials';
import { deleteAdvance } from '@/app/utils/advances';
import { deleteLowEstimate } from '@/app/utils/lowEstimate';

interface DeleteModalProps {
    data?: { _id?: string, projectId?: string | undefined, id?: string | undefined, estimateId?: string | undefined; positionId?: string | undefined; title: string | undefined } | null;
    nameComponent?: string;
    toggle?: () => void;
    toggleData?: () => void;
}

const DeleteModal: React.FC<DeleteModalProps> = ({ data, nameComponent, toggle, toggleData }) => {
    const [showMessage, setMessage] = useState(false);
   
    async function OnDelete() {
        try {
            if (nameComponent === 'price') {
                if (data?.id) await deletePrice(data?.id);
                if (toggleData) toggleData();
                
            }
            
            if (nameComponent === 'project') {
                if (data?._id) await deleteProject(data._id);
                if (toggleData) toggleData();
                //  window.location.reload();
            }

            if (nameComponent === 'estimate') {
                if (data) await deleteEstimate({ projectId: data.id, estimateId: data.estimateId });
                 if (toggleData) toggleData();
            }

            if (nameComponent === "low-estimate") {
                if(data) await deleteLowEstimate({ projectId: data.id, estimateId: data.estimateId })
                if (toggleData) toggleData();
            }

            if (nameComponent === 'position') {
                if (data) await deletePosition({ projectId: data.id, estimateId: data.estimateId, positionId: data.positionId });
                if (toggleData) toggleData();
            }

            if (nameComponent === 'project-price') {
                if (data) {
                    await deleteProjectPrice(data.projectId ?? null, data.id ?? null);
                    if (toggleData) toggleData();
                }  
            }
            if (nameComponent === 'material') {

                if (data) {
                    
                    await deleteMaterial({
                        projectId: data.projectId, id: data.id,
                        title: '',
                        order: '',
                        date: '',
                        sum: 0
                    })
                  if (toggleData) toggleData(); 
               }     
            }
            
               if (nameComponent === 'advance') {

                if (data) {
                    
                    await deleteAdvance({
                        projectId: data.projectId, id: data.id,
                        comment: '',
                        date: '',
                        sum: 0
                    })
                  if (toggleData) toggleData(); 
               }     
                }
            setMessage(true);
            setTimeout(function () {
            if(toggle) toggle();  
             }, 1200);
        } catch {}
    } 
    
    // console.log(data)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            {showMessage ? (<Message />) : (
              <div className="relative bg-white px-[71px] p-8 rounded-[24px] w-[494px] shadow-lg">
             <button type="button" onClick={toggle}  className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                <h4 className='text-2xl font-semibold text-center mt-8'>Видалити {data?.title}?</h4> 
                <div className='flex gap-4 items-center mt-6 justify-center'>
                    <button onClick={OnDelete} className='w-[120px] text-base font-normal border border-red-0 bg-red-10 py-4 rounded-full hover:bg-red-20 focus:bg-red-20' type='button'>Так</button>
                    <button onClick={toggle} className='w-[120px] text-base font-normal text-white  bg-blue-30 py-4 rounded-full hover:bg-blue-20 focus:bg-blue-20' type='button'>Ні</button>
                </div>   
            </div>   
            )}
           
            
        </div>
    )
}

export default DeleteModal;