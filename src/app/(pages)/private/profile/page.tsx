import ProfileComponent from "@/app/components/Profile/Profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профіль",
  description: "Сторінка прфілю користувача",
};
export default function Profile() {
  return (
    <main className="bg-gray-0 pt-20 pb-20">
      <div className='w-[608px] ml-auto mr-auto container bg-white p-6 rounded-3xl shadow-pricesPage'>
        <ProfileComponent/>
      </div>
    </main>
    )
}

