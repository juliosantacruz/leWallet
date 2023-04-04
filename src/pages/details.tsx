import CardItem from '@/components/CardItem/CardItem'
import React from 'react'
import { useExpensesStore } from '@/store/expenses-store'


export default function Details() {
  const {expenses} = useExpensesStore()
  console.log(expenses)
  return (
    <main>
    <h2>Title</h2>
    {expenses.map((element)=> <CardItem key={element.id} data={element}/>)}
    
    </main>
  )
}
