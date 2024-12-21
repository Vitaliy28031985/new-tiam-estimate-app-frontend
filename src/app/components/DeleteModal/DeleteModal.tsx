import { XMarkIcon } from '@heroicons/react/24/outline';

interface DeleteModalProps {
    data?: { id: string, title: string } | null;
    nameComponent?: string;
    toggle?: () => void;
    
}

const DeleteModal: React.FC<DeleteModalProps> = ({ data, nameComponent, toggle }) => {
    
    console.log(data)

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white px-[71px] p-8 rounded-[24px] w-[494px] shadow-lg">
             <button type="button" onClick={toggle}  className='absolute top-3 right-3'><XMarkIcon className='size-6 text-black'/></button>
                <h4 className='text-2xl font-semibold text-center mt-8'>Видалити {data?.title}?</h4> 
                <div className='flex gap-4 items-center mt-6 justify-center'>
                    <button className='w-[120px] text-base font-normal border border-red-0 bg-red-10 py-4 rounded-full hover:bg-red-20 focus:bg-red-20' type='button'>Так</button>
                    <button className='w-[120px] text-base font-normal text-white  bg-blue-30 py-4 rounded-full hover:bg-blue-20 focus:bg-blue-20' type='button'>Ні</button>
                </div>   
            </div>
            
        </div>
    )
}

export default DeleteModal;