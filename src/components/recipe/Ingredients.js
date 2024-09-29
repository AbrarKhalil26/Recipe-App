import React from 'react'
import styled from 'styled-components';
import { socialData } from '../../db/data';

const Div = styled.div`
  color: ${props => props.color};
  border: 1px solid ${props => props.color};
  transition: all 0.3s;

  &:hover {
    color: #fff;
    background: ${props => props.color};
    border: none;
  }
`

const Ingredients = ({ data }) => {
  const { sections, tags } = data || {};
  return (
    <div className='flex flex-col gap-14'>
      <div>
        <h2 className='text-xl font-semibold mb-4'>Ingredients</h2>
        <ul>
          {sections && sections[0].components?.map((item, index) => (
            <li key={index} className={`text-base text-gray-500 py-3 ${index === sections[0].components.length - 1 ? '': 'border-b'}`}>
              {item.raw_text}
            </li>
          ))}
        </ul>
      </div>
      
      <div>
        <h2 className='text-xl font-semibold mb-6'>Tages</h2>
        <div className='flex flex-wrap gap-3'>
          {tags?.slice(0,10).map((item, index) => (
            <p key={index} className='text-sm w-fit py-2 px-3 rounded-lg bg-gray-200 text-gray-500 font-medium'>
              {item.name}
            </p>
          ))}
        </div>
      </div>

      <div>
        <h2 className='text-xl font-semibold mb-6'>Share Recipe</h2>
        <div className='flex gap-4'>
          {socialData.map((icon) => (
            <Div
              key={icon.id}
              color={icon.color}
              className='general-icon'
              style={{ fontSize: '1.2rem', width: '2.5rem', height: '2.5rem'}}
            >
              {icon.icon}
            </Div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Ingredients
