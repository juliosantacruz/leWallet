export interface Expense{
    id:string,
    description:string,
    category:string,
    date: string,
    amount:number|string,
    latitud: number | null,
    longitud: number | null, 
}