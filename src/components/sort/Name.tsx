import * as React from 'react'
import '@fortawesome/fontawesome-free/js/all.js';
import { ORDER } from '../../Order';

const NAME = "Name";
const LOW_TO_HIGH = "low to high"
const HIGH_TO_LOW = "high to low"

interface NameProps {
    setSortType: (sortType: string, order: ORDER) => void
}

export const Name: React.FC<NameProps> = ({setSortType}) => {
    const [order, setOrder] = React.useState(ORDER.ASC);

    const handleOrder = (event: React.MouseEvent) => {
        event.preventDefault();
        if (order === ORDER.ASC) {
            setOrder(ORDER.DESC);
            setSortType("name", ORDER.DESC);
        } else {
            setOrder(ORDER.ASC);
            setSortType("name", ORDER.ASC);
        }
    }

    return (
        <button onClick={(e) => handleOrder(e)}>
            <span>{NAME}: </span>
            <span>{order === ORDER.ASC ? LOW_TO_HIGH : HIGH_TO_LOW}</span>
        </button>
    )
}