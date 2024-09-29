import React from 'react'
import { FiClock } from "react-icons/fi";
import { RxCounterClockwiseClock } from "react-icons/rx";
import { HiOutlineUsers } from "react-icons/hi2";
import RecipeIcons from './RecipeIcons';


const RecipeHeader = ({data, printComponent}) => {
  const { id, thumbnail_url, thumbnail_alt_text, name, description, cook_time_minutes, total_time_tier, num_servings, show, country } = data || {};
  const { tier } = total_time_tier || {};
  

  const detailsMeal = [
    {
      id: 1,
      icon: <FiClock/>,
      title: 'Active Time',
      text: cook_time_minutes + ' mins' || '20 mins',
    },
    {
      id: 2,
      icon: <RxCounterClockwiseClock/>,
      title: 'Total Time',
      text: tier || '40 mins',
    },
    {
      id: 3,
      icon: <HiOutlineUsers/>,
      title: 'Yield',
      text: 'Serves ' + num_servings || 'Serves 4',
    },
  ];

  return (
    <div className='grid @4xl:grid-cols-2 gap-10 items-center'>
      <div>
        <img src={thumbnail_url} alt={thumbnail_alt_text} className='w-full max-h-[500px] object-cover rounded-lg'/>
      </div>

      <div>
        <h1 className='text-3xl font-semibold mb-4'>{name}</h1>
        <p className='text-base text-gray-500'>{description}</p>

        <div className='flex mt-6 justify-evenly pb-4 border-b-1 text-center mb-4'>
          {detailsMeal.map((item) => (
            <div key={item.id}
              className={`flex flex-col justify-center items-center gap-2 w-2/6 ${item.id !== 3 && 'border-r-1'}`}
              style={{ borderColor: '#eee' }}
            >
              <span className='text-2xl text-gray-400'>{item.icon}</span>
              <div>
                <p className='text-base font-semibold'>{item.title}</p>
                <p className='text-sm text-gray-400'>{item.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className='flex justify-between'>
            <p className='text-base text-gray-500 mb-2'>Type: <span className='text-orange'>{show?.name}</span></p>
            <RecipeIcons id={id} printComponent={printComponent}/>
          </div>
          <p className='text-sm text-gray-500'>Country: {country}</p>
        </div>
      </div>
    </div>
  )
}

export default RecipeHeader
