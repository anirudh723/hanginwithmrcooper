import * as React from 'react';
import './index.css';

export const Search: React.FC<{applyFilterCriteria: (input: string, type: string) => void}> = ({applyFilterCriteria}) => {
    const [searchInput, setSearchInput] = React.useState("");
    const [searchRadioValue, setSearchRadioValue] = React.useState("Product Name");

    const handleSearchRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchRadioValue(event.target.value);
    }

    const handleSearchInput = (event: React.ChangeEvent<HTMLInputElement>) => {
        event.preventDefault();
        setSearchInput(event.target.value);
    }
    
    const handleSubmitSearch = (event: React.MouseEvent) => {
        event.preventDefault();
        applyFilterCriteria(searchInput, searchRadioValue);
    }

    return (
        <div>
            <div className="has-text-light columns">
            <div className="column is-half">
                <h2>Search for a product by name or description!</h2>
                <input
                    className="searchBox p-2"
                    type="text" 
                    placeholder="Search for a product name or description..."
                    value={searchInput}
                    onChange={handleSearchInput}/>
            </div>
            <div className="radioButtonGroup pt-5 column">
                <div>
                    <input type="radio" checked={searchRadioValue === "Product Name"} value="Product Name" onChange={handleSearchRadioChange}/>
                    <label>Product Name</label>
                </div>
                <div>
                    <input type="radio" checked={searchRadioValue === "Product Description"} value="Product Description" onChange={handleSearchRadioChange}/>
                    <label>Product Description</label>
                </div>
            </div>
        </div>
        <div className="pb-3 row">
            <button onClick={handleSubmitSearch}>Search</button>
        </div>
        </div>
        
        
    )
}