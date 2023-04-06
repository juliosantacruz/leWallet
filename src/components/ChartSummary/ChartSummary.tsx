import React from 'react'
import {Doughnut} from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

export default function ChartSummary({Expenses, Income}:any) {
    ChartJS.register(ArcElement, Tooltip, Legend);

     const data = {
        labels: ['Income','Expenses',  ],
        datasets: [
          {
            label: '$ = ',
            data: [Income, Expenses, ],
            backgroundColor: [
                'rgba(54, 162, 235, 0.4)',
                'rgba(255, 99, 132, 0.4)',
              
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
               
            ],
            borderWidth: 2,
          },
        ],
      };
  
  
    return (
    <div style={{maxWidth:'400px', width:'75%', margin:'0 auto'}}>

        <Doughnut data={data} />

    </div>
  )
}
