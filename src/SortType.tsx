import { ProductDataModel } from './api';
import { ORDER } from './Order'

// defining a custom Tuple to hold the sort type and order (asc/desc)
export type SortType = [keyof ProductDataModel, ORDER];