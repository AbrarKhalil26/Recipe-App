import React from 'react'
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { TOGGLE_TOAST } from '../../redux/slice/globalSlice';

const Input = styled.input`
  border: 1px solid white;
  background: var(--orange);
  border-radius: 50px;
  padding-left: 1.25rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  flex-grow: 1;

  &::placeholder {
    color: white;
  }
`;

const Subscribe = () => {
  const {register, handleSubmit, formState: {errors}} = useForm();
  const dispatch = useDispatch();

  const onSubmit = (data) => {
    dispatch(TOGGLE_TOAST({isOpen: true, type: 'success', message: 'Subscribed successfully'}));
  };
  return (
    <div className='my-10 mx-6 @2xl:mx-16 py-16 px-6 @2xl:px-20 @4xl:px-40 @6xl:px-72 bg-orange text-white rounded-3xl grid gap-2'>
      <h2 className='text-xl @2xl:text-3xl font-semibold mb-3 text-center'>
        Be the first to know about the latest deals, receive new trending
        recipes &amp; more!
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex gap-4 flex-wrap justify-center'>
        <Input type='email' placeholder='Email Address' {...register('email', {required: true})}/>
        <div item xs={12} sm={3}>
          <button type="submit" className='text-white bg-yellow-500 py-2 px-8 rounded-full'>
            Subscribe
          </button>
        </div>
      </form>
      {errors.email && <span className='text-white italic ml-4'>This field is required</span>}
    </div>
  );
}

export default Subscribe
