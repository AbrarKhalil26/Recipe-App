import React, { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { IoIosSearch } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { signOut } from 'firebase/auth';
import { navData } from '../db/data'
import { auth } from '../db/config';
import { AfterLoggedIn, NavMobile } from '../components';
import { useDispatch, useSelector } from 'react-redux';
import { REMOVE_ACTIVE_USER, selectIsLoggedIn } from '../redux/slice/authSlice';


const Navbar = ({isHome}) => {
  const [showSearch, setShowSearch] = useState(false);
  const searchRef = useRef(null);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const isLogged = useSelector(selectIsLoggedIn);
  const dispatch = useDispatch();

  const handleLogOut = () => {
    signOut(auth).then(() => {
      alert('Logged out successfully');
      dispatch(REMOVE_ACTIVE_USER());
      navigate('/signup')
    }).catch((error) => 
      alert(error.message)
    )
  }

  const toggleSearch = () => setShowSearch(!showSearch);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  return (
    <>
      {showMenu && (
        <NavMobile setShowMenu={setShowMenu} handleLogOut={handleLogOut} />
      )}
      <nav>
        <div className="relative w-full bg-transparent">
          <div className="mx-8 p-8 px-3 @4xl:px-8 flex items-center justify-between md:justify-start">
            <Link to="/" className="logo text-2xl mr-10 @4xl:mr-16">
              Kocina
            </Link>
            <IoMenu
              className="text-2xl md:hidden text-gray-500 cursor-pointer"
              onClick={() => setShowMenu(!showMenu)}
            />

            <ul className="hidden md:flex space-x-6">
              {navData.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.link}
                    className={({ isActive }) =>
                      ` hover:text-orange ${
                        isActive ? "text-orange" : isHome ? 'text-white': 'text-gray-500'
                      }`
                    }
                  >
                    {item.title}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div className="hidden ml-auto md:flex items-center gap-3">
              <div className="flex space-x-6 items-center" ref={searchRef}>
                {showSearch && (
                  <input
                    type="search"
                    placeholder="Search..."
                    className="border border-gray-300 rounded-lg py-2 px-4"
                  />
                )}
                <IoIosSearch
                  className={`text-2xl ${isHome ? 'text-white': 'text-gray-500'} cursor-pointer`}
                  onClick={toggleSearch}
                />
              </div>

              {isLogged ? (
                <AfterLoggedIn
                  handleLogOut={handleLogOut}
                />
              ) : (
                <div className="flex gap-2 @4xl:gap-4">
                  <button className={`btn btn-primary ${isHome ? 'text-white': 'text-gray-500'}`}>
                    <Link to="/signin">Sign in</Link>
                  </button>
                  <button className="btn btn-secondary" onClick={handleLogOut}>Sign up</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar
