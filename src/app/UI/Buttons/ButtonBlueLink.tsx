import Link from 'next/link';
import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
export default function ButtonBlueLink({title, link}: ButtonBlueProps) {
  return (
      <Link href={`${link}`} className={` bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl
       text-white rounded-3xl hover:bg-blue-20 focus:bg-blue-20`}>
      {title}
    </Link>
  );
}   


