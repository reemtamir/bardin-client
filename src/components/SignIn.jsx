import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from './Input';
import { useAuth } from '../hooks/useAuth';
import joi from 'joi';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import { useFormik } from 'formik';

const SignIn = ({ socket }) => {
  const { user, logIn } = useAuth();

  const [error, setError] = useState('');
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(values) {
      try {
        const user = await logIn(values);
        socket.emit('newUser', { userName: user.email, socketID: socket.id });
        console.log('socket', socket);
      } catch (error) {
        console.log(error);
      }
    },
    validate: formikValidateUsingJoi({
      email: joi
        .string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: joi.string().min(6).max(1024).required(),
    }),
  });

  useEffect(() => {
    if (!user) return;
    navigate('/chat-room');
  }, [user]);

  return (
    <>
      <form noValidate onSubmit={form.handleSubmit}>
        <div className=" container ">
          <div className=" input-div ">
            <Input
              label={'Email'}
              type="email"
              id="email"
              value={form.email}
              placeholder="Enter email"
              labelClass={'label'}
              inputClass={'input'}
              {...form.getFieldProps('email')}
              error={form.touched.email && form.errors.email}
            />
          </div>
          <div className=" input-div ">
            <Input
              {...form.getFieldProps('password')}
              label={'Password'}
              type="password"
              id="password"
              value={form.password}
              placeholder="Choose Password"
              labelClass={'label'}
              inputClass={'input'}
              error={form.touched.password && form.errors.password}
            />
          </div>

          <button type="submit" className="sign-in-btn">
            Sign in
          </button>
        </div>
        <div className="container">
          <h2 className="header">Don't have an account? </h2>
          <button className="sign-up-btn">
            {' '}
            <Link to="/sign-up" className="link-to-sign-up">
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
