import { GetRandomNumberOptions } from "./helpers/types";

export function getNumberWithDecimalPlaces(num: number, decimalPlaces: number) {
    const power = 10 ** decimalPlaces;
    return Math.floor(num * power) / power;
  }

export function getRandomFloat(min: number, max: number, options: GetRandomNumberOptions = {}) {
    const { decimalPlaces } = options;

    const num = Math.random() * (max - min) + min;

    if (decimalPlaces === undefined) {
        return num;
    }

    return getNumberWithDecimalPlaces(num, decimalPlaces);
}
  
export function getRandomInt(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
