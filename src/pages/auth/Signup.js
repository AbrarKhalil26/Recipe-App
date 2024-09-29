import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { LogininWithSocial } from '../../components'
import signUpImg from '../../assets/singin.jpeg'
import { useForm } from 'react-hook-form'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../db/config'
import { addDoc, collection } from 'firebase/firestore'

const inputData = [
  {
    type: 'text',
    placeholder: 'Full Name',
    name: 'name',
  },
  {
    type: 'email',
    placeholder: 'Email',
    name: 'email',
  },
  {
    type: 'password',
    placeholder: 'Password',
    name: 'password',
  },
]

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    createUserWithEmailAndPassword(auth, data.email, data.password).then((userCredential) => {
      const user = userCredential.user;

      addDoc(collection(db, 'users'), {
        userName: data.name,
        email: user.email,
      })
      alert('Account created successfully')
      navigate('/signin')
    }).catch((error) => {
      alert(error.message)
    })
  }

  return (
    <div className="flex items-center min-h-screen">
      <div className="flex items-center justify-center py-20 px-8 @2xl:px-32 @[936px]:px-8 @[1200px]:px-28 w-full">
        <div className="grid items-center grid-rows-2 @[936px]:grid-rows-1 grid-cols-1 @[936px]:grid-cols-2 gap-10 @5xl:gap-20 justify-between w-full py-auto">
          <div className="text-center w-full px-2 @5xl:px-8">
            <Link to="/" className="logo text-3xl mx-auto">
              Kocina
            </Link>
            <h1 className="text-4xl font-semibold font-default mt-10">
              Create an Account
            </h1>
            <div className="mt-4">
              <LogininWithSocial />
            </div>
            <p className="text-gray-400 text-lg mt-4">
              Or use your email for registration:
            </p>

            <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
              {inputData.map((data) => (
                <div key={data.type}>
                  <input
                    type={data.type}
                    placeholder={data.placeholder}
                    className="w-full rounded-full pl-4 border-2 border-gray-200 focus:outline-none focus:border-primary py-2 mt-4 mb-1"
                    {...register(data.name, {
                      required: `${data.placeholder} is required`,
                      ...(data.type === "password" && {
                        minLength: {
                          value: 8,
                          message: `Password must be at least 8 characters long`,
                        },
                      }),
                    })}
                  />
                  {errors?.[data.name] && (
                    <span className="text-red-500 text-sm">
                      {errors[data.name].message}
                    </span>
                  )}
                </div>
              ))}

              <button className="btn-secondary mt-4 w-52 mx-auto mb-4">
                Sign up
              </button>
              <p className="text-gray-600 text-sm">
                By signing up you agree to out{" "}
                <span className="text-orange">terms</span> of service.
              </p>
            </form>
          </div>

          <div className="relative w-full h-full">
            <img
              src={signUpImg}
              alt="sign up"
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="p-6 absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 rounded-lg flex flex-col justify-center items-center text-center">
              <h1 className="text-white text-4xl font-semibold font-default">
                Welcome Back
              </h1>
              <p className="text-white text-lg mt-4">
                Already signed up, enter your details and start cooking you
                first meal today
              </p>
              <Link
                to="/signin"
                className="mt-8 bg-white text-gray-500 py-2 px-10 rounded-full hover:shadow-custom-white duration-300"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup
