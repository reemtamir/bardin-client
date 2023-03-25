import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
import { useAuth } from '../hooks/useAuth';
import joi from 'joi';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import { useFormik } from 'formik';
import AdminNavBar from './AdminNavBar';

const SignInAdmin = () => {
  const { admin, setAdmin, logInAdmin, error, setError } = useAuth();
  useEffect(() => {
    setError('');
  }, []);
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: '',
      password: '',
    },
    async onSubmit(values) {
      try {
        const { data } = await logInAdmin(values);
        await setAdmin(data);

        console.log(data);
        navigate('/admin-page');
        // socket.emit('newUser', { userName: user.email, socketID: socket.id });
        // console.log('socket', socket);
      } catch ({ response }) {
        console.log(response.data);
        setError(response.data);
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
    if (!admin) return;

    navigate('/admin-page');
  }, [admin, navigate]);

  return (
    <>
      <AdminNavBar />
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
      </form>
    </>
  );
};

export default SignInAdmin;
