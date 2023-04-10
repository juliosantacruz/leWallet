

export function setFormat(amount:any){
    const amountFormated = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency:'USD'
    }).format(amount)
    
    



    return amountFormated
}

 