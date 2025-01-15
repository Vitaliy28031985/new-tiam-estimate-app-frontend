import { Metadata } from 'next';
import MainSection from './components/home/MainSection';
import OrderAs from './components/home/OrderAs';
import Features from './components/home/Features';
import Questions from './components/home/Questions';
import Footer from './components/Footer/Footer';
import Reviews from './components/home/Reviews';



export const metadata: Metadata = {
  title: "Home",
  description: "Головна сторінка інструменту для створення кошторисів Estimate app",
};

export default function Home() {

  return (
    <>
      <div className="bg-gray-0 pt-20 pb-20">
        <div className='w-[1249px] ml-auto mr-auto container'>
          <MainSection />
          <OrderAs />
          <Features />

          <Reviews />


          <Questions />

        </div>
      </div>
      <Footer />
    </>
  );
}