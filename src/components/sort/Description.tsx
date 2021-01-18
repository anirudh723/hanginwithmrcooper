import * as React from 'react'
import '@fortawesome/fontawesome-free/js/all.js';
import { ORDER } from '../../Order';

const DESCRIPTION = "Description";
const LOW_TO_HIGH = "low to high"
const HIGH_TO_LOW = "high to low"

interface DescriptionProps {
    setSortType: (sortType: string, order: ORDER) => void
}

export const Description: React.FC<DescriptionProps> = ({setSortType}) => {
    const [order, setOrder] = React.useState(ORDER.ASC);

    const handleOrder = (event: React.MouseEvent) => {
        event.preventDefault();
        if (order === ORDER.ASC) {
            setOrder(ORDER.DESC);
            setSortType("description", ORDER.DESC);
        } else {
            setOrder(ORDER.ASC);
            setSortType("description", ORDER.ASC);
        }
    }

    return (
        <button onClick={(e) => handleOrder(e)}>
            <span>{DESCRIPTION}: </span>
            <span>{order === ORDER.ASC ? LOW_TO_HIGH : HIGH_TO_LOW}</span>
        </button>
    )
}