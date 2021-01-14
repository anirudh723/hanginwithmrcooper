import * as React from 'react';
import { Name } from './Name';
import { Description } from './Description';
import { Price } from './Price';
import { Rating } from './Rating';
import './Search.css';

const NAME = "Name";
const DESCRIPTION = "Description";
const PRICE = "Price";
const RATING = "Rating";
const _ = require("lodash");

interface SearchProps {
    applyFilterCriteria: (filters: Map<string, string | number[]>) => void
}

export const Search: React.FC<SearchProps> = ({applyFilterCriteria}) => {
    const initialState = { name: "", description: "", lowerBoundPrice: null, upperBoundPrice: null, lowerBoundRating: null, upperBoundRating: null}
    const [name, setName] = React.useState(initialState.name);
    const [description, setDescription] = React.useState(initialState.description);
    const [lowerBoundPrice, setLowerBoundPrice] = React.useState<number | null>(initialState.lowerBoundPrice);
    const [upperBoundPrice, setUpperBoundPrice] = React.useState<number | null>(initialState.upperBoundPrice);
    const [lowerBoundRating, setLowerBoundRating] = React.useState<number | null>(initialState.lowerBoundRating);
    const [upperBoundRating, setUpperBoundRating] = React.useState<number | null>(initialState.upperBoundRating);
    
    // set up the filter criteria in a map (search type: search value) to eventually give to the product list
    const handleSubmitSearch = (event: React.MouseEvent) => {
        event.preventDefault();
        let filterCriteria = new Map<string, string | number[]>();

        if (!(_.isEmpty(name))) filterCriteria.set(NAME, name);
        if (!(_.isEmpty(description))) filterCriteria.set(DESCRIPTION, description);
        if (lowerBoundPrice && upperBoundPrice) filterCriteria.set(PRICE, [lowerBoundPrice, upperBoundPrice]);
        if (lowerBoundRating && upperBoundRating) filterCriteria.set(RATING, [lowerBoundRating, upperBoundRating]);
        setFieldsToDefault();
        applyFilterCriteria(filterCriteria);
    }

    const setFieldsToDefault = () => {
        setName(initialState.name);
        setDescription(initialState.description);
        setLowerBoundPrice(initialState.lowerBoundPrice);
        setUpperBoundPrice(initialState.upperBoundPrice);
        setLowerBoundRating(initialState.lowerBoundRating);
        setUpperBoundRating(initialState.upperBoundRating);
    }

    const nameProps = { name: name, setName: setName };
    const descriptionProps = { description: description, setDescription: setDescription };
    const priceProps = { lowerBoundPrice: lowerBoundPrice, upperBoundPrice: upperBoundPrice, setLowerBoundPrice: setLowerBoundPrice, setUpperBoundPrice: setUpperBoundPrice};
    const ratingProps = { lowerBoundRating: lowerBoundRating, upperBoundRating: upperBoundRating, setLowerBoundRating: setLowerBoundRating, setUpperBoundRating: setUpperBoundRating };
    
    const searchComponents = [<Name {...nameProps}/>, <Description {...descriptionProps}/>, <Price {...priceProps}/>, <Rating {...ratingProps}/>]
    return (
        <div className="has-text-light p-4 searchContainer">
            <h2 className="is-size-3 mb-2">Search for products</h2>
            
            <div className="has-text-light columns">
                {searchComponents.map(searchComponent => {
                    return (
                        <div className={"column is-one-quarter"}>
                            {searchComponent}
                        </div>
                    )
                })}
            </div>
            <div className="pb-5">
                <button className="is-size-5" onClick={handleSubmitSearch}>Submit</button>
            </div>
        </div>
    )
}