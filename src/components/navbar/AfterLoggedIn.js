import React, { useEffect, useRef, useState } from "react";
import { MdOutlineLogout } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { selectEmail, selectProfilePic, selectUserName } from "../../redux/slice/authSlice";


const AfterLoggedIn = ({ handleLogOut }) => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const userInfoRef = useRef(null);
  const toggleSearch = () => setShowUserInfo(!showUserInfo);
  const profilePicture = useSelector(selectProfilePic);
  const userName = useSelector(selectUserName);
  const email = useSelector(selectEmail);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userInfoRef.current && !userInfoRef.current.contains(event.target)) {
        setShowUserInfo(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [userInfoRef]);

  return (
    <>
      <div className="relative">
        <img
          onClick={toggleSearch}
          src={
            profilePicture ||
            "https://cdn-icons-png.freepik.com/256/12483/12483574.png?uid=R138965801&ga=GA1.1.932674910.1715796673&semt=ais_hybrid"
          }
          alt="profile"
          className="w-8 h-8 rounded-full"
        />
        {showUserInfo && (
          <div
            className="p-4 text-gray-600 bg-white bg-opacity-95 rounded-lg absolute top-0 -left-32 mt-12"
            style={{ boxShadow: "0px 5px 90px 0px rgba(0, 0, 0, 0.2)", zIndex: 99999 }}
            ref={userInfoRef}
          >
            <h1 className="text-slate-800 text-lg font-medium">
              {userName}
            </h1>
            <p className="pb-3 text-xs text-gray-400 border-b-1 border-gray-300">
              {email}
            </p>
            <ul className="grid gap-2 pt-2">
              <li className="cursor-pointer hover:text-orange">
                <Link to="/profile">Profile</Link>
              </li>
              <li className="cursor-pointer hover:text-orange">
                <Link to="/settings">Settings</Link>
              </li>
              <li
                className="cursor-pointer hover:text-orange pt-2"
                onClick={handleLogOut}
              >
                <MdOutlineLogout className="text-red-500 text-xl" />
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default AfterLoggedIn;
