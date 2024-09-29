import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import { MdKeyboardArrowLeft } from "react-icons/md";
import forgetPass from '../../assets/forget-pass.jpg'
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../../db/config';


const ForgetPassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const onSubmit = (data) => {
    sendPasswordResetEmail(auth, data.email).then(() => {
      alert('Check your email to reset your password')
      navigate('/signin')
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div className='flex items-center min-h-screen'>
      <div className='flex items-center justify-center py-20 px-8 @2xl:px-32 @[936px]:px-8 @[1200px]:px-28 w-full'>
        <div className='grid grid-rows-2 @[936px]:grid-rows-1 grid-cols-1 @[936px]:grid-cols-2 gap-10 @5xl:gap-20 justify-between w-full py-auto'>
        <div  className='relative w-full h-full'>
          <img src={forgetPass} alt='forget password' className='w-full h-full object-cover rounded-lg'/>
          <div className='p-6 absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 rounded-lg flex flex-col justify-center items-center text-center'>
            <h1 className='text-white text-4xl font-semibold font-default'>Welcome Back</h1>
            <p className='text-white text-lg mt-4'>Already signed up, enter your details and start cooking you first meal today</p>
            <Link to='/signin' className='mt-8 bg-white text-gray-500 py-2 px-10 rounded-full hover:shadow-custom-white duration-300'>Sign in</Link>
          </div>
        </div>

          <div className='flex flex-col justify-center text-center w-full px-2 @5xl:px-8'>
            <Link to='/' className='logo text-3xl mx-auto mb-10'>Kocina</Link>
            <h1 className='text-4xl font-semibold font-default mb-4'>Forget Password</h1>
            <p className='text-gray-400 text-lg mb-8'>Enter your email to reset your password</p>

            <form className='flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              <input
                type='email'
                placeholder='Email'
                className='rounded-full pl-4 border-2 border-gray-200 focus:outline-none focus:border-primary py-2'
                {...register('email', { required: true })}
              />
              {errors?.email && <span className='text-red-500 text-sm mt-1'>Email is required</span>}
              <button type='submit' className='btn-secondary mt-8 w-52 mx-auto mb-6'>Submit</button>
            </form>
            <Link to='/signin' className='mx-auto flex items-center gap-4 text-orange hover:text-orange text-sm transition-all duration-300'>
              <MdKeyboardArrowLeft size='1.5rem'/>Back To Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgetPassword
