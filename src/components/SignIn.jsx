import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Input from './Input';
import { useAuth } from '../hooks/useAuth';
import joi from 'joi';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import { useFormik } from 'formik';

const SignIn = () => {
  const { user, logIn, setError, error } = useAuth();

  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(values) {
      try {
        await logIn(values);

        // socket.emit('newUser', { userName: user.email, socketID: socket.id });
        // console.log('socket', socket);
      } catch (error) {
        setError(error);
      }
    },
    validate: formikValidateUsingJoi({
      email: joi
        .string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: joi
        .string()
        .min(6)
        .max(1024)
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/)
        .required(),
    }),
  });

  useEffect(() => {
    if (!user) return;

    navigate(`/chat-room/${user._id}`);
  }, [user, navigate]);
  useEffect(() => {
    setError('');
  }, []);
  return (
    <>
      {error && <div className="alert alert-danger">{error}</div>}
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
          <button type="submit" className="sign-up-btn">
            {' '}
            <Link to="/sign-up" className="link-to-sign-up">
              {' '}
              Sign up{' '}
            </Link>
          </button>
        </div>
      </form>
    </>
  );
};

export default SignIn;
