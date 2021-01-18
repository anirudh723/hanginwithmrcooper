import * as React from 'react';
import { ORDER } from '../../Order';
import { Name } from './Name';
import { Description } from './Description';
import { Price } from './Price';
import { Rating } from './Rating';

interface SortProps {
    sortTypes: Map<string, ORDER>,
    setSortTypes: (newSortTypes: Map<string, ORDER>) => void
}

export const Sort: React.FC<SortProps> = ({sortTypes, setSortTypes}) => {
    //const [sortTypes, setSortTypes] = React.useState(new Map<string, ORDER>())

    const setSortType = (sortType: string, order: ORDER) => {
        setSortTypes(new Map(sortTypes.set(sortType, order)));
    }

    return (
        <div className="has-text-light rows">
            <div className="row">
                <h2 className="is-size-5">Sort the below products:</h2>
            </div>
            <div className="row columns">
                <div className="column">
                    <Name {...{setSortType: setSortType}} />
                </div>
                <div className="column">
                    <Description {...{setSortType: setSortType}} />
                </div>
                <div className="column">
                    <Price {...{setSortType: setSortType}} />
                </div>
                <div className="column">
                    <Rating {...{setSortType: setSortType}} />
                </div>                
            </div>
        </div>
    )
}