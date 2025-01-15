
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { lazy, Suspense } from "react";

export const metadata: Metadata = {
  title: "Прайс",
  description: "Сторінка прайсу користувача",
};
export default function Prices() {
  const LazyPricesComponent = lazy(() => import("@/app/components/Prices/Prices"));

  return (
    <main className="bg-gray-0 pt-20 pb-20">
      <div className='w-[822px] mx-auto container bg-white p-12 rounded-3xl shadow-pricesPage'>
        <Suspense fallback={<Loader />}>
          <LazyPricesComponent />
        </Suspense>
      </div>

    </main>
  )
}
