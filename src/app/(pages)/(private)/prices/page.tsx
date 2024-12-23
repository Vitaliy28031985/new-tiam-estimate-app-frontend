import { Metadata } from "next";
import PricesComponent from "@/app/components/Prices/Prices";

export const metadata: Metadata = {
  title: "Прайс",
  description: "Сторінка прайсу користувача",
};
export default function Prices() {
    return (
      <main className="bg-gray-0 pt-20 pb-20">
       <div className='w-[822px] ml-auto mr-auto container bg-white p-12 rounded-3xl shadow-pricesPage'>
         <PricesComponent/>
       </div>
      </main>
    )
}
