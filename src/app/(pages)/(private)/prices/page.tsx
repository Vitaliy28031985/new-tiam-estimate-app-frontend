import { Metadata } from "next";
import PricesComponent from "@/app/components/Prices/Prices";

export const metadata: Metadata = {
  title: "Прайс",
  description: "Сторінка прайсу користувача",
};
export default function Prices() {
    return (
      <main className="bg-gray-0 pt-20 pb-20">
        <div className='desktop:w-[822px] tabletBig:w-[822px] tablet:w-[722px] mobile:w-[370px] mx-auto container
        bg-white p-12 desktop:px-12 tabletBig:px-12 tablet:px-8 mobile:px-2  rounded-3xl shadow-pricesPage'>
         <PricesComponent/>
        </div>
        
      </main>
    )
}
