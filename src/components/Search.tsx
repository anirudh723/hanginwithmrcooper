import * as React from 'react';
import '../styles/Search.css'

export const Search: React.FC<{applyFilterCriteria: (input: string, type: string) => void}> = ({applyFilterCriteria}) => {
    const [searchInput, setSearchInput] = React.useState("");
    const [searchRadioValue, setSearchRadioValue] = React.useState("Name");

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
        <div className="has-text-light searchSection">
            <div className="searchBox">
                <h1>Search for a product by name or description!</h1>
                <input 
                    type="text" 
                    placeholder="Search for a product name or description..."
                    value={searchInput}
                    onChange={handleSearchInput}/>
            </div>
            <div className="radioButtonGroup columns">
                <label>
                    <input type="radio" checked={searchRadioValue == "Product Name"} value="Product Name" onChange={handleSearchRadioChange}/>
                    Product Name
                </label>
                <label>
                    <input type="radio" checked={searchRadioValue == "Product Description"} value="Product Description" onChange={handleSearchRadioChange}/>
                    Product Description
                </label>
            </div>
            <button onClick={handleSubmitSearch}>Search</button>
        </div>
        
    )
}