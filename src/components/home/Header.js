import React from 'react'
import headerVideo from '../../assets/Chef_Man_1920x1080.mp4';
import { MdOutlineArrowRightAlt } from 'react-icons/md';

const Header = () => {
  return (
    <div className="relative w-full h-full">
      <video className="w-full h-full object-cover" src={headerVideo} autoPlay loop muted playsInline/>
      <div className="bg-black bg-opacity-50 w-full h-full absolute top-0 left-0 flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-4xl text-white font-bold">Choose from thousands of recipes</h1>
        <p className="text-slate-300 text-lg max-w-[700px]">
          Appropriately integrate technically sound value with scalable infomediaries
          negotiate sustainable strategic theme areas.
        </p>
        <a
          className="text-slate-300 icon-link icon-link-hover flex gap-3 items-center"
          href="/signup"
        >
          Sign up today
          <MdOutlineArrowRightAlt className="ms-2 text-xl animate-moveToRight" />
        </a>
      </div>
    </div>
  )
}

export default Header
