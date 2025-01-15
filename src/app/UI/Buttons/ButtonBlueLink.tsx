import Link from 'next/link';
import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
export default function ButtonBlueLink({title, link}: ButtonBlueProps) {
  return (
    <Link href={`${link}`} className={` bg-blue-30 px-8 font-semibold 
        desktop:py-4 tabletBig:py-4 tablet:py-4 mobile:py-2
        desktop:text-xl tabletBig:text-xl tablet:text-xl mobile:text-sm
       text-white rounded-3xl hover:bg-blue-20 focus:bg-blue-20`}>
      {title}
    </Link>
  );
}   


