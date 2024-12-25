import { XMarkIcon } from "@heroicons/react/16/solid";

interface AddProjectModalProps {
    toggle?: () => void;
    isShow?: () => void;
}
const AddProjectModal: React.FC<AddProjectModalProps> = ({ toggle, isShow }) => {
    return (
         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <section className="relative bg-white px-[71px] p-8 rounded-[24px] w-[457px] shadow-lg">
                <button type="button" onClick={toggle} className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                <h3 className="font-semibold text-2xl text-black text-center mb-6">Створення кошторису</h3>
                <form action="">
                    <div className="mb-6">
                        <label className="inline-block font-normal text-base mb-2" htmlFor="title">Найменування</label>
                        <input className="w-[324px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none" type="text" id="title" placeholder="Введіть назву об’єкта" />
                    </div>
                     <div className="mb-6">
                        <label className="inline-block font-normal text-base mb-2" htmlFor="description">Адреса об’єкта</label>
                        <input className="w-[324px] h-[49px] p-4 border border-gray-15 rounded-full text-gray-20 text-sm font-normal focus:border-blue-20 focus:outline-none" type="text" id="description" placeholder="Введіть судову адресу об’єкта" />
                    </div>
                    <button className="w-[324px] h-[49px] bg-blue-30 py-4 rounded-full text-white text-center text-sm font-bold  focus:bg-blue-25 hover:bg-blue-25">Додати</button>
                </form>
            </section>
            </div>

    )
}

export default AddProjectModal;

