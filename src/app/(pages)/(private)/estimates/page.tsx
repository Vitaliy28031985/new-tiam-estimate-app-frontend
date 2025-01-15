import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { lazy, Suspense } from "react";

export const metadata: Metadata = {
  title: "Кошториси",
  description: "Сторінка списку кошторисів",
};
export default function Estimates() {
  const LazyEstimateList = lazy(() => import("@/app/components/EstimateList/EstimateList"))

  return (
    <main className="bg-gray-0 pt-20 pb-20">
      <div className="w-[1248px] mx-auto ">
        <Suspense fallback={<Loader />}>
          <LazyEstimateList />
        </Suspense>
      </div>
    </main>

  )
}