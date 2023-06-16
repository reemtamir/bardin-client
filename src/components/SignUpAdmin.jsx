import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import Input from './Input';
import { useFormik } from 'formik';
import joi from 'joi';
import AdminNavBar from './AdminNavBar';
import { toast } from 'react-toastify';

const SignUpAdmin = () => {
  const { signUpAdmin, authError, setAuthError } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    setAuthError('');
  }, []);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
    },
    async onSubmit(values) {
      try {
        let { confirmedPassword, ...rest } = values;

        const { data } = await signUpAdmin(rest);
        toast(`Admin ${data.name} has created`);
        navigate('/sign-in-admin');
      } catch ({ response }) {
        setAuthError(response.data);
      }
    },
    validate: formikValidateUsingJoi({
      name: joi
        .string()
        .min(3)
        .max(255)
        .regex(/^[A-Za-z\u0590-\u05FF]*$/)

        .required(),
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
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/)
        .label('password'),
      confirmedPassword: joi
        .any()
        .equal(joi.ref('password'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
    }),
  });

  return (
    <>
      <AdminNavBar />
      <form noValidate onSubmit={form.handleSubmit}>
        {authError && <div className="alert alert-danger">{authError}</div>}
        <div className="container">
          <Input
            label={'Name'}
            type="text"
            id="name"
            value={form.name}
            placeholder="Enter name"
            labelClass={'label'}
            inputClass={'input'}
            {...form.getFieldProps('name')}
            error={form.touched.name && form.errors.name}
          />
        </div>
        <div className="container">
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
        <div className="container">
          {' '}
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
        <div className="container">
          {' '}
          <Input
            {...form.getFieldProps('confirmedPassword')}
            label={'Confirm Password'}
            type="password"
            id="confirm-password"
            value={form.confirmedPassword}
            placeholder="Confirm Password"
            labelClass={'label'}
            inputClass={'input'}
            error={
              form.touched.confirmedPassword && form.errors.confirmedPassword
            }
          />
        </div>

        <div className="container">
          <button type="submit" className="sign-up-btn">
            Sign Up
          </button>
        </div>
      </form>
    </>
  );
};

export default SignUpAdmin;
