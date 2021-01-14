import * as React from 'react';
import { StarIcon } from './StarIcon';

interface StarRatingProps {
    rating: number
    setProductRating: (rating: number) => void
}

export const StarRating: React.FC<StarRatingProps> = ({rating, setProductRating}) => {
    const [hoverOnRating, setHoverOnRating] = React.useState(0);

    const hoverOnStar = (starValue: number) => {
        setHoverOnRating(starValue);
    }

    const hoverOffStar = () => {
        setHoverOnRating(0);
    }

    const selectStar = (starValue: number) => {
        setProductRating(starValue);
    }

    const starValues = [1, 2, 3, 4, 5];
    return (
        <div className="mb-5">
            {starValues.map(starValue => {
                const starIconProps = {starValue: starValue, rating: rating, hoverOnRating: hoverOnRating, hoverOnStar: hoverOnStar, hoverOffStar: hoverOffStar, selectStar: selectStar};
                return <StarIcon {...starIconProps}/>
            })}
        </div>
    )
}