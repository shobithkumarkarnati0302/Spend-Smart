"use client"
import React,{ useEffect } from 'react'
import Sidenav from './_components/sidenav'
import Dashboardheader from './_components/dashboardheader'
import { eq } from 'drizzle-orm'
import { useUser } from '@clerk/nextjs'
import { db } from '../../../utils/dbconfig'
import { Budgets } from '../../../utils/schema'
import { useRouter } from "next/navigation"; 



function dashboardlayout({children}) {
  const {user} = useUser();
  const router = useRouter();
  
  useEffect(() => {
    user&&checkuserbudget();
  }, [user])
  
  const checkuserbudget = async() =>{
    const result = await db.select()
    .from(Budgets)
    .where(eq(Budgets.createdBy,user?.primaryEmailAddress?.emailAddress))
    console.log(result);
    if (result?.length==0){
      router.replace('/dashboard/budgets')
    }
  }
  return (
    <div>
        <div className='fixed md:w-64 hidden md:block'>
            <Sidenav/>
        </div>
        <div className='md:ml-64'>
            <Dashboardheader/>
            {children}
        </div>
    </div>
  )
}

export default dashboardlayout