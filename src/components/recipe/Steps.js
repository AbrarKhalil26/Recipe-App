import React from 'react'
import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const Steps = ({ data }) => {
  const { instructions } = data || {};
  return (
    <div className='border-b border-gray-200 pb-10'>
      <h2 className='text-xl font-semibold'>How to Make It</h2>
      {
        instructions?.map((item, index) => (
          <div key={index} className='mt-4'>
            <div className='steps rounded-full relative'>
              <div className='py-3 flex gap-3 items-center bg-white w-fit relative pr-3 font-default text-red-500' style={{zIndex: 1}}>
                <IoMdCheckmarkCircleOutline className='text-red-500'/>
                {index + 1}. Step
              </div>
            </div>
            <p className=' ml-4 text-gray-700'>
              {item.display_text}
            </p>
          </div>
        ))
      }
    </div>
  )
}

export default Steps
