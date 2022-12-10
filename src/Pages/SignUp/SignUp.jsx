import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useToken from '../../hooks/useToken';

const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const {createUser, updateUser} = useContext(AuthContext);
    const [createdUserEmail, setCreatedUserEmail] = useState('');
    const [token] = useToken(createdUserEmail);
    const [signUpError, setSignUpError] = useState('');
    const navigate = useNavigate();

    if(token){
      navigate('/')
    }

    const handleSignUp = data => {
        console.log(data);
        setSignUpError("")
        createUser(data.email, data.password)
        .then(result => {
          const user = result.user;
          console.log(user);
          toast.success('User created successfully');
          const userInfo = {
            displayName: data.name
          }
          updateUser(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
          })
          .catch(err => console.error(err));
        })
        .catch(err => {
          console.error(err.message);
          setSignUpError(err.message);
        });
    }

    const saveUser = (name, email) => {
      const user = {name, email};
      fetch('https://doctors-portal-server-lemon.vercel.app/users', {
        method: "POST",
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(user)
      })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        setCreatedUserEmail(email);
      })
    };

    return (
        <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-3xl text-center">SignUp</h2>
        <form onSubmit={handleSubmit(handleSignUp)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Name</span>
            </label>
            <input type="name" {...register("name", {
                required: "Name is missing"
            })} className="input input-bordered w-full max-w-xs"/>
            {errors.name && <p className='text-red-500'>{errors.name?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email address</span>
            </label>
            <input type="email" {...register("email", {
                required: "Email is required"
                })} className="input input-bordered w-full max-w-xs"/>
                {errors.email && <p className='text-red-500'>{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input type="password" {...register("password", {
                required: "Password is required",
                minLength: {value: 6, message: "Password must Uppercase and special character"},
                pattern: {value: /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/, message: "Password must be strong"}
            })} className="input input-bordered w-full max-w-xs"/>
            {errors.password && <p className='text-red-500'>{errors.password?.message}</p>}
          </div>
          <div>
            {
              signUpError && <p className='text-red-500'>{signUpError}</p>
            }
          </div>
          <input className="btn btn-accent w-full mt-4" value="SignUp" type="submit" />
        </form>
        <p className="my-3">Already have an account?Please <Link to='/login' className="text-secondary">Login</Link></p>
        <div className="divider">OR</div>
        <button className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
    );
};

export default SignUp;