import * as React from 'react';

interface NameProps {
    name: string,
    setName: (filterName: string) => void
}

export const Name: React.FC<NameProps> = ({name, setName}) => {

    return (
        <div>
            <h2>Product Name</h2>
            <input
                className="searchInput p-2"
                type="text" 
                placeholder="Search for a product name here..."
                value={name}
                onChange={(e) => setName(e.target.value)}/>
        </div>
    )
}