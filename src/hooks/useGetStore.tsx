import React,{useState, useEffect} from 'react'

export default function useGetStore(store:any, callback:any) {
  const result = store(callback)
  const [state, setState] = useState()

  useEffect(()=>{
    setState(result)
  },[result])
  
  
    return state 
}
