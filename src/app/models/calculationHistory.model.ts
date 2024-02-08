
export interface IconKey {
    iconName?: string;
    iconKey?: number;
}
export interface DialogData {
    converterType: string;
    messege: string;
    iconString?: string;
}
export interface Calculation {
    number1?: number;
    function?: string;
    number2?: number;
    result?: number;
}
export interface ConverterCalculation extends Calculation{
    fromSystem?: string;
    toSystem?: string;
}
export interface TrigonometryCalculation  extends Calculation {
    hypotenuse?: number;
    opposite?: number;
    adjacent?: number;
}
export interface CurrencyCalculation  extends Calculation {
    sterlingValue?: number;
    convertedValue?: number
    conversionRate?: number;
    toCurrency?: string;
}
export interface AllCalculationData {
    standardCalculation?: Calculation;
    converterCalculation?: ConverterCalculation;
    trigonometryCalculation?: TrigonometryCalculation;
    currencyCalculation?: CurrencyCalculation;
}





