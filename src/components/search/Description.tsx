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
                className="p-2"
                type="text" 
                placeholder="Specify description..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}/>
        </div>
    )
}