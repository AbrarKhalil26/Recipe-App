import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import { navData } from '../../db/data';

const NavMobile = ({ setShowMenu, handleLogOut }) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full' style={{ zIndex: '999'}}>
      <div className='absolute top-0 left-0 w-full h-full bg-black opacity-20' style={{ zIndex: '1000'}} onClick={() => setShowMenu(false)}></div>
      <div className='absolute top-0 left-0 flex flex-col gap-16 h-full w-72 bg-white py-16 px-10' style={{ zIndex: '1001', boxShadow: "0px 5px 90px 0px rgba(0, 0, 0, 0.1)" }}>
        <Link to='/' className='logo mr-10 @4xl:mr-16 text-4xl'>
          Kocina
        </Link>
        <ul className='flex flex-col gap-10 items-center'>
          {navData.map((item) => {
            return (
              <li key={item.id}>
                <NavLink
                  to={item.link}
                  className={({ isActive }) =>
                    `text-gray-500 hover:text-orange ${isActive ? 'text-orange' : ''}`
                  }
                >
                  {item.title}
                </NavLink>
              </li>
            );
          })}
        </ul>
        <div className='flex flex-col gap-4'>
          <button className='btn btn-primary'>Sign in</button>
          <button className='btn btn-secondary' onClick={handleLogOut}>Sign up</button>
        </div>
      </div>
    </div>
  )
}

export default NavMobile
