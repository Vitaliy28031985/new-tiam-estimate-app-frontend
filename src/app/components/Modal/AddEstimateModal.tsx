'use client'
import { XMarkIcon } from "@heroicons/react/16/solid";
import { saveProject } from "../../utils/actionsProject";
import { EstimateCreate } from "@/app/interfaces/estimateInterfaces";
import { addEstimate } from "@/app/utils/Estimates";


interface AddEstimateModalProps {
    id: string | undefined;
    toggle?: () => void;
    isShow?: () => void;
}
const AddEstimateModal: React.FC<AddEstimateModalProps> = ({ toggle, isShow, id }) => {

    const onSubmit = async (formData: FormData) => {
        const result = await saveProject(formData);
        if (id) {
            const newData: EstimateCreate = { title: result.title.toString(), projectId: id };

            await addEstimate(newData);
       
        }
       
        try {
            if (toggle) toggle();
            if (isShow) isShow();
        } catch {
            console.error('Щось пішло не так!');  
      }
       
    }

    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <section className="relative bg-white px-[71px] p-8 rounded-[24px] w-[608px] shadow-lg">
                <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                
                <form action={onSubmit}>
                    <div className="mb-6">
                        <label className="inline-block font-normal text-base mb-2" htmlFor="title">Найменування</label>
                        <input name="title" autoComplete="off" defaultValue="" className="w-[480px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none" type="text" id="title" placeholder="Введіть назву таблиці*" />
                    </div>
                    
                    <button className="w-[480px] h-[49px] bg-blue-30 py-4 rounded-full text-white text-center text-sm font-bold  focus:bg-blue-25 hover:bg-blue-25">Додати</button>
                </form>
            </section>
            </div>

    )
}

export default AddEstimateModal;

