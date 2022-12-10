import { GoogleAuthProvider } from "firebase/auth";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
import useToken from "../../hooks/useToken";

const Login = () => {
  const { register, formState: { errors }, handleSubmit } = useForm();
  const {signIn, googleSignIn} = useContext(AuthContext);
  const [loginError, setLoginError] = useState('');
  const [loginUserEmail, setLoginUserEmail] = useState('');
  const [token] = useToken(loginUserEmail);
  const location = useLocation();
  const navigate = useNavigate();
  const googleProvider = new GoogleAuthProvider();

  const from = location.state?.from?.pathname || '/';

  if(token){
    navigate(from, {replace: true});
  }

  const handleLogin = data => {
    console.log(data);
    setLoginError("");
    signIn(data.email, data.password)
    .then(result => {
      const user = result.user;
      console.log(user);
      setLoginUserEmail(data.email)
      
    })
    .catch(err => {
      console.error(err.message);
      setLoginError(err.message);
    });
  };

  const handleGoogleSignIn = () => {
      googleSignIn(googleProvider)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch(err => console.error(err));
  }

  return (
    <div className="h-[800px] flex justify-center items-center">
      <div className="w-96 p-7">
        <h2 className="text-3xl text-center">Login</h2>
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Email address</span>
            </label>
            <input type="email" className="input input-bordered w-full max-w-xs" {...register("email", {required: "Email is required"})}/>
            {errors.email && <p className="text-red-500">{errors.email?.message}</p>}
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text">Your Password</span>
            </label>
            <input type="password" className="input input-bordered w-full max-w-xs" {...register("password", {required: "Password is required", minLength: {value: 6, message: "Password must be 6 characters or longer"}})}/>
            {errors.password && <p className="text-red-500">{errors.password?.message}</p>}
            <label className="label">
              <span className="label-text">Forget Password?</span>
            </label>
          </div>
          <div>
            {loginError && <p className="text-red-500">{loginError}</p>}
          </div>
          <input className="btn btn-accent w-full" value="Login" type="submit" />
        </form>
        <p className="my-3">New to Doctors Portal?<Link to='/signup' className="text-secondary">Create New Account</Link></p>
        <div className="divider">OR</div>
        <button onClick={handleGoogleSignIn} className="btn btn-outline w-full">CONTINUE WITH GOOGLE</button>
      </div>
    </div>
  );
};

export default Login;
