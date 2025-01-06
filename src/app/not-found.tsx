import ButtonBlueLink from "./UI/Buttons/ButtonBlueLink";

export default function NotFound() {
    return (
        <div className=" bg-bgImg  bg-start  bg-no-repeat">
            <div className="w-[1249px] mx-auto container pb-32">
                <h1 className="text-center text-404-size pt-28">404</h1>
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