import {create} from "zustand"

interface UXStore{
    openModal:boolean,
    setOpenModal:(value:boolean)=>void,
    addExpense:boolean,
    setAddExpense:(value:boolean)=>void,
    addIncome:boolean,
    setAddIncome:(value:boolean)=>void,

}
export const useUXStore = create<UXStore>(
    (set) =>({
        openModal:false,
        setOpenModal:(value:boolean)=> set(()=>({
            openModal: value
        })),
        addExpense:false,
        setAddExpense:(value:boolean)=> set(()=>({
            addExpense: value
        })),
        addIncome:false,
        setAddIncome:(value:boolean)=> set(()=>({
            addIncome: value
        })),
    })
)