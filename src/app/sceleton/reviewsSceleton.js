import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import RatingStars from '../UI/RatingStars/RaitingStars';
import '../styles/SceletonReviews.css';

const ReviewsSkeleton = (slidesPerView) => {
    return (
        <section>
            <h2 className="text-5xl font-alternates font-bold text-black mb-[60px] w-[427px]" >
                Що говорять про нас люди
            </h2>

            < div className="relative" >
                <div className="swiper-container skeleton" >
                    <div className="swiper-wrapper" >
                        {
                            Array(slidesPerView).fill(0).map((_, index) => (
                                <div key={index} className="w-[395px] h-[220px] bg-[#DFDFDF] rounded-3xl px-6 py-7 mx-2">
                                    <div className="flex flex-col">
                                        <div className="skeleton-text flex justify-between mb-4">
                                            <div className="w-[150px] h-[20px] bg-gray-25 rounded-xl"> </div>
                                            <RatingStars rating={5} />
                                        </div>
                                        <div className="skeleton-text mb-8 max-w-[50px] h-[10px] bg-gray-25 rounded-xl" > </div>
                                        <div className="skeleton-text mb-4 w-full h-[20px] bg-gray-25 rounded-xl"> </div>
                                        <div className="skeleton-text mb-4 w-full h-[20px] bg-gray-25 rounded-xl"> </div>
                                        <div className="skeleton-text w-full h-[20px] bg-gray-25 rounded-xl"> </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>

                < div className="relative flex justify-center items-center mt-5 gap-0" >
                    <button className="button-prev w-8 h-8 flex items-center justify-center" >
                        <FaChevronLeft />
                    </button>
                    < div className="skeleton-text w-8 h-8 bg-gray-25 mx-1" > </div>
                    < div className="skeleton-text w-8 h-8 bg-gray-25 mx-1" > </div>
                    < div className="skeleton-text w-8 h-8 bg-gray-25 mx-1" > </div>
                    < button className="button-next w-8 h-8 flex items-center justify-center" >
                        <FaChevronRight />
                    </button>
                </div>
            </div>

            < div className="flex justify-center mt-8 mb-[38px]" >
                <button
                    className="px-[148px] py-4 border border-[#0C4A6E] rounded-3xl text-[#0C4A6E] text-xl font-semibold hover:bg-blue-30 hover:text-white focus:bg-blue-30 focus:text-white"
                >
                    Залишити відгук
                </button>
            </div>
        </section>
    );
};

export default ReviewsSkeleton;