import axios from 'axios';
import * as cheerio from 'cheerio';


export interface Currency {
    currency: string;
    value: number;
}


const getRates: Function = async (): Promise<void | Currency[]> => {
    const url = 'https://www.infobae.com/economia/divisas/dolar-hoy/?gclid=Cj0KCQjwhY-aBhCUARIsALNIC06UkeYJoIJZX5M-6M2sI11hXw3O43tJuweL5fVExazamYk_2J2AZdsaAhYQEALw_wcB'; // URL we're scraping
    const AxiosInstance = axios.create(); 

    try {
        const response = await AxiosInstance.get(url);
        const html = response.data;
        const $ = cheerio.load(html);
        const table = $('.excbar > a');
        const currValues: Currency[] = [];

        table.each((i, elem) => {
            const currency: string = $(elem).find('.exc-tit').text();
            const value: number = parseFloat($(elem).find('.exc-val').text());

            currValues.push({
                currency,
                value
            });
        });
        console.log(currValues);
        return currValues;
    } catch (message_1) {
        return console.error(message_1);
    }

} 

const convertCurrencies: Function = async (value: number, rates_promsie: Promise<Currency[]>, direct: boolean): Promise<void | Currency[]> => {
    const convertedValues: Currency[] = [];
    let rates = await rates_promsie;
    rates.forEach((curr, i) => {
        let conversion: Currency;
        if (direct) {
            conversion = {
                currency: 'Conversión al' + curr.currency,
                value: curr.value*value,
            }
        } else {
            conversion = {
                currency: 'Conversión al' + curr.currency,
                value: value/curr.value,
            }
        }

        convertedValues.push(conversion);
    })
    console.log(convertedValues);
    return convertedValues;
}


export {getRates, convertCurrencies};


