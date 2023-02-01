import React from 'react';
import joi from 'joi';
import { formikValidateUsingJoi } from '../utils/formikValidateUsingJio';
import { useFormik } from 'formik';
import { useState } from 'react';
import { signUp } from '../utils/axios';
import { useNavigate } from 'react-router-dom';
import Input from './Input';
// import createUser from '../services/userService';
const SignUp = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmedPassword: '',
      age: '',
      gender: '',
      // img: '',
      //   weight: '',
      //   height: '',
    },
    async onSubmit(values) {
      try {
        await signUp(values);

        navigate('/sign-in');
      } catch (error) {
        console.log(error);
      }
    },
    validate: formikValidateUsingJoi({
      name: joi.string().min(3).max(255).required(),
      email: joi
        .string()
        .min(6)
        .max(255)
        .required()
        .email({ tlds: { allow: false } }),
      password: joi.string().min(6).max(1024).required().label('password'),
      confirmedPassword: joi
        .any()
        .equal(joi.ref('password'))
        .required()
        .label('Confirm password')
        .options({ messages: { 'any.only': '{{#label}} does not match' } }),
      gender: joi.string(),
      age: joi.string(),
      // img: joi.string(),
      weight: joi.number(),
      height: joi.number(),
    }),
  });

  return (
    <>
      <form noValidate autoComplete="off" onSubmit={form.handleSubmit}>
        {error && <div className="alert alert-danger">{error}</div>}
        <div className="mb-3 row">
          {' '}
          <Input
            label={'Name'}
            type="text"
            id="name"
            placeholder="Your user name"
            labelClass={'col-sm-2 col-form-label'}
            inputClass={'form-control-plaintext'}
            {...form.getFieldProps('name')}
            error={form.touched.name && form.errors.name}
          />
        </div>
        <div className="mb-3 row">
          <Input
            label={'Email'}
            type="email"
            id="email"
            value={form.email}
            placeholder="Enter email"
            labelClass={'col-sm-2 col-form-label'}
            inputClass={'form-control-plaintext'}
            {...form.getFieldProps('email')}
            error={form.touched.email && form.errors.email}
          />
        </div>
        <div className="mb-3 row">
          {' '}
          <Input
            {...form.getFieldProps('password')}
            label={'Password'}
            type="password"
            id="password"
            value={form.password}
            placeholder="Choose Password"
            labelClass={'col-sm-2 col-form-label'}
            inputClass={'form-control-plaintext'}
            error={form.touched.password && form.errors.password}
          />
        </div>
        <div className="mb-3 row">
          {' '}
          <Input
            {...form.getFieldProps('confirmedPassword')}
            label={'Confirm Password'}
            type="password"
            id="confirm-password"
            value={form.confirmedPassword}
            placeholder="Confirm Password"
            labelClass={'col-sm-2 col-form-label'}
            inputClass={'form-control-plaintext'}
            error={
              form.touched.confirmedPassword && form.errors.confirmedPassword
            }
          />
        </div>

        <div className="form-check">
          <Input
            onChange={form.handleChange}
            label={'Male'}
            type="radio"
            id="male"
            value={'male'}
            labelClass={'form-check-label'}
            inputClass={'form-check-input'}
            error={form.touched.gender && form.errors.gender}
            name="gender"
          />
        </div>
        <div className="form-check">
          <Input
            onChange={form.handleChange}
            label={'Female'}
            type="radio"
            id="female"
            value={'female'}
            labelClass={'form-check-label'}
            inputClass={'form-check-input'}
            error={form.touched.gender && form.errors.gender}
            name="gender"
          />
        </div>
        <div className="form-check">
          <Input
            onChange={form.handleChange}
            label={'Non Binary'}
            type="radio"
            id="non-binary"
            value={'non-binary'}
            labelClass={'form-check-label'}
            inputClass={'form-check-input'}
            error={form.touched.gender && form.errors.gender}
            name="gender"
          />
        </div>

        <div className="form-check mt-3">
          <Input
            {...form.getFieldProps('age')}
            label={'Date of birth'}
            type="date"
            id="age"
            value={form.age}
            labelClass={'form-check-label'}
            inputClass={'form-check-input'}
            error={form.touched.age && form.errors.age}
          />
        </div>
        {/* <div className="mb-3 row">
          {' '}
          <Input
            {...form.getFieldProps('weight')}
            label={'Weight'}
            type="number"
            id="weight"
            value={form.weight}
            placeholder="Weight"
            labelClass={'col-sm-2 col-form-label'}
            inputClass={'form-control-plaintext'}
            error={form.touched.weight && form.errors.weight}
          />
        </div>
        <div className="mb-3 row">
          {' '}
          <Input
            {...form.getFieldProps('height')}
            label={'Height'}
            type="number"
            id="height"
            value={form.height}
            placeholder="Height"
            labelClass={'col-sm-2 col-form-label'}
            inputClass={'form-control-plaintext'}
            error={form.touched.height && form.errors.height}
          />
        </div> */}
        <button type="submit" className="btn btn-primary mt-4">
          Sing Up
        </button>
      </form>
    </>
  );
};

export default SignUp;
