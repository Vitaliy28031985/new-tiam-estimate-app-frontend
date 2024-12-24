import { Metadata } from "next";
import EstimateList from "@/app/components/EstimateList/EstimateList";

export const metadata: Metadata = {
  title: "Кошториси",
  description: "Сторінка списку кошторисів",
};
export default function Estimates() {
  return (
      <main className="bg-gray-0 pt-20 pb-20">
      <div className="w-[1248px] mx-auto ">
        <EstimateList />
        </div>
      </main>
       
    )
}