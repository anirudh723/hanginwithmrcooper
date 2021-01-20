import * as React from 'react'
import '@fortawesome/fontawesome-free/js/all.js';
import { ORDER } from '../../Order';
import { ProductDataModel } from '../../api';
import { NAME} from '../../utils/constants';

const LOW_TO_HIGH = "low to high"
const HIGH_TO_LOW = "high to low"

interface NameProps {
    setSortType: (sortType: keyof ProductDataModel, order: ORDER) => void
}

export const Name: React.FC<NameProps> = ({setSortType}) => {
    const [order, setOrder] = React.useState(ORDER.ASC);

    const handleOrder = (event: React.MouseEvent) => {
        event.preventDefault();
        if (order === ORDER.ASC) {
            setOrder(ORDER.DESC);
            setSortType(NAME, ORDER.DESC);
        } else {
            setOrder(ORDER.ASC);
            setSortType(NAME, ORDER.ASC);
        }
    }

    return (
        <button onClick={(e) => handleOrder(e)}>
            <span>Name: </span>
            <span>{order === ORDER.ASC ? LOW_TO_HIGH : HIGH_TO_LOW}</span>
        </button>
    )
}