"use client"
import React from 'react'
import { TableDemo } from './RecentTransactions'
import { Component } from './MonthlyExpenseChart'
import { Button } from '../ui/button'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
const Hero = () => {
    const router= useRouter()
           
  return (
    <div className='w-full h-full mt-28'>
        {/*grid 1 */}
        {/*today's total expense*/}
        <div className='flex flex-col rounded-sm border border-white'>
            <h1>Your today's Expenses</h1>
            <span>300 $</span>
        </div>
        {/*what ai says about it? */}
        <div className='flex flex-col rounded-sm border border-white'>
            <h1>What Fin has to say about this?</h1>
            <Button className=''>Ask Fin</Button>
        </div>
        {/*grid 2*/}
        {/*Monthly chart of expenses*/}
        <Component></Component>
        {/*Recent transactions*/}
        <TableDemo></TableDemo>

        {/*button at the button right corner for adding deleting editing transactions*/}
        <Plus className='w-16 h-16 fixed bottom-5 right-5 rounded-full bg-black text-white p-2 hover:bg-slate-500 transition-all' onClick={()=>{router.push('/expenses/add')}} ></Plus>
        
    </div>
  )
}

export default Hero