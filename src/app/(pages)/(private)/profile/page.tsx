
import Loader from "@/app/components/Loader/Loader";
import { Metadata } from "next";
import { lazy, Suspense } from "react";

export const metadata: Metadata = {
  title: "Профіль",
  description: "Сторінка прфілю користувача",
};
export default function Profile() {
  const LazyProfileComponent = lazy(() => import("@/app/components/Profile/Profile"));
  const LazyUnitComponent = lazy(() => import("@/app/components/Unit/Unit"));

  return (
    <main className="bg-gray-0 pt-20 pb-20">
      <Suspense fallback={<Loader />}>
        <div className='w-[608px] mx-auto mb-6 container bg-white p-6 rounded-3xl shadow-profile'>
          <LazyProfileComponent />
        </div>
        <div className='w-[608px] mx-auto container bg-white p-12 rounded-3xl shadow-pricesPage'>
          <h3 className="font-semibold text-2xl mb-6">Одиниці виміру</h3>
          <LazyUnitComponent />
        </div>
      </Suspense>
    </main>
  )
}

