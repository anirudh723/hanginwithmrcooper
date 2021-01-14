import * as React from 'react';
import './StarIcon.css';

const EMPTY_STAR = "\u2606";
const FILLED_STAR = "\u2B50"

interface StarIconProps {
    starValue: number,
    rating: number
    hoverOnRating: number, 
    hoverOnStar: (starValue: number) => void, 
    hoverOffStar: () => void, 
    selectStar: (starValue: number) => void
}

export const StarIcon: React.FC<StarIconProps> = ({starValue, rating, hoverOnRating, hoverOnStar, hoverOffStar, selectStar}) => {

    const drawStar = () => {
        if (starValue <= hoverOnRating || starValue <= rating) {
            return FILLED_STAR;
        }
        return EMPTY_STAR;
    }

    return (
        <span 
            className="star pr-5 is-size-3"
            onMouseEnter={() => hoverOnStar(starValue)}
            onMouseLeave={() => hoverOffStar()}
            onClick={() => selectStar(starValue)}
        >
            {drawStar()}
        </span>
    )
}