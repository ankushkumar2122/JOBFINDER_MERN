import React from 'react'
import Navbar from '../shared/Navbar'
import Job from './Job';

const randomjobs=[1,2,3,4];
const Browse = () => {
  return (
    <>
    <div>
    <Navbar/>
    <div className='max-w-7xl mx-auto my-10'>
      <h1 className='font-bold text-xl my-10'>Search result ({randomjobs.length}) </h1>
      {
        randomjobs.map((item,index)=>{
          return (
            <Job/>
          )
        })
      }
    </div>
    </div>
    </>
  )
}

export default Browse