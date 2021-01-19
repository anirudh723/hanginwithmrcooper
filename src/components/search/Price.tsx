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
                className="p-2"
                type="number"
                min={0}
                placeholder="Lower bound price..."
                value={lowerBoundPrice || ""}
                onChange={(e) => setLowerBoundPrice(e.target.valueAsNumber)}/>
            <input
                className="mt-1 ml-1 p-2"
                type="number"
                min={0}
                placeholder="Upper bound price..."
                value={upperBoundPrice || ""}
                onChange={(e) => setUpperBoundPrice(e.target.valueAsNumber)}/>
        </div>
    )
}