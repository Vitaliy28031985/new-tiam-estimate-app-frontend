import { usePathname } from 'next/navigation';

import Link from 'next/link';

interface MenuProps {
    toggle?: () => void;  
}

const MobileMenu: React.FC<MenuProps> = ({toggle,}) => {
 const pathname = usePathname();

  

    return (
       
    <ul className='absolute top-14 left-0 bg-white mobile:w-[370px] px-3 py-5 z-50'>
        <li onClick={toggle}>
            <Link className={`block mb-4 font-normal text-center text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/prices' ? 'text-blue-30' : 'text-black'}`}
                href="/prices">Прайс</Link>
        </li>
        <li onClick={toggle}>
            <Link className={`block mb-4 text-center font-normal text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/estimates' ? 'text-blue-30' : 'text-black'}`} href="/estimates">Кошториси</Link>
        </li>
        <li onClick={toggle}>
            <Link className={`block mb-4 text-center font-normal text-xl text-black hover:text-blue-30 focus:text-blue-30 ${pathname === '/profile' ? 'text-blue-30' : 'text-black'}`} href="/profile">Профіль</Link>
        </li>
    </ul>
             
    );
}

export default MobileMenu;