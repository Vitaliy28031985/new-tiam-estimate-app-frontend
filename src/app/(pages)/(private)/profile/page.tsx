import ProfileComponent from "@/app/components/Profile/Profile";
import UnitComponent from "@/app/components/Unit/Unit";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профіль",
  description: "Сторінка прфілю користувача",
};
export default function Profile() {
  return (
    <main className="bg-gray-0 pt-20 pb-20">
      <div className='w-[608px] mx-auto mb-6 container bg-white p-6 rounded-3xl shadow-profile'>
        <ProfileComponent/>
      </div>
      <div className='w-[608px] mx-auto container bg-white p-12 rounded-3xl shadow-pricesPage'>
        <h3 className="font-semibold text-2xl mb-6">Одиниці виміру</h3>
        <UnitComponent/>
        </div>
    </main>
    )
}

