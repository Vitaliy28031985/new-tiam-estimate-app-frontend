import { PriceItem } from "@/app/interfaces/projects";
import { PencilSquareIcon, TrashIcon} from '@heroicons/react/24/outline';
import ButtonBlue from "@/app/UI/Buttons/ButtonBlueProject";
import ButtonDelete from "@/app/UI/Buttons/ButtonDelete";
import ButtonUpdate from "@/app/UI/Buttons/ButtonUpdate";

interface EstimateProps {
  project: PriceItem | null;
}

const EstimateItem: React.FC<EstimateProps> = ({ project }) => {
    if (!project) {
    return <div>No project available</div>;
    }

    // console.log(project?.estimates);
    
    return (
        <div>
            <ul className="mb-8 flex items-center gap-4 justify-center">
                <li><ButtonBlue type="button" title="Додати таблицю" /></li>
                <li><ButtonBlue type="button" title="Створити таблицю Excel" /></li>
                <li><ButtonBlue type="button" title="Створити PDF файл" /></li>
            </ul>
            
            <section>
                {project && project?.estimates?.map((item, index) => (
                    <div className="mb-6" key={item?._id}>
                  <div className="flex items-center gap-6 justify-center mb-8"> 
                        <p className="font-semibold text-xl">{ item?.title}</p>
                            <ButtonUpdate/>
                            <ButtonDelete />
                        </div>

                     <tbody className="table-auto w-full">
                  <tr className="">
                   <td className="border border-gray-20 p-3"><p>№ з/п.</p></td>
                   <td className="border border-gray-20 p-3"><p>Назва</p> </td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Одиниця</p></td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Кількість</p></td>
                   <td className="border border-gray-20 p-3"><p className="font-bold text-sm">Ціна в грн.</p></td>
                   <td className="border border-gray-20 p-3"><p>Сума в грн.</p></td>
                   <td className="border border-gray-20 p-3"><p>Редагувати</p></td>
               </tr>    
                       
                {item?.positions && item?.positions?.map(({ _id, id, title, unit, price, number, result }, index) => (         
                <tr key={_id} className="">
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{index + 1}</p></td>
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal">{title}</p></td>                 
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{unit}</p></td>
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{number}</p></td>
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{price}</p></td>   
                <td className="border border-gray-20 p-3"><p className="text-xs font-normal text-center">{result}</p></td>
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
        </div>
    )
}

export default EstimateItem;