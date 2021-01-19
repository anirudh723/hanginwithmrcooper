const PRICELESS = "priceless";

// takes in the string dollar amount, strips the $ and commas, and returns the numeric value
export const getNumericBalance = (price: string): number => {
    if (price === PRICELESS) { // I'm making priceless just be 0.
        return 0;
    }
    return +parseFloat(price.substring(1).replace(/,/g, '')).toFixed(2);
}