import Image from 'next/image';
import worker from '../../assets/worker-2.png';
export default function Features() {
    return (
        <section className='mb-24'>
            <h3 className='text-5xl font-alternates font-semibold text-gray-30 mb-16'>Особливості Estimate</h3>
            <div className='flex items-center gap-8'>
            <ul className="w-7/12">
                <li className="flex items-center mb-4 gap-5">
                    <p className="text-5xl text-blue-20 font-medium ">/01</p>
                    <div>
                    <h4 className="text-3xl text-black font-alternates font-semibold mb-5">Створіть кошторис за лічені хвилини</h4>
                    <p className="text-base text-black font-normal">Наш інтуїтивний застосунок дозволяє швидко створити точний кошторис на будь-які
                        будівельні/ремонтні роботи. Додайте матеріали, вкажіть кількість та вартість
                        – і кошторис готовий!
                        </p>
                    </div>
                </li>
                <li className="flex items-center mb-4 gap-5">
                    <p className="text-5xl text-blue-20 font-medium ">/02</p>
                    <div>
                    <h4 className="text-3xl text-black font-alternates font-semibold mb-5">Гнучкі шаблони</h4>
                    <p className="text-base text-black font-normal">Створюйте шаблони кошторисів для типових проектів і легко адаптуйте їх під свої потреби.
                        </p>
                    </div>
                </li>
                <li className="flex items-center mb-4 gap-5">
                    <p className="text-5xl text-blue-20 font-medium ">/03</p>
                    <div>
                    <h4 className="text-3xl text-black font-alternates font-semibold mb-5">Мобільна версія</h4>
                        <p className="text-base text-black font-normal">Встановіть мобільний застосунок і Estimate App завжди буде з Вами у кишені.</p>
                    </div>
                </li>
                <li className="flex items-center mb-4 gap-5">
                    <p className="text-5xl text-blue-20 font-medium ">/04</p>
                    <div>
                    <h4 className="text-3xl text-black font-alternates font-semibold mb-5">Безкоштовний доступ</h4>
                    <p className="text-base text-black font-normal">Вільне користування застосунком без реклами та купівлі додаткових функцій. Всі функції
                        безкоштовні.
                        </p>
                    </div>
                </li>
                </ul>
                <div className="relative w-[463px] h-[330px] flex-1 bg-blue-30  rounded-l-full overflow-visible">
                <div className="absolute bottom-0 right-0">
            <Image
                src={worker} 
                alt="worker" 
                width={409}                 
                height={442} 
                quality={100}                   
                    />
                </div>
                </div>  
            </div>
        </section>
    )
}