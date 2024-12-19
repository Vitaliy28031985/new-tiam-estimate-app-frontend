'use client'

import { useEffect, useState } from "react"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import "../../styles/Review.css";
import RatingStars from "@/app/UI/RatingStars/RaitingStars";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import formatDate from '../../utils/formatDate';
import Image from "next/image";
import WorkerFoto from '../../assets/worker.png';


interface Reviews {
    _id: number;
    name: string;
    comment: string;
    rating: number;
    createdAt: string;
    avatar: string;
}

export default function Reviews() {
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [reviewPerPage, setReviewPerPage] = useState<number>(3);
    const [reviews, setReviews] = useState<Reviews[]>([]);
    const totalPages = Math.ceil(reviews.length / reviewPerPage);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    }

    const updateRevewsPerPage = () => {
        const width = window.innerWidth;
        if (width < 768) {
            setReviewPerPage(1);
        } else if (width < 1024) {
            setReviewPerPage(2);
        } else {
            setReviewPerPage(3);
        }
    }

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await fetch("https://new-team-estimate-app-backend.onrender.com/api/reviews");
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Reviews[] = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews:", error);
            }
        }

        fetchReviews();
        updateRevewsPerPage();
        window.addEventListener('resize', updateRevewsPerPage);
        return () => {
            window.removeEventListener('resize', updateRevewsPerPage);
        };
    }, []);

    const currentReviews = reviews.slice(currentPage * reviewPerPage, (currentPage + 1) * reviewPerPage);

    return (
        <section id="reviews">
            <h2 className='text-5xl font-alternates font-bold text-black mb-[60px] w-[427px]'>Що говорять про нас люди</h2>

            <Swiper
                allowTouchMove={true}
                spaceBetween={24}
                slidesPerView={reviewPerPage}
                onSlideChange={(swiper) => handlePageChange(swiper.activeIndex)}
            >
                {currentReviews.map((review) => (
                    <SwiperSlide key={review._id} className="bg-blue-5 rounded-3xl">
                        <div className='flex  flex-col'>
                            <div className='flex justify-between mb-3'>
                                <div className="flex gap-2 items-center justify-center">
                                    <Image
                                        src={review.avatar ? review.avatar : WorkerFoto}
                                        alt={review.name}
                                        width={32}
                                        height={32}
                                        className='rounded-full'
                                    />
                                    <p className='text-2xl text-black font-semibold'>{review.name}</p>
                                </div>
                                <RatingStars rating={review.rating} />
                            </div>
                            <p className="text-xs text-[#A3A3A3]  mb-3" >{formatDate(review.createdAt)}</p>
                            <p className='review-comment text-xl text-black '>{review.comment}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="flex justify-center items-center w-full">
                <button
                    className={`flex justify-center items-center w-8 h-8 ${currentPage === 0 ? 'opacity-50' : ''}`}
                    disabled={currentPage === 0}
                    onClick={handlePrevPage}
                >
                    <FaChevronLeft />
                </button>
                <div className='pagination'>
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={index === currentPage ? 'active' : ''}
                            onClick={() => handlePageChange(index)}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
                <button
                    className={`flex justify-center items-center w-8 h-8 ${currentPage === totalPages - 1 ? 'opacity-50' : ''}`}
                    disabled={currentPage === totalPages - 1}
                    onClick={handleNextPage}
                >
                    <FaChevronRight />
                </button>
            </div>




        </section>
    )
}
