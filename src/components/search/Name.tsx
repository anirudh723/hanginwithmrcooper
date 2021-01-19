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
                className="p-2"
                type="text" 
                placeholder="Specify name..."
                value={name}
                onChange={(e) => setName(e.target.value)}/>
        </div>
    )
}