import React from 'react'
import { Rating, RoundedStar } from '@smastrom/react-rating'
import '@smastrom/react-rating/style.css'

const myStyles = {
  itemShapes: RoundedStar,
  activeFillColor: '#ffb700',
  inactiveFillColor: '#fbf1a9'
}

const RecipeComments = ({ comments }) => {
  return (
    <div className='pb-10'>
      <h2 className='text-xl font-semibold mb-10'>Comments</h2>
      {comments.length === 0 ? <p className='text-gray-600 text-center'>No comments yet.</p>:
        <div className='flex flex-col gap-4 mt-4'>
          <div className='flex items-center gap-5'>
            <img src='https://cdn-icons-png.freepik.com/256/12483/12483574.png?uid=R138965801&ga=GA1.1.932674910.1715796673&semt=ais_hybrid' alt='user' className='avatar border w-14 h-14 object-cover'/>
            <div>
              <h3 className='text-base font-semibold'>John Doe</h3>
              <p className='text-xs pb-1'>3 days ago</p>
              <Rating style={{ maxWidth: 80 }} value={3} readonly itemStyles={myStyles}/>
            </div>
          </div>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget sapien vel odio lacinia tincidunt. Sed eget sapien vel odio lacinia tincidunt.</p>
        </div>
      }
    </div>
  )
}

export default RecipeComments;
