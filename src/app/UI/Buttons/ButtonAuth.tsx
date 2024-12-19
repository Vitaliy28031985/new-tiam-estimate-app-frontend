import { ButtonBlueProps } from '../../interfaces/ButtonInterface';
export default function ButtonAth({title}: ButtonBlueProps) {
  return (
      <button type='submit' className={`w-[453px] bg-blue-30 pt-4 pb-4 pl-8 pr-8 font-semibold text-xl
       text-white rounded-3xl hover:bg-blue-20 mt-6 focus:bg-blue-20 disabled:text-gray-10` }>
          {title}
      </button>
  );
}