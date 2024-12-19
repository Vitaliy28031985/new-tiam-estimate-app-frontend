
import { FaStar } from "react-icons/fa";
import { FC } from 'react';


interface RatingStarsProps {
    rating: number;
    maxStars?: number;
}

const RatingStars: FC<RatingStarsProps> = ({ rating, maxStars = 5 }) => {
    const fullStars = Math.floor(rating);
    const emptyStars = maxStars - fullStars;

    return (
        <div className="flex gap-1">
            {Array.from({ length: fullStars }, (_, index) => (
                <FaStar key={`full-${index}`} className="fill-[#FCD34D] w-6 h-6" />
            ))}
            {Array.from({ length: emptyStars }, (_, index) => (
                <FaStar key={`empty-${index}`} className="fill-[#A3A3A3] w-6 h-6" />
            ))}
        </div>
    );
};

export default RatingStars;