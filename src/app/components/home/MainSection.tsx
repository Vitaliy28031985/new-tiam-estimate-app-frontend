'use client';
import Image from 'next/image'
import ButtonBlueLink from '@/app/UI/Buttons/ButtonBlueLink';
import homeOne from '../../assets/home-1.png';
import homeTwo from '../../assets/home-2.png';
import homeTree from '../../assets/home-3.png'
export default function MainSection() {
    
  return (
    <section id='main' className='flex desktop:gap-24 tabletBig:gap-9 
    items-center 
    tablet:px-4 mobile:px-4
    desktop:flex-row tabletBig:flex-row tablet:flex-col-reverse mobile:flex-col-reverse
    desktop:flex-nowrap tabletBig:flex-nowrap tablet:flex-wrap mobile:flex-wrap'>
        <div className=''>
          <p className='text-2xl font-semibold text-blue-20 mb-3'>Estimate app</p>
          <h3 className='text-5xl font-alternates font-semibold text-gray-30 mb-3 '>
            Найкращий інструмент для створення кошторисів
          </h3>
          <p className='text-gray-25 font-extralight text-xl mb-10 '>
            З нашим застосунком ви зможете швидко керувати витратами,
            налаштовувати шаблони та мати доступ до кошторисів – просто і безкоштовно!
          </p>
        <ButtonBlueLink title='Зареєструватися' link='/authorization?param=false' />
        </div>
        <div className='desktop:w-full tabletBig:w-full  p-0 tablet:mb-10 mobile:mb-7'>
        <div className='grid grid-cols-[2fr,2fr] gap-3'>
        
        <Image
        src={homeOne} 
        alt="one" 
        width={245}                 
        height={282} 
        quality={100}                   
          />
          
        
        <Image                 
        src={homeTwo} 
        alt="one" 
        width={245}                 
        height={282}
       quality={100}               
          /> 
        
            </div>
          <div className='ml-3 mt-3'>
        <Image
        src={homeTree} 
        alt="one" 
        width={500}                 
        height={213}
       quality={100}                
      /> 
         </div>
      
        </div>
      </section>
  );
}