import { getRates, Currency, convertCurrencies } from "./currency_rates"

let rates = getRates();
let values = convertCurrencies(100, rates, true);

const printValues: Function = async(Values: Promise<Currency[]>): Promise<void> => {
    let arr_values = await Values;
    console.log(arr_values);
}

printValues(values);
