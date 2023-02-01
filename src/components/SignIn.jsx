import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import { signIn } from '../utils/axios';

const SignIn = ({ setUser, socket }) => {
  const [userConfirmation, setUserConfirmation] = useState(null);

  const navigate = useNavigate();

  const handelSignIn = async (values) => {
    try {
      const data = await signIn(values);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      let user = localStorage.getItem('user');

      user = JSON.parse(user);
      console.log(user);
      socket.emit('newUser', { userName: user.name, socketID: socket.id });
      navigate('/main-room');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form noValidate>
        <div className="row w-50 mt-5 m-auto ">
          <div className=" col-12 my-2 ">
            <Input
              label="Email"
              type="email"
              id="email"
              labelClass="visually-hidden"
              inputClass="form-control text-center"
              placeholder="Email"
              onChange={({ target: { value: email } }) => {
                setUserConfirmation({ ...userConfirmation, email });
              }}
            />
          </div>
          <div className=" col-12 my-2 ">
            <Input
              label="Password"
              type="password"
              id="password"
              labelClass="visually-hidden"
              inputClass="form-control text-center"
              placeholder="Password"
              onChange={({ target: { value: password } }) => {
                setUserConfirmation({ ...userConfirmation, password });
              }}
            />
          </div>

          <div className=" col-12 my-2">
            <button
              onClick={() => handelSignIn(userConfirmation)}
              type="button"
              className="btn btn-primary"
            >
              Sign in
            </button>
          </div>
        </div>
        <div className="m-auto text-center mt-5">
          <h2>Don't have an account? </h2>
          <button className="btn btn-info">
            {' '}
            <Link to="/sign-up" className="text-decoration-none text-dark">
              {' '}
              sign up{' '}
            </Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
