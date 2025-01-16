import Image from 'next/image';
import Rocket from "../../UI/Icons/Rocket";
import Gear from "../../UI/Icons/Gear";
import Laptop from "../../UI/Icons/Laptop";
import worker from '../../assets/worker.png';
export default function OrderAs() {
    return (
        <section className="relative flex 
        desktop:flex-nowrap tabletBig:flex-nowrap tablet:flex-nowrap mobile:flex-wrap
        gap-4 items-end mt-[180px] pt-4 pb-12 mb-20
        desktop:pt-0 tabletBig:pt-0 tablet:pt-0 mobile:pt-40
        ">
            <div className="
            desktop:relative tabletBig:relative tablet:relative mobile:absolute
           desktop:top-0 tabletBig:top-0 tablet:top-0 -top-24
            flex-1 bg-blue-30  rounded-r-full overflow-visible
            desktop:w-[463px] tabletBig:w-[463px] tablet:w-[463px] mobile:w-[363px] 
            desktop:h-[350px] tabletBig:h-[350px] tablet:h-[350px] mobile:h-[230px]
            ">
                <div className="absolute bottom-0 left-0">
                <Image
                className='
                desktop:w-[709px] tabletBig:w-[609px] tablet:w-[559px] mobile:w-[309px]
                desktop:h-[572px] tabletBig:h-[472px] tablet:h-[422px] mobile:h-[272px]
                '       
                src={worker} 
                alt="worker" 
                width={709}                 
                height={572} 
                quality={100}                   
                    />
                </div>
            </div>
            <div className='flex-1 desktop:pt-0 tabletBig:pt-32 tablet:pt-0 mobile:pt-0'>
                <div className='desktop:static tabletBig:absolute tablet:absolute mobile:static -top-14 left-3'>
                <h3  className='text-5xl font-alternates font-semibold text-gray-30 mb-3'>Чому обирають нас?</h3>
                <p className='text-gray-25 font-extralight text-2xl mb-10'>Розповідаємо, чим ми відрізняємось від інших та що допомагає нам виділятися</p>
                </div>
                <ul className='ml-12 desktop:mt-0 tabletBig:mt-0 tablet:mt-11 mobile:mt-0'>
                    <li className='flex gap-3 items-center mb-8'>
                        <Rocket/>
                        <p className="text-black font-semibold text-2xl w-2/3">Легкість та швидкість у створенні кошторисів</p>
                    </li>
                    <li className='flex gap-3 items-center mb-8'>
                        <Gear />
                        <p className="text-black font-semibold text-2xl w-2/3">Гнучкість шаблонів для будь-яких проектів</p>
                    </li>
                    <li className='flex gap-3 items-center mb-8'>
                       <Laptop/>
                        <p className="text-black font-semibold text-2xl w-2/3">Можливість працювати з будь-якого пристрою</p>
                    </li>
                </ul>
            </div>  
        </section>
    )
}