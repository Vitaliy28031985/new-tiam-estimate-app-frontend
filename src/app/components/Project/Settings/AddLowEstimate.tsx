'use client'
import { saveProject } from "@/app/utils/actionsProject";
import { addLow } from "@/app/utils/settingsProject";

interface AddEstimateModalProps {
    id?: string | undefined;
     toggle?: () => void;
   }
const AddLowEstimate: React.FC<AddEstimateModalProps> = ({id, toggle}) => {
   
    const onSubmit = async (formData: FormData) => {
         const result = await saveProject(formData);
        if (id) {
            const newData: {discount: number, projectId: string} = { discount: Number(result.discount) , projectId: id };
            await addLow(newData);
        }
       
        try {
            if (toggle) toggle();
        } catch {
            console.error('Щось пішло не так!');  
      }
       
    }

    return (
        <div className="flex justify-center">
               <form action={onSubmit}>
                    <div className="mb-6">
                        <label className="block font-normal text-base mb-2" htmlFor="discount">Відсоток зниженого кошторису</label>
                        <input name="discount" autoComplete="off" defaultValue="" className="w-[580px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none" type="number" id="discount" placeholder="Введіть знижку*" />
                    </div>
                    
                    <button className="w-[580px] h-[49px] bg-blue-30 py-4 rounded-full text-white text-center text-sm font-bold  focus:bg-blue-25 hover:bg-blue-25">Встановити % зниженого кошторису</button>
                </form>
        </div>
    )
}

export default AddLowEstimate;

