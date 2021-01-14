import * as React from 'react';
import './index.css';
import '@fortawesome/fontawesome-free/js/all.js';

const NAME = "Name";
const DESCRIPTION = "Description";
const PRICE = "Price";
const RATING = "Rating";

interface SortProps {
    applySortCriteria: (sortCriteria: string) => void
}

export const Sort: React.FC<SortProps> = ({applySortCriteria}) => {
    const [sortCriteria, setSortCriteria] = React.useState(NAME);

    const handleSubmitSort = () => {
        applySortCriteria(sortCriteria);
    }

    return (
        <div className="has-text-light mb-5 p-3 sortContainer">
            <h2 className="is-size-3 mb-">Sort products</h2>
            
            <div className="columns">
                <div className="column dropdown is-hoverable">
                    <div className="dropdown-trigger">
                        <button className="button visibleDropdownItem">
                            <span>{sortCriteria}</span>
                            <i className="icon is-small fas fa-angle-down"/>
                        </button>
                        <div className="dropdown-menu" id="dropdown-menu" role="menu">
                            <div className="dropdown-content">
                                {[NAME, DESCRIPTION, PRICE, RATING].map(searchType => {
                                    return (
                                        <button className="sortItem dropdown-item" onClick={() => setSortCriteria(searchType)}>
                                            Sort by: {searchType}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <button className="ml-6 is-size-5" onClick={handleSubmitSort}>Submit</button>
                </div>
            </div>
        </div>
    )
}