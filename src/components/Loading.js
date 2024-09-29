import React from 'react'

const Loading = () => {
  return (
    <div className='flex gap-4 mx-auto'>
      <>
        <div className='w-6 h-6 bg-orange rounded-full animate-bounce' style={{ animationDelay: '0.1s'}}></div>
        <div className='w-6 h-6 bg-orange rounded-full animate-bounce' style={{ animationDelay: '0.3s'}}></div>
        <div className='w-6 h-6 bg-orange rounded-full animate-bounce' style={{ animationDelay: '0.5s'}}></div>
      </>
    </div>
  )
}

export default Loading
