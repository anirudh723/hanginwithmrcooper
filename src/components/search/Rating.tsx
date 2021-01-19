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
                className="p-2"
                type="number" 
                min={0}
                placeholder="Lower bound rating..."
                value={lowerBoundRating || ""}
                onChange={(e) => setLowerBoundRating(e.target.valueAsNumber)}/>
            <input
                className="mt-1 ml-1 p-2"
                type="number"
                min={0} 
                placeholder="Upper bound rating..."
                value={upperBoundRating || ""}
                onChange={(e) => setUpperBoundRating(e.target.valueAsNumber)}/>
        </div>
    )
}