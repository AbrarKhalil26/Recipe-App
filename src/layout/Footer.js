import React from 'react'
import { footerData, socialData } from '../db/data'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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

const Footer = () => {
  return (
    <div className='grid gap-10 mx-4 @md:mx-10 p-4 @md:p-8 '>
      <div className='flex justify-between items-center'>
        <Link to='/' className='logo text-3xl'>
          Kocina
        </Link>
        <div className='flex items-center gap-4 mt-4'>
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
      <div>
        <ul className='grid grid-cols-1 @lg:grid-cols-2 @2xl:grid-cols-4 gap-5'>
          {footerData.map((item, index) => {
            return (
              <li key={index} className='flex flex-col gap-3'>
                {item.links.map((link, index) => (
                  <Link to='/' key={index} className='transition-all duration-300 text-gray-500 hover:text-orange text-sm mr-4'>
                    {link}
                  </Link>
                ))}
              </li>
            )})}
        </ul>
      </div>
      <div className=' text-gray-500'>
        <p>&copy; 2021 Kocina. All rights reserved, Designed by <a href='https://abrarkhalil26.github.io/My-Portfolio/' className='text-orange'>Abrar</a></p>
      </div>
    </div>
  )
}

export default Footer
