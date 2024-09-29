import React from 'react'
import { GoHeartFill } from "react-icons/go";
import { GoStarFill } from "react-icons/go";
import { Link } from 'react-router-dom';

const MealCard = ({ item, handleLike, isLiked }) => {
  const { id, name, thumbnail_url, user_ratings: {score, count_positive} = {}, show} = item || {}
  const roundedNumber = score ? (score * 10).toFixed(1): "N/A"; // "9.7"

  return (
    <Link to={`/recipe/${id}`}>
      <div className='relative border bg-gray-300 rounded-xl max-h-40'>
        <img src={thumbnail_url} alt="food" className='w-full max-h-40 rounded-xl object-cover'/>
        <div className='w-full h-full absolute top-0 left-0 bg-black bg-opacity-30 rounded-xl cursor-pointer' style={{zIndex: 1}}></div>
        <button className='absolute top-2 right-2' style={{zIndex: 2}}  onClick={() => handleLike(id)}>
          <GoHeartFill className={`text-xl transition-all duration-300 ${isLiked ? 'text-red-500' : 'text-white hover:text-red-500'}`}/>
        </button>
      </div>

      <div className='grid gap-4'>
        <h3 className='text-lg font-semibold mt-4'>{name}</h3>
        <div className='flex justify-between'>
          <p className='text-sm text-gray-500 flex items-center gap-2'>
            <GoStarFill  className='text-yellow-500'/>  
            {roundedNumber} ({count_positive})
          </p>
          <p className='text-sm text-gray-500'>{show?.name}</p>
        </div>
      </div>
    </Link>
  )
}

export default MealCard
