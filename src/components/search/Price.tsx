import * as React from 'react';

interface PriceProps {
    lowerBoundPrice: number | null,
    upperBoundPrice: number | null,
    setLowerBoundPrice: (filterLowerBoundPrice: number | null) => void,
    setUpperBoundPrice: (filterUpperBoundPrice: number | null) => void
}

export const Price: React.FC<PriceProps> = ({lowerBoundPrice, upperBoundPrice, setLowerBoundPrice, setUpperBoundPrice}) => {

    return (
        <div>
            <h2>Product Price</h2>
            <input
                className="searchInput p-2"
                type="number" 
                placeholder="Specify a lower bound price..."
                value={lowerBoundPrice || ""}
                onChange={(e) => setLowerBoundPrice(e.target.valueAsNumber)}/>
            <input
                className="searchInput mt-1 p-2"
                type="number" 
                placeholder="Specify an upper bound price..."
                value={upperBoundPrice || ""}
                onChange={(e) => setUpperBoundPrice(e.target.valueAsNumber)}/>
        </div>
    )
}