import React from 'react';
import { UserButton } from '@clerk/nextjs';

function dashboardheader() {
  return (
    <div className='shadow-xl p-5 flex justify-between'>
        <div>
          
        </div>
        <div>
            <UserButton/>
        </div>
    </div>
  )
}

export default dashboardheader