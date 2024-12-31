import { XMarkIcon } from "@heroicons/react/24/outline";

interface SettingsProps {
    id?: string | undefined;
    toggle?: () => void;
    isShow?: () => void;
}

const SettingsModal: React.FC<SettingsProps> = ({ toggle, isShow, id }) =>{
    return (
         <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center z-50"> 
            <section className="relative bg-white px-[71px] p-8 rounded-[24px] w-[608px] shadow-lg">
                <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
            </section>
        </div>
    )
}

export default SettingsModal;