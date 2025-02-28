import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

function BarChartDashboard({budgetList}) {
  return (
    <div className='border-primary border-4 rounded-xl p-7 cursor-pointer hover:shadow-2xl'>
        <h2 className='font-bold text-lg mb-8'>Your Activity</h2>
        <BarChart
        width={500}
        height={300}
        data={budgetList}

        >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="totalSpend" fill="#fcb9b2" />
            <Bar dataKey="amount" fill="#b23a48"  stackId="a"/>
        </BarChart>
    </div>
  )
}

export default BarChartDashboard