"use client";

import { FC, useState } from "react";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";
import axios from "axios";
import ButtonBlue from "@/app/UI/Buttons/ButtonBlue";
import BASE_URL from "@/app/utils/base";
import { useRouter } from 'next/navigation';


interface AddReviewModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const AddReviewModal: FC<AddReviewModalProps> = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState<number>(0);
    const [hover, setHover] = useState<number>(0);
    const [comment, setComment] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const auth = false;
    const router = useRouter();
    if (!isOpen) return null;



    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!rating) {
            setError("Rating are required.");
            return;
        }

        try {
            const payload = { comment, rating };
            await axios.post(`${BASE_URL}api/reviews/create`, payload);
            onClose();
        } catch (error) {
            console.error("Failed to submit review:", error);
            setError("Failed to submit the review. Please try again.");
        }


    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">

            {auth ?
                (<div className="bg-[#DFDFDF] px-[71px] py-[53.5px] rounded-[24px] w-[912px] shadow-lg">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-5xl font-bold">Залиште свій відгук</h2>
                        <button
                            className="text-blue-20 hover:text-blue-30"
                            onClick={onClose}
                        >
                            <IoClose className="w-10 h-10" />
                        </button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-8">
                            <label
                                className="block text-xl font-medium mb-3"
                                htmlFor="rating"
                            >
                                Наскільки задоволені сервісом?*
                            </label>
                            <div className="flex" id="rating">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        className="bg-transparent border-none outline-none cursor-pointer"
                                        onClick={() => setRating(star)}
                                        onMouseEnter={() => setHover(star)}
                                        onMouseLeave={() => setHover(0)}
                                    >
                                        <FaStar
                                            size={32}
                                            className={`transition-colors ${(hover || rating) >= star
                                                ? "fill-[#FCD34D]"
                                                : "fill-[#A3A3A3]"
                                                }`}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="block text-xl font-semibold mb-3" htmlFor="comment">
                                Відгук
                            </label>
                            <textarea
                                id="comment"
                                className="w-full bg-[#DFDFDF] border border-black rounded-lg px-8 py-4 focus:outline-none focus:ring-2 focus:ring-blue-30 mb-3"
                                rows={4}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                            ></textarea>
                            <p >* - Відповідь обов’язкова</p>
                            {error &&
                                <p className="text-red-500 text-sm">{error}</p>
                            }
                        </div>
                        <div className="flex justify-center">
                            <ButtonBlue title="Залишити відгук" click={() => handleSubmit} />

                        </div>
                    </form>

                </div >)
                : (
                    <div className="bg-[#DFDFDF] px-[71px] py-[53.5px] rounded-[24px] w-[912px] shadow-lg">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-5xl font-bold">Вибачте!</h2>
                            <button
                                className="text-blue-20 hover:text-blue-30"
                                onClick={onClose}
                            >
                                <IoClose className="w-10 h-10" />
                            </button>
                        </div>
                        <p className="text-xl font-semibold mb-8">Залишати відгуки можуть лише авторизовані користувачі.</p>
                        <div className="flex justify-center">
                            <ButtonBlue title="Авторизуватися" click={() => router.push('login')} />

                        </div>
                    </div>
                )}

        </div >
    );
};

export default AddReviewModal;
