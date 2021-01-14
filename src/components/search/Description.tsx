import * as React from 'react';

interface DescriptionProps {
    description: string,
    setDescription: (filterDescription: string) => void
}

export const Description: React.FC<DescriptionProps> = ({description, setDescription}) => {

    return (
        <div>
            <h2>Product Description</h2>
            <input
                className="searchInput p-2"
                type="text" 
                placeholder="Search for a product description here..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
        </div>
    )
}