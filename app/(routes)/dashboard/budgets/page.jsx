import React from 'react'
import Budgetlist from './_components/Budgetlist'

function budgets() {
  return (
    <div className='p-10'>
      <h2 className='font-bold text-3xl'>My Budgets</h2>
      <Budgetlist/>
    </div>
  )
}

export default budgets