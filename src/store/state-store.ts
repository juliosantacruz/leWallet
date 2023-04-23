import {create} from "zustand"

interface StateStore{
    openModal:boolean,
    setOpenModal:(value:boolean)=>void,
    addExpense:boolean,
    setAddExpense:(value:boolean)=>void,
    addIncome:boolean,
    setAddIncome:(value:boolean)=>void,

}
export const useStateStore = create<StateStore>(
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