'use client'
import { XMarkIcon } from "@heroicons/react/16/solid";
import { saveProject } from "../../utils/actionsProject";
import { Advance } from "@/app/interfaces/projects";
import { dataFormat, forbiddenFormatMessage } from "@/app/utils/formatFunctions";
import { addAdvance } from "@/app/utils/advances";




interface AddAdvanceModalProps {
    id: string | undefined;
    toggle?: () => void;
    isShow?: () => void;
    setMessage?: React.Dispatch<React.SetStateAction<string>>;
    setNotificationIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
    setType?: React.Dispatch<React.SetStateAction<'success' | 'error' | 'warning' | 'info'>>;
    setNotificationTitle?: React.Dispatch<React.SetStateAction<'Помилка' | 'Оновлення' | 'Додавання' | 'Видалення' | 'Знижка' | 'Доступ' | 'Знижений кошторис'>>;
}
const AddAdvanceModal: React.FC<AddAdvanceModalProps> = ({
    toggle,
    isShow,
    id,
    setMessage,
    setNotificationIsOpen,
    setType,
    setNotificationTitle
}) => {

    const onSubmit = async (formData: FormData) => {
        const result = await saveProject(formData);
        if (id) {
            const newData: Advance = {
                comment: result.comment.toString(),
                date: dataFormat(result.date.toString()),
                sum: Number(result.sum),
                projectId: id
            };
            const data = await addAdvance(newData);
            if (!data.status) {
             if (setMessage)
                 setMessage('Позицію авансу успішно додано!');
             if (setType)
                 setType('info');
             if (setNotificationTitle)
                 setNotificationTitle('Додавання');
             if (setNotificationIsOpen)
                 setNotificationIsOpen(true);
         } else { 
             if(setMessage)
                  setMessage('Помилка: ' + (forbiddenFormatMessage(data.data?.message) || 'Не вдалося додати позицію авансу!'));
             if(setType)                       
                 setType('error');
             if(setNotificationTitle)
                 setNotificationTitle('Помилка');
             if(setNotificationIsOpen)
                 setNotificationIsOpen(true);
         }    
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
                        <label className="inline-block font-normal text-base mb-2" htmlFor="title">Коментар</label>
                        <input name="comment" autoComplete="off" defaultValue="" className="w-[480px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none" type="text" id="comment" placeholder="Введіть коментар*" />
                    </div>

                   
                    <div className="mb-6">
                        <label className="inline-block font-normal text-base mb-2" htmlFor="title">Дата</label>
                        <input name="date" autoComplete="off" defaultValue="" className="w-[480px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none" type="date" id="date" placeholder="Введіть  Дату авансу*" />
                    </div>
                    
                   <div className="mb-6">
                        <label className="inline-block font-normal text-base mb-2" htmlFor="title">Сума в грн.</label>
                        <input name="sum" autoComplete="off" defaultValue="" className="w-[480px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none" type="number" id="sum" placeholder="Введіть загальну суму авaнсу*" />
                    </div>

                    <button className="w-[480px] h-[49px] bg-blue-30 py-4 rounded-full text-white text-center text-sm font-bold  focus:bg-blue-25 hover:bg-blue-25">Додати</button>
                </form>
            </section>
            </div>

    )
}

export default AddAdvanceModal;

