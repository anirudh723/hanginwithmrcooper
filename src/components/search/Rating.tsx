import * as React from 'react';

interface RatingProps {
    lowerBoundRating: number | null,
    upperBoundRating: number | null,
    setLowerBoundRating: (filterLowerBoundRating: number | null) => void,
    setUpperBoundRating: (filterUpperBoundRating: number | null) => void
}

export const Rating: React.FC<RatingProps> = ({lowerBoundRating, upperBoundRating, setLowerBoundRating, setUpperBoundRating}) => {
    
    return (
        <div>
            <h2>Product Rating</h2>
            <input
                className="searchInput p-2"
                type="number" 
                placeholder="Specify a lower bound rating..."
                value={lowerBoundRating || ""}
                onChange={(e) => setLowerBoundRating(e.target.valueAsNumber)}/>
            <input
                className="searchInput mt-1 p-2"
                type="number" 
                placeholder="Specify an upper bound rating..."
                value={upperBoundRating || ""}
                onChange={(e) => setUpperBoundRating(e.target.valueAsNumber)}/>
        </div>
    )
}