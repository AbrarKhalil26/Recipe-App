import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogininWithSocial } from '../../components'
import signInImg from '../../assets/signup.jpeg'
import { useForm } from 'react-hook-form'
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { auth, db } from '../../db/config'
import { useDispatch } from 'react-redux'
import { SET_ACTIVE_USER } from '../../redux/slice/authSlice'

const Signin = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  
  const onSubmit = async (data) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, data.email, data.password);
      const user = userCredential.user;
      
      const userQuery = query(collection(db, 'users'), where('email', '==', user.email));
      const userSnapshot = await getDocs(userQuery);
      const userData = userSnapshot.docs.map(doc => ({ ...doc.data(), userID: doc.id }))[0];
      
      if (userData) {
        dispatch(SET_ACTIVE_USER(userData));
        alert('Sign in successfully');
        navigate('/');
      }
    } catch (error) {
      alert('Error signing in: ' + error.message);
    }
  };

  return (
    <div className='flex items-center min-h-screen'>
      <div className='flex items-center justify-center py-20 px-8 @2xl:px-32 @[936px]:px-8 @[1200px]:px-28 w-full'>
        <div className='grid items-center grid-rows-2 @[936px]:grid-rows-1 grid-cols-1 @[936px]:grid-cols-2 gap-10 @5xl:gap-20 justify-between w-full py-auto'>
          <div className='text-center w-full px-2 @5xl:px-8'>
            <Link to='/' className='logo text-3xl'>
              Kocina
            </Link>
            <h1 className='text-4xl font-semibold font-default mt-10'>Sign in to Kocina</h1>
            <div className='mt-4'>
              <LogininWithSocial />
            </div>
            <p className='text-gray-400 text-lg mt-4'>Or use your email account:</p>

            <form className='mt-8 flex flex-col' onSubmit={handleSubmit(onSubmit)}>
              <input
                type='email'
                placeholder='Email'
                className='rounded-full pl-4 border-2 border-gray-200 focus:outline-none focus:border-primary py-2'
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && <span className='text-red-500 text-sm mt-1'>{errors.email.message}</span>}
              <input
                type='password'
                placeholder='Password'
                className='rounded-full pl-4 border-2 border-gray-200 focus:outline-none focus:border-primary py-2 mt-4'
                {...register('password', { required: 'Password is required' })}
              />
              {errors.password && <span className='text-red-500 text-sm mt-1'>{errors.password.message}</span>}
              <Link to='/forgot-password' className='text-gray-400 hover:text-orange text-sm mt-4 transition-all duration-300'>Forget your password?</Link>
              <button type='submit' className='btn-secondary mt-8 w-52 mx-auto'>Sign In</button>
            </form>
          </div>

          <div  className='relative w-full h-full'>
            <img src={signInImg} alt='sign in' className='w-full h-full object-cover rounded-lg'/>
            <div className='p-6 absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 rounded-lg flex flex-col justify-center items-center'>
              <h1 className='text-white text-4xl font-semibold font-default'>Hello There,Join Us</h1>
              <p className='text-white text-lg mt-4'>Enter your personal details and join the cooking community</p>
              <Link to='/signup' className='mt-8 bg-white text-gray-500 py-2 px-10 rounded-full hover:shadow-custom-white duration-300'>Sign Up</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signin
