import React, { useEffect, useState } from "react";
import { TOGGLE_TOAST } from "../redux/slice/globalSlice";
import { useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import { MdError } from "react-icons/md";
import styled from "styled-components";

const Toast = ({ type, message }) => {
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (progress < 100 && !isHovered) {
      const interval = setInterval(() => {
        setProgress((prev) => prev + 1);
      }, 40);
      return () => clearInterval(interval);
    }

    if (progress >= 100) {
      setTimeout(() => {
        dispatch(TOGGLE_TOAST({ isOpen: false, type: "", message: "" }));
      }, 500);
    }
  }, [progress, isHovered]);

  const ToastStyle = styled.div`
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &::after {
      border-radius: 50px 0 50px 50px;
      width: ${progress}%;
    }
  `;

  return (
    <div
      className="fixed top-0 left-0 h-full w-screen"
      style={{ zIndex: 999999999 }}
    >
      <ToastStyle
        className="toast flex gap-4 items-center bg-white py-4 px-6 rounded-lg shadow-lg sticky top-6 w-fit ml-auto mr-8"
        style={{ boxShadow: "0 2px 20px 5px rgba(0, 0, 0, 0.1)" }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {type === "error" ? (
          <MdError className="text-red-500 text-2xl" />
        ) : (
          <FaCircleCheck className="text-green-600 text-2xl" />
        )}
        <div>
          <h2
            className={`text-lg font-semibold ${
              type === "error" ? "text-red-500" : "text-green-700"
            }`}
          >
            {type === "error" ? "Error!" : "Success!"}
          </h2>
          <p className="text-sm text-gray-600">{message}</p>
        </div>
      </ToastStyle>
    </div>
  );
};

export default Toast;
