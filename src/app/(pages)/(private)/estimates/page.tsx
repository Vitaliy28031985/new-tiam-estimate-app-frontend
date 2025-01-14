import { Metadata } from "next";
import EstimateList from "@/app/components/EstimateList/EstimateList";

export const metadata: Metadata = {
  title: "Кошториси",
  description: "Сторінка списку кошторисів",
};
export default function Estimates() {
  return (
      <main className="bg-gray-0 pt-20 pb-20">
      <div className="desktop:w-[1248px] tabletBig:w-[1000px] tablet:w-[768px] mobile:w-[375px] mx-auto ">
        <EstimateList />
        </div>
      </main>
       
    )
}