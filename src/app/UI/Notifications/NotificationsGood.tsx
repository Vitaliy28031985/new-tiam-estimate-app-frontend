
interface DeleteModalProps {
     title: string | undefined | null;
    nameComponent?: string;
    toggle?: () => void;
    toggleData?: () => void;
}

const NotificationsGoodModal: React.FC<DeleteModalProps> = ({ title }) => {
    
    
   

    return (
            
    <div className="fixed inset-0 z-50 bg-green px-[71px] p-8 rounded-[24px] w-96 h-52 shadow-lg top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
           
        <h4 className=' text-white text-2xl font-semibold text-center mt-8'>{title}</h4> 
                 
    </div>   
                      
    )
}

export default NotificationsGoodModal;