import { Metadata } from 'next';
import MainSection from './components/home/MainSection';
import OrderAs from './components/home/OrderAs';
import Features from './components/home/Features';
import Questions from './components/home/Questions';
import Footer from './components/Footer/Footer';
import Reviews from './components/home/Reviews';



export const metadata: Metadata = {
  title: "Головна",
  description: "Головна сторінка інструменту для створення кошторисів Estimate app",
};

export default function Home() {

  return (
    <>
      <div className="bg-gray-0 pt-20 pb-20 ">
        <div className='desktop:w-[1249px] tabletBig:w-[1000px] tablet:w-[768px] mobile:w-[375px] mx-auto'>
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