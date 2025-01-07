import React, { useState, useEffect } from 'react';

interface NotificationProps {
    type: 'success' | 'error' | 'warning' | 'info';
    title: string;
    text: string;
    onClose: () => void;
}

const notificationClasses: { [key: string]: string } = {
    success: 'bg-green-100 border-green-500 text-green-700',
    error: 'bg-red-100 border-red-500 text-red-700',
    warning: 'bg-yellow-100 border-yellow-500 text-yellow-700',
    info: 'bg-blue-100 border-blue-500 text-blue-700',
};

const Notification: React.FC<NotificationProps> = ({ type, title, text, onClose }) => {
    const [isVisible, setIsVisible] = useState(true);

    const handleClickOutside = (event: MouseEvent | null) => {
        if (event === null || event.target === null) {
            return;
        }

        const target = event.target as HTMLElement;
        const closestNotification = target.closest('.notification');

        if (closestNotification === null) {
            setIsVisible(false);
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    const handleClose = () => {
        setIsVisible(false);
        onClose();
    };

    return (
        <div className="fixed w-full h-full top-0 left-0 z-50 bg-black bg-opacity-50">
            <div
                className={`notification ${notificationClasses[type]} ${isVisible ? 'absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] p-4 rounded-lg shadow-lg z-50 flex-col justify-center items-center ' : 'hidden'} `}
                role="alert"
            >
                <h3 className="font-bold text-2xl text-center mb-6">{title}</h3>
                <p className="text-center mb-6">{text}</p>
                <div className='flex justify-center'>
                    <button className=" bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-lg text-white rounded-3xl hover:bg-blue-20 mt-6 focus:bg-blue-20" onClick={handleClose}>
                        OK
                    </button>
                </div>
            </div>
        </div >
    );
};

export default Notification;