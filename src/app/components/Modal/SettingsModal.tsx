import ChangeSettingsProject from "@/app/UI/ChangeSettingsProject";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import AddDiscount from "../Project/Settings/AddDiscount";
import AddLowEstimate from "../Project/Settings/AddLowEstimate";
import AddAlow from "../Project/Settings/AddAllow";
import { ProjectItem } from "@/app/interfaces/projects";
import UpdateAlow from "../Project/Settings/UpdateAllow";
import DeleteAlow from "../Project/Settings/DeleteAllow";



interface SettingsProps {
    project: ProjectItem | null;
    id?: string | undefined;
    toggle?: () => void;
    isShow?: () => void;
}

const SettingsModal: React.FC<SettingsProps> = ({ toggle, id, project }) => {
    const [page, setPage] = useState('add-allow');
    const [data, setData] = useState('add-allow');

  

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
       const { name, value, } = e.currentTarget;
    switch (name) {
      case 'settings':
            if (value === 'add-allow') {
                setData(value);
                setPage(value);
        
            }
            if (value === 'update-allow') {
               setData(value);
                setPage(value); 
            }
             if (value === 'delete-allow') {
               setData(value);
                setPage(value); 
            }
             if (value === 'discount') {
               setData(value);
                setPage(value); 
            }
              if (value === 'low-estimate') {
               setData(value);
                setPage(value); 
            }
        break;

      default:
        return;
    }

  }

    return (
         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> 
            <section className="relative bg-white px-[20px] p-8 rounded-[24px] w-[908px] shadow-lg">  
              <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black' /></button>
                <ChangeSettingsProject data={data} changeCheckbox={handleChange} />
                {page === 'add-allow' && (<AddAlow id={id} toggle={toggle} />)}
                {page === 'update-allow' && (<UpdateAlow project={project} id={id} toggle={toggle} />)}
                {page === 'delete-allow' && (<DeleteAlow project={project} id={id} toggle={toggle} />)}
                {page === 'discount' && (<AddDiscount id={id} toggle={toggle} />)}
                {page === 'low-estimate' && (<AddLowEstimate id={id} toggle={toggle} />)}
            </section>
        </div>
    )
}

export default SettingsModal;