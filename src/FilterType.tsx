import { ProductDataModel } from './api';
import { Range } from './Range'

// defining a custom Tuple to hold the filter type and input (number of )
export type FilterType = [keyof ProductDataModel, string | Range];