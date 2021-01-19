import * as React from 'react';
import { ORDER } from '../../Order';
import { Name } from './Name';
import { Description } from './Description';
import { Price } from './Price';
import { Rating } from './Rating';
import './Sort.css'

interface SortProps {
    applySortCriteria: (sortType: string, order: ORDER) => void
}

export const Sort: React.FC<SortProps> = ({applySortCriteria}) => {

    const setSortType = (sortType: string, order: ORDER) => {
        applySortCriteria(sortType, order);
    }

    return (
        <div className="pt-2 has-text-light">
            <h2 className="is-size-5">Sort the below products:</h2>
            <div className="pb-4 sortContainer">
                <div>
                    <Name {...{setSortType: setSortType}} />
                </div>
                <div>
                    <Description {...{setSortType: setSortType}} />
                </div>
                <div>
                    <Price {...{setSortType: setSortType}} />
                </div>
                <div>
                    <Rating {...{setSortType: setSortType}} />
                </div>                
            </div>
        </div>
    )
}