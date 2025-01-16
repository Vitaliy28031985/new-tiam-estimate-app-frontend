import ButtonBlueLink from "./UI/Buttons/ButtonBlueLink";

export default function NotFound() {
    return (
        <div className=" bg-bgImg  bg-start  bg-no-repeat h-screen">
            <div className="
            h-screen
            desktop:w-[1249px] tabletBig:w-[1024px] tablet:w-[768px] mobile:w-[375px]
             mx-auto container pb-32 px-4
             desktop:bg-transparent tabletBig:mobile:bg-gray-0 tablet:mobile:bg-gray-0 mobile:bg-gray-0 mobile:opacity-80
             ">
                <h1 className="text-center 
                desktop:text-404-size tabletBig:text-404-size tablet:text-404-size mobile:text-5xl
                pt-28">404</h1>
                <p className="text-4xl text-center mb-8">
                Упс! Сторінка в цей момент не доступна!</p>
                <p className="text-xl text-center mb-8">
                    На жаль, сторінку, яку ви шукаєте, тимчасово закрито на ремонт або такої сторінки не існує.
                    Поверніться на головну сторінку або спробуйте заглянути пізніше.</p>
              <div className="flex justify-center"><ButtonBlueLink link="/" title="Повернутись на головну" /></div>
                    
            </div>
        </div>
    )
}