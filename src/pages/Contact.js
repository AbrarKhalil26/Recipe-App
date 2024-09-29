import React, { useRef } from 'react'
import Layout from '../layout/Layout'
import { useForm } from 'react-hook-form';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const { handleSubmit } = useForm();
  const form = useRef();

  const onSubmit = () => {
    emailjs.sendForm(
      'service_m9zu6dx', 
      'template_rhh61rm', 
      form.current,
      'pq9UtG0QmcFHa0YgU'
    )
    .then(
      () => {
        alert('Message sent successfully! We will get back to you soon.')
      },
      (error) => {
        alert('Failed to send message. Please try again later.')
      }
    );
  }

  return (
    <Layout>
      <div className='myContainer flex justify-center items-center'>
        <div className='grid @[936px]:grid-rows-1 grid-cols-1 @[936px]:grid-cols-2 gap-10 @[936px]:items-center'>
          <div className='col'>
            <div className='flex flex-col gap-8 items-start'>
              <h1 className='text-4xl font-semibold'>Hello, what's on your mind?</h1>
              <p className='text-gray-500 leading-7'>
                Credibly administrate market positioning deliverables rather than clicks-and-mortar methodologies.
                Proactively formulate out-of-the-box technology with clicks-and-mortar testing procedures. 
                Uniquely promote leveraged web-readiness for standards compliant value. Rapidiously pontificate 
                cooperative mindshare via maintainable applications.
              </p>
              <button className='btn-secondary text-light'>Schedule a call</button>
            </div>
          </div>
          <div className='col'>
            <form ref={form} onSubmit={handleSubmit(onSubmit)} className='border border-orange bg-orange rounded-xl p-6 py-8 flex flex-col items-center gap-4'>
              <input type='text' placeholder='Name' name="from_name" className='form-control'/>
              <input type='email' placeholder='Email' name="email" className='form-control'/>
              <input type='text' placeholder='Subject' name="subject" className='form-control'/>
              <textarea placeholder='Message' name='message'></textarea>
              <button className='btn-primary mt-4' style={{ color: 'white', border: 'none', background: '#fb923c'}}>Send Message</button>
            </form>
          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Contact
